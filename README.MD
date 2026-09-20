🛒 Calculadora de Compra - React Native & Expo

Aplicação mobile desenvolvida em React Native com TypeScript e Expo para cálculo de compras on-line à vista (com desconto) e parceladas (com acréscimo de juros).
Atividade desenvolvida para a disciplina de Programação Para Dispositivos Móveis.

📱 Funcionalidades

Pagamento à Vista:
Aplica automaticamente 5% de desconto sobre o valor total da compra.

Compra Parcelada:
Valida se a quantidade de parcelas é superior a 1.

2 ou 3 parcelas: Aplica acréscimo de 5% sobre o valor total.
Mais de 3 parcelas: Aplica acréscimo de 15% sobre o valor total.
Exibe o valor final da compra e o valor individual de cada parcela.

Interface Responsiva:
Utiliza botões de rádio (react-native-radio-buttons-group) para seleção das opções de pagamento.

Suporte e formatação para execução em ambiente Web e Mobile.

🛠️ Tecnologias Utilizadas

React Native
Expo
TypeScript
react-native-radio-buttons-group
@expo/vector-icons

🚀 Como Executar o Projeto

Pré-requisitos

Node.js instalado na máquina.
Gerenciador de pacotes npm ou yarn.
Aplicativo Expo Go no celular (opcional, para testes no dispositivo físico).

Passo a Passo

Clone o repositório:

git clone https://github.com/SEU-USUARIO/react-native-calculadora-compra.git
cd react-native-calculadora-compra

Instale as dependências:

npm install

Inicie o servidor do Expo:

npx expo start

Executar:

No navegador (Web): Pressione a tecla w no terminal.
No celular: Abra o aplicativo Expo Go e escaneie o código QR exibido no terminal.
