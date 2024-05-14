// Adiciona um ouvinte de evento que será acionado quando o conteúdo do DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculateScore');
    const scoreDiv = document.getElementById('secScore');

    // Função para solicitar e exibir a pontuação de segurança
    function fetchAndDisplayScore() {
        scoreDiv.textContent = 'Calculando...';  // Exibe uma mensagem temporária enquanto o score é calculado
        // Envia uma mensagem para o script de background para calcular o score de segurança
        chrome.runtime.sendMessage({action: "calculateScore"}, function(response) {
            // Verifica se a resposta existe e contém um score de segurança
            if (response && response.secScore !== undefined) {
                // Atualiza o texto do div com o score de segurança recebido
                scoreDiv.textContent = `Pontuação de Segurança: ${response.secScore}/100`;
            } else {
                // Caso não receba uma resposta válida, exibe uma mensagem de falha
                scoreDiv.textContent = 'Falha ao calcular a pontuação.';
            }
        });
    }

    // Chama a função para carregar a pontuação assim que o conteúdo estiver carregado
    fetchAndDisplayScore();

    // Adiciona um ouvinte de clique no botão de calcular
    calculateButton.addEventListener('click', fetchAndDisplayScore);
});
