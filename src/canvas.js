// Define a função `overrideMethod` que substitui um método especificado do objeto `CanvasRenderingContext2D`
const overrideMethod = (methodName) => {
  // Salva o método original para que possamos chamar depois
  const originalMethod = CanvasRenderingContext2D.prototype[methodName];

  // Substitui o método original com uma nova função
  CanvasRenderingContext2D.prototype[methodName] = function() {
    // Exibe um alerta indicando uma tentativa de fingerprinting no Canvas
    alert('Tentativa de fingerprinting de Canvas detectada!');

    // Envia uma mensagem para o background do Chrome informando que o fingerprinting foi detectado
    chrome.runtime.sendMessage({action: 'canvasFingerprintDetected'});

    // Chama o método original e retorna seu resultado
    return originalMethod.apply(this, arguments);
  };
};

// Aplica a substituição para os métodos 'toDataURL' e 'getImageData' que são comumente usados para fingerprinting
overrideMethod('toDataURL');
overrideMethod('getImageData');

// Adiciona um ouvinte que é acionado quando o conteúdo do DOM está totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
  // Consulta a aba ativa na janela atual
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    // Encontra o elemento 'status' para exibir o status da detecção
    const statusDisplay = document.getElementById('status');

    // Verifica se existe uma aba ativa e se o ID dessa aba está disponível
    if (tabs.length > 0 && tabs[0].id != null) {
      // Obtém o texto do badge associado à aba, que indica se o fingerprinting foi detectado
      chrome.browserAction.getBadgeText({tabId: tabs[0].id}, (result) => {
        // Atualiza o conteúdo de 'status' com base na presença de fingerprinting
        statusDisplay.textContent = result ? 'Fingerprinting de Canvas detectado!' : 'Nenhum fingerprinting de Canvas detectado.';
      });
    } else {
      // Atualiza o conteúdo de 'status' para indicar que nenhuma aba ativa foi detectada
      statusDisplay.textContent = 'Nenhuma aba ativa detectada.';
    }
  });
});
