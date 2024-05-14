// Adiciona um ouvinte de evento que será acionado quando o conteúdo do DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Envia uma mensagem para o script de background para verificar o armazenamento local e de sessão
    chrome.runtime.sendMessage({action: "checkStorage"}, function(response) {
        // Obtém referências para os elementos do DOM onde serão exibidos os resultados
		const localStorageDiv = document.getElementById("localStorage");
		const sessionStorageDiv = document.getElementById("sessionStorage");

        // Verifica se ocorreu um erro na resposta
		if (response.error) {
			console.error('Error:', response.error); // Exibe um erro no console
			localStorageDiv.textContent = 'Erro ao verificar o armazenamento'; // Atualiza o texto para indicar um erro no armazenamento local
			sessionStorageDiv.textContent = 'Erro ao verificar o armazenamento'; // Atualiza o texto para indicar um erro no armazenamento de sessão
		} else {
            // Se não houver erro, exibe a contagem de itens no armazenamento local e de sessão
			localStorageDiv.textContent = 'Armazenamento Local: ' + response.data.localStorageCount;
			sessionStorageDiv.textContent = 'Armazenamento de Sessão: ' + response.data.sessionStorageCount;
		}
    });
});
