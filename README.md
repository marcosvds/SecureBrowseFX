# SecureBrowseFX

SecureBrowseFX é uma extensão para o navegador Firefox desenvolvida para detectar e alertar os usuários sobre potenciais ataques e violações de privacidade durante a navegação na web. Esta extensão busca oferecer uma camada adicional de segurança ao identificar conexões a domínios de terceira parte, cookies injetados, armazenamento local, e mais.

## Características

- **Detecção de Domínios de Terceira Parte**: Alerta o usuário sobre todas as conexões feitas a domínios que não são da origem principal da navegação.
- **Avaliação de Cookies**: Distingue e contabiliza cookies de primeira e terceira parte durante o carregamento de páginas.
- **Monitoramento de Local Storage**: Verifica o uso de local storage nos dispositivos dos usuários.
- **Segurança do Navegador**: Identifica tentativas de sequestro do navegador e uso de técnicas de fingerprinting.

## Pré-requisitos

Para instalar e rodar a extensão SecureBrowseFX, você precisará ter o Firefox instalado no seu dispositivo. A extensão é compatível com as últimas versões do Firefox.

## Instalação

Para instalar a extensão localmente em seu navegador Firefox, siga os passos abaixo:

1. Clone este repositório em sua máquina local usando `git clone [URL do repositório]`.
2. Abra o Firefox e acesse `about:debugging`.
3. Clique em "Este Firefox" e depois em "Carregar extensão temporária".
4. Navegue até o diretório onde você clonou o repositório e selecione o arquivo manifest.json para carregar a extensão.

## Uso

Depois de instalada, a extensão começará a monitorar automaticamente todas as suas abas abertas. Qualquer alerta ou informação de segurança será exibido através de notificações ou em um painel específico da extensão.

## Contribuições

Contribuições são sempre bem-vindas! Se você deseja contribuir com o projeto, por favor, verifique o arquivo `CONTRIBUTING.md` para mais detalhes sobre como você pode fazer isso.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo `LICENSE.md` para mais detalhes.

## Contato

Se você tiver qualquer dúvida ou sugestão, sinta-se à vontade para abrir uma issue aqui no repositório ou enviar uma mensagem diretamente para os desenvolvedores através do [email de contato].
