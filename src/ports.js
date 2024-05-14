// Adiciona um ouvinte de evento que será acionado quando o conteúdo do DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Envia uma mensagem para o script de background com a ação de verificar o uso de portas
    chrome.runtime.sendMessage({action: "checkPorts"}, function(response) {

        // Obtém a referência para o elemento do DOM onde será exibido o status da verificação de portas
        const possibleHijackingDiv = document.getElementById('possibleHijacking');

        // Verifica se não houve resposta do script de background
        if (!response) {
            console.error('No response from background script'); // Exibe um erro no console
            possibleHijackingDiv.textContent = 'Nenhuma resposta do script de fundo.';

        } else if (response.error) {
            // Se houve um erro na resposta, exibe no console e atualiza o texto na interface
            console.error('Error:', response ? response.error : "Erro ao detectar uso de portas.");
            possibleHijackingDiv.textContent = 'Erro ao detectar uso de portas.';
        
        } else if (response.suspect) {
            // Se comportamento suspeito foi detectado, atualiza a interface para alertar o usuário
            const content = "Comportamento suspeito detectado. Este site pode estar tentando sequestrar portas.";

            // Cria um novo elemento h1 para exibir a mensagem
            const newContentH1 = document.createElement('h1');
            newContentH1.textContent = content;

            // Adiciona o novo elemento h1 ao div de exibição
            possibleHijackingDiv.appendChild(newContentH1);
        
        } else {
            // Se não foram detectados usos suspeitos de portas, informa ao usuário que está tudo ok
            possibleHijackingDiv.textContent = 'Nenhum uso suspeito de portas detectado.';
        
        }
    });
});
