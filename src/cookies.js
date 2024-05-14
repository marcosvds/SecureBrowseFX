// Adiciona um ouvinte de evento que será acionado quando o conteúdo do DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Consulta a aba ativa na janela atual
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        
        // Extrai a URL da primeira aba retornada na consulta e determina o domínio
        var url = new URL(tabs[0].url);
        var domain = url.hostname;

        // Obtém referências para os elementos do DOM onde serão exibidos os valores dos cookies
        const totalCookies = document.getElementById('totalCookies');
        const firstPartyCookies = document.getElementById('firstPartyCookies');
        const thirdPartyCookies = document.getElementById('thirdPartyCookies');
        const sessionCookies = document.getElementById('sessionCookies');
        const persistentCookies = document.getElementById('persistentCookies');

        // Envia uma mensagem para o script de background para obter informações sobre os cookies do domínio
        chrome.runtime.sendMessage({action: "getCookies", domain: domain}, function(response) {
            
            // Verifica se uma resposta foi recebida
            if (response) {
                console.log(response); // Exibe no console a resposta recebida
                // Atualiza os elementos de texto com os dados recebidos
                totalCookies.textContent = response.totalCookies;
                firstPartyCookies.textContent = response.firstPartyCookies;
                thirdPartyCookies.textContent = response.thirdPartyCookies;
                sessionCookies.textContent = response.sessionCookies;
                persistentCookies.textContent = response.persistentCookies;
                
            } else {
                // Caso não receba uma resposta, atualiza os elementos de texto indicando falha
                totalCookies.textContent = 'Falha.';
                firstPartyCookies.textContent = 'Falha.';
                thirdPartyCookies.textContent = 'Falha.';
                sessionCookies.textContent = 'Falha.';
                persistentCookies.textContent = 'Falha.';
                
            }
        });
    });
});
