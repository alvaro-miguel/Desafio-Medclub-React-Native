# 🏥 Consultas Médicas - Mobile Frontend

Este repositório contém o código-fonte do aplicativo móvel desenvolvido em **React Native** e **Expo** focado no gerenciamento, listagem e agendamento de consultas médicas. A aplicação foi projetada com foco em usabilidade (UX), contendo validações locais rígidas em tempo de execução e persistência segura de dados.

---

## 🚀 Tecnologias e Ferramentas Utilizadas

O ecossistema do aplicativo foi construído utilizando as seguintes tecnologias do mercado mobile:

* **React Native & Expo (SDK 51):** Core do aplicativo que viabiliza a execução nativa multiplataforma através do ecossistema Expo Go.
* **Expo Router:** Framework de navegação baseado em arquivos (estruturado dentro do diretório `src/app/`), fornecendo transições fluidas e histórico de rotas nativo.
* **Axios:** Cliente HTTP utilizado para o consumo assíncrono dos endpoints da API REST externa.
* **Expo SecureStore:** Armazenamento criptografado no dispositivo local para a persistência segura do Token JWT de autenticação.
* **TypeScript:** Tipagem estática em todos os componentes, contextos e utilitários, prevenindo erros em tempo de desenvolvimento.

---

## ⚙️ Arquitetura e Estrutura do Projeto

A estrutura de diretórios do frontend está organizada de forma modular, separando as telas (rotas), estilos, utilitários e regras de contexto global:

```text
├── src/
│   ├── app/                 # Camada de Telas e Rotas (Expo Router)
│   │   ├── _layout.tsx      # Configuração global de navegação e Provedores (Providers)
│   │   ├── index.tsx        # Dashboard principal / Listagem de consultas agendadas
│   │   ├── login.tsx        # Tela de Autenticação do usuário (Login)
│   │   ├── agendar.tsx      # Formulário de agendamento de novas consultas
│   │   ├── detalhes.tsx     # Tela de exibição detalhada de uma consulta selecionada
│   │   └── consultasContext.tsx # Gerenciamento de Estado Global (Context API) e cache local
│   ├── services/            # Camada de Integração de Serviços
│   │   └── api.ts           # Instância do Axios configurada com Interceptor de Token JWT
│   ├── style/               # Arquivos de estilização centralizada dos componentes
│   │   ├── estiloHome.ts   
│   │   └── estiloAgendar.ts 
|   |   ├── estiloDetalhe.ts
|   |   └── estiloLogin.ts
│   └── utils/               # Funções auxiliares e helpers reutilizáveis
│       ├── mascaras.ts      
│       └── validacoes.ts    
├── package.json             # Manifesto de dependências e scripts do ecossistema Node
└── .gitignore               # Filtro de segurança de arquivos para versionamento Git
```

## 🎯 Engenharia e Recursos Implementados no App

### 1. Estado Global e Persistência de Sessão (`consultasContext.tsx`)
O aplicativo utiliza a **Context API** do React para propagar o estado das consultas por todas as telas do sistema de forma síncrona.

* **Fluxo de Login Autônomo:** Se o usuário já realizou a autenticação anteriormente, o `SecureStore` recupera o Token JWT em segundo plano e direciona o usuário diretamente para a Home, pulando a tela de Login.

### 2. Segurança e Comunicação HTTP (`api.ts`)
A instância central do Axios está acoplada a um mecanismo de segurança automatizado. No momento em que qualquer requisição de dados é disparada (seja listagem ou criação), o arquivo `api.ts` intercepta o pedido, lê o token criptografado do dispositivo e injeta dinamicamente o cabeçalho `Authorization: Bearer <token>`, protegendo a integridade da comunicação.

### 3. Abstração de Interface de Usuário Inteligente (`agendar.tsx`)
Para simplificar a experiência de uso do aplicativo, o formulário de novos agendamentos não exige códigos internos ou IDs complexos. Ele coleta campos de texto puros para o Nome do Médico e a Especialidade, delegando a normalização relacional desses dados para o processamento de backend.

### 4. Validações e Máscaras Locais (`utils/`)
* **Formatação de Exibição:** O app intercepta datas enviadas em formato internacional (`AAAA-MM-DD`) e as formata dinamicamente para o padrão brasileiro (`DD/MM/AAAA`) na renderização dos cards da listagem.
* **Filtros de Entrada:** Os campos de formulário aplicam máscaras numéricas automáticas à medida que o usuário digita a data e a hora. O botão de agendamento é desativado via software se o motor de validação detectar que a data é retroativa ou que a hora é inválida.

---

## 📦 Como Executar a Aplicação Localmente

### 1. Instalação das dependências

Abra o seu terminal na pasta raiz deste projeto frontend e instale todos os pacotes Node necessários:

```bash
npm install
```

---

## 2. Configuração do Endpoint da API

Abra o arquivo `src/services/api.ts` e ajuste a constante `ip_real` para o IP local da sua máquina na rede local ou a URL pública da sua API de produção:

```ts
const ip_real = '192.168.X.X';
```

---

## 3. Iniciar o Servidor de Desenvolvimento (Metro Bundler)

Execute o comando abaixo para gerar o QR Code de execução:

```bash
npx expo start
```

---

## 4. Executar no Smartphone

Instale o aplicativo Expo Go em seu dispositivo móvel (disponível no Google Play ou App Store).

Abra a câmera do seu celular (iOS) ou a ferramenta de escaneamento dentro do Expo Go (Android) e leia o QR Code impresso no terminal.
