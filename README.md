# SecureBrowseFX

SecureBrowseFX é uma extensão multiplataforma desenvolvida para detectar e alertar os usuários sobre potenciais ataques e violações de privacidade durante a navegação na web. Esta extensão oferece uma camada adicional de segurança ao identificar conexões a domínios de terceiros, gerenciamento de cookies, armazenamento local, e tentativas de fingerprinting e sequestro do navegador.

## Checklist de Conformidade

- [x] **Conexões a Domínios de Terceiros (2,5 pontos)**: Alerta o usuário sobre todas as conexões feitas a domínios que não são da origem principal da navegação.
- [x] **Detecção de Sequestro de Navegador (1 ponto)**: Identifica tentativas de sequestro e técnicas de fingerprinting que possam comprometer a privacidade do usuário.
- [x] **Monitoramento de Local Storage (2,5 pontos)**: Verifica o uso de local storage nos dispositivos dos usuários.
- [x] **Avaliação de Cookies (1 ponto)**: Distingue e contabiliza cookies de primeira e terceira partes durante o carregamento das páginas, incluindo cookies de sessão e persistentes.
- [x] **Detecção de Canvas Fingerprint (1 ponto)**: Monitora o uso de técnicas de fingerprinting de Canvas.
- [x] **Pontuação de Privacidade (2 pontos)**: Cria uma pontuação baseada em uma metodologia própria, indicando o nível de respeito à privacidade do usuário por parte da página.

## Compatibilidade

SecureBrowseFX é compatível com os principais navegadores modernos, incluindo Firefox e Chrome. Garanta que você esteja utilizando a última versão do navegador escolhido para uma experiência otimizada.

## Instalação

Para instalar a extensão localmente:

1. Clone este repositório em sua máquina local usando `git clone [[URL do repositório]](https://github.com/marcosvds/SecureBrowseFX.git)`.
2. Para **Firefox**:
   - Abra o Firefox e acesse `about:debugging`.
   - Clique em "Este Firefox" e depois em "Carregar extensão temporária".
   - Navegue até o diretório onde você clonou o repositório e selecione o arquivo `manifest.json`.
3. Para **Chrome**:
   - Abra o Chrome e acesse `chrome://extensions`.
   - Ative o Modo do desenvolvedor.
   - Clique em "Carregar sem compactação" e selecione o diretório da extensão.

## Uso

Depois de instalada, a extensão começará a monitorar automaticamente todas as suas abas abertas. Qualquer alerta ou informação de segurança será exibido através de notificações ou no painel específico da extensão.
