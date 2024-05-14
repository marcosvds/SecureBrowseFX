// Objetos para armazenar dados coletados por abas específicas
const thirdPartyRequests = {};
const allCookieDetails = {};
const storageCountsByTabId = {};
const allPossibleHijacking = {};
const allHijackingSuspectByTab = {};

// Função assíncrona para verificar o armazenamento local e de sessão de uma aba
async function checkStorageForTab(tabId, sendResponse) {
    try {
        // Executa um script na aba para obter contagens do armazenamento local e de sessão
        const results = await new Promise((resolve, reject) => {
            chrome.tabs.executeScript(tabId, {
                code: `({
                    localStorageCount: Object.keys(localStorage).length,
                    sessionStorageCount: Object.keys(sessionStorage).length
                })`
            }, (results) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError.message);
                } else {
                    resolve(results);
                }
            });
        });
        sendResponse({data: results[0]});
    } catch (error) {
        sendResponse({error: error});
    }
}

// Função para calcular a pontuação de segurança de uma aba
function calculateScore(tabId) {
    let score = 100;  // Pontuação inicial ajustada para 100
    let discount = 0;

    // Ajusta os valores de desconto para cada detecção
    discount += thirdPartyRequests[tabId] ? 25 : 0; 
    discount += allHijackingSuspectByTab[tabId] ? 25 : 0;
    discount += allCookieDetails[tabId] ? 25 : 0;
    discount += allPossibleHijacking[tabId] ? 25 : 0;
    score -= discount;

    return score < 0 ? 0 : score;  // Garante que a pontuação não seja negativa
}


// Função assíncrona para recuperar detalhes de cookies para uma aba e domínio
async function getCookies(tabId, domain) {
    return new Promise(resolve => {
        chrome.cookies.getAll({}, function(cookies) {
            const cookieDetails = {
                totalCookies: cookies.length,
                firstPartyCookies: 0,
                thirdPartyCookies: 0,
                sessionCookies: 0,
                persistentCookies: 0
            };

            cookies.forEach(cookie => {
                if (cookie.domain === domain) {
                    cookieDetails.firstPartyCookies++;
                } else {
                    cookieDetails.thirdPartyCookies++;
                }

                if ("session" in cookie && cookie.session) {
                    cookieDetails.sessionCookies++;
                } else {
                    cookieDetails.persistentCookies++;
                }
            });

            allCookieDetails[tabId] = cookieDetails;

            resolve(cookieDetails);
        });
    });
}

// Função auxiliar para extrair o domínio base de uma URL
function extractBaseDomain(url) {
    let domainParts = url.split('.').reverse();
    if (domainParts.length >= 2) {
        let topLevelDomain = domainParts[0];
        let secondLevelDomain = domainParts[1];
        return `${secondLevelDomain}.${topLevelDomain}`;
    }
    return url;
}

// Função para obter o porto padrão baseado no protocolo da URL
function getDefaultPort(url) {
    if (url.port) return url.port;
    return url.protocol === "https:" ? 443 : 80;
}

// Função para extrair ID da aba de um objeto de detalhes
function getTabId(details){
    return details.tabId;
}

// Função para extrair uma URL de um objeto de detalhes e convertê-la para objeto URL
function getUrl(details){
    return new URL(details.url);
}

// Listener para monitorar solicitações de rede e identificar pedidos a domínios de terceiros
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.tabId < 0) return;

        const requestUrl = getUrl(details);
        const requestDomain = requestUrl.hostname;

        chrome.tabs.get(details.tabId, function(tab) {
            if (chrome.runtime.lastError) {
                return;
            }

            const tabUrl = new URL(tab.url);
            const tabDomain = tabUrl.hostname;

            if (extractBaseDomain(requestDomain) !== extractBaseDomain(tabDomain)) {
                thirdPartyRequests[details.tabId] = thirdPartyRequests[details.tabId] || new Set();
                thirdPartyRequests[details.tabId].add(requestDomain);
            }
        });
    },
    { urls: ["<all_urls>"] },
    []
);

// Listener para verificar uso de portas que podem indicar tentativas de sequestro
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        const tabId = getTabId(details);
        if (tabId < 0) return;

        const url = getUrl(details);
        const port = getDefaultPort(url);
        const hijackingPorts = ['8080', '8081', '8443', '8000'];

        if (typeof allHijackingSuspectByTab[tabId] === 'undefined') {
            allHijackingSuspectByTab[tabId] = false;
        }

        if (hijackingPorts.includes(String(port))) {
            allHijackingSuspectByTab[tabId] = true;
        } else {
            allHijackingSuspectByTab[tabId] = false;
        }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);

// Listener global para mensagens do tipo 'action' e redireciona para funções específicas
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.action) {
        case "thirdPartyRequests":
            sendResponse(thirdPartyRequests[msg.tabId] ? Array.from(thirdPartyRequests[msg.tabId]) : []);
            break;
        case 'canvasFingerprintDetected':
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (!chrome.runtime.lastError && tabs.length > 0) {
                    const tabId = tabs[0].id;
                    chrome.browserAction.setBadgeText({text: '!', tabId: tabId});
                    chrome.browserAction.setBadgeBackgroundColor({color: '#007bff', tabId: tabId});
                }
            });
            sendResponse({status: 'Detection alert!'});
            return true;
        case "checkStorage":
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (tabs.length != 0) {
                    checkStorageForTab(tabs[0].id, sendResponse);
                } else {
                    sendResponse({error: "No active tab found"});
                }
            });
            return true;
        case "getCookies":
            chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
                if (tabs.length > 0) {
                    try {
                        const cookieDetails = await getCookies(tabs[0].id, msg.domain);
                        sendResponse(cookieDetails);
                    } catch (error) {
                        sendResponse({error: "Failed to retrieve cookies"});
                    }
                } else {
                    sendResponse({error: "No active tab found"});
                }
            });
            return true;
        case "checkPorts":
            const tabId = msg.tabId;
            const possibleHijacking = allHijackingSuspectByTab[tabId] || false;
            allPossibleHijacking[tabId] = possibleHijacking;
            sendResponse({suspect: possibleHijacking});
            break;
        case "calculateScore":
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (tabs.length == 0) {
                    sendResponse({error: "No active tab found"});
                } else {
                    sendResponse({secScore: calculateScore(tabs[0].id)});
                }
            });
            return true;
    }
});

// Listener para quando uma aba é atualizada, zera a pontuação de segurança
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'loading') {
        gradeScore = 0;
    }
});
