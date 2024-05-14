# SecureBrowseFX

SecureBrowseFX é uma extensão multiplataforma desenvolvida para detectar e alertar os usuários sobre potenciais ataques e violações de privacidade durante a navegação na web. Esta extensão oferece uma camada adicional de segurança ao identificar conexões a domínios de terceiros, gerenciamento de cookies, armazenamento local, e tentativas de fingerprinting e sequestro do navegador.

## Checklist de Conformidade

- [x] **Conexões a Domínios de Terceiros (2,5 pontos)**: Alerta o usuário sobre todas as conexões feitas a domínios que não são da origem principal da navegação.
- [x] **Detecção de Sequestro de Navegador (1 ponto)**: Identifica tentativas de sequestro e técnicas de fingerprinting que possam comprometer a privacidade do usuário.
- [x] **Monitoramento de Local Storage (2,5 pontos)**: Verifica o uso de local storage nos dispositivos dos usuários.
- [x] **Avaliação de Cookies (1 ponto)**: Distingue e contabiliza cookies de primeira e terceira partes durante o carregamento das páginas, incluindo cookies de sessão e persistentes.
- [x] **Detecção de Canvas Fingerprint (1 ponto)**: Monitora o uso de técnicas de fingerprinting de Canvas.
- [x] **Pontuação de Privacidade (2 pontos)**: Cria uma pontuação baseada em uma metodologia própria, indicando o nível de respeito à privacidade do usuário por parte da página.

## Metodologia de Pontuação

A pontuação de segurança da SecureBrowseFX é calculada com base em vários fatores de risco detectados durante a navegação:

- **Conexões a Domínios de Terceiros**: -25 pontos se detectados.
- **Ameaças de Sequestro de Navegador**: -25 pontos se detectadas.
- **Uso de Cookies de Terceiros**: -25 pontos se detectados.
- **Detecção de Sequestro Potencial**: -25 pontos se detectado.

A pontuação inicial é de 100, e cada tipo de risco detectado reduz essa pontuação. A pontuação final (mínima de 0) indica o nível de respeito à privacidade da página. Uma pontuação alta sugere uma navegação mais segura e privada, enquanto uma pontuação baixa indica potenciais riscos de privacidade.

### Exemplo de Pontuação

- **100/100**: Nenhuma ameaça detectada.
- **75/100**: AmEAças moderadas detectadas.
- **50/100 ou menos**: Alto risco de comprometimento da privacidade.

## Compatibilidade

SecureBrowseFX é compatível com os principais navegadores modernos, incluindo Firefox e Chrome. Garanta que você esteja utilizando a última versão do navegador escolhido para uma experiência otimizada.

## Instalação

Para instalar a extensão localmente:

1. Clone este repositório em sua máquina local usando `git clone https://github.com/marcosvds/SecureBrowseFX.git`.
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
