# 🏥 Consultas Médicas - Mobile Frontend

Este repositório contém o código-fonte do aplicativo móvel desenvolvido em **React Native** e **Expo** focado no gerenciamento, listagem e agendamento de consultas médicas. A aplicação foi projetada com foco em usabilidade (UX), contendo validações locais rígidas em tempo de execução, gerenciamento seguro de ambiente e persistência de dados.

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

A estrutura de diretórios do frontend está organizada de forma modular, separando as telas (rotas), estilos, utilitários, configurações de ambiente e regras de contexto global:

```text
├── .env                 # 🔑 Variáveis de ambiente locais (URL de produção ou desenvolvimento)
├── .gitignore           # Filtro de segurança de arquivos para versionamento Git
├── package.json         # Manifesto de dependências e scripts do ecossistema Node
└── src/
    ├── app/             # Camada de Telas e Rotas (Expo Router)
    │   ├── _layout.tsx  # Configuração global de navegação e Provedores (Providers)
    │   ├── index.tsx    # Dashboard principal / Listagem de consultas agendadas
    │   ├── login.tsx    # Tela de Autenticação do usuário (Login)
    │   ├── agendar.tsx  # Formulário de agendamento com seletores dinâmicos
    │   ├── detalhes.tsx # Tela de exibição detalhada de uma consulta selecionada
    │   └── consultasContext.tsx # Gerenciamento de Estado Global (Context API)
    ├── services/        # Camada de Integração de Serviços
    │   └── api.ts       # Instância do Axios com consumo de dynamic envs e Interceptor JWT
    ├── style/           # Arquivos de estilização centralizada dos componentes
    │   ├── estiloHome.ts   
    │   ├── estiloAgendar.ts 
    │   ├── estiloDetalhe.ts
    │   └── estiloLogin.ts

# 🎯 Engenharia e Recursos Implementados no App

## 1. Estado Global e Persistência de Sessão (`consultasContext.tsx`)

O aplicativo utiliza a **Context API do React** para propagar o estado das consultas por todas as telas do sistema de forma síncrona.

### 🔐 Fluxo de Login Autônomo

Se o usuário já realizou a autenticação anteriormente, o `SecureStore` recupera o **Token JWT** em segundo plano e direciona o usuário diretamente para a Home, pulando a tela de Login.

---

## 2. Segurança, Isolamento de Ambiente e Comunicação HTTP

### 🌐 Isolamento via Variáveis de Ambiente

Toda a comunicação externa foi desacoplada do código-fonte.

O app utiliza os padrões nativos do Expo (`EXPO_PUBLIC_`) para injetar dinamicamente as URLs de gateways de comunicação em tempo de execução por meio de arquivos `.env` protegidos.

### 🛡️ Interceptor Automático (`api.ts`)

A instância central do Axios está acoplada a um mecanismo de segurança automatizado.

No momento em que qualquer requisição de dados é disparada:

- O arquivo intercepta o pedido;
- Lê o token criptografado do dispositivo;
- Injeta dinamicamente o cabeçalho:

```http
Authorization: Bearer <token>
```

Isso protege a integridade da comunicação entre frontend e backend.

---

## 3. Interface de Usuário Dinâmica e Inteligente (`agendar.tsx`)

Para aprimorar a experiência do usuário (UX) e mitigar erros de input manual, o formulário de novos agendamentos elimina digitações redundantes de texto estruturado.

O sistema consome componentes do tipo **Dropdown** alimentados em tempo real diretamente pelas tabelas relacionais de:

- Especialistas;
- Horários disponíveis;

Todos integrados à API REST.

---

## 4. Validações e Máscaras Locais (`utils/`)

### 📅 Formatação de Exibição

O app intercepta datas enviadas em formato internacional (`AAAA-MM-DD`) e as formata dinamicamente para o padrão brasileiro (`DD/MM/AAAA`) na renderização dos cards da listagem.

### ✅ Filtros de Entrada

Os campos de formulário aplicam máscaras numéricas automáticas à medida que o usuário digita a data.

O botão de agendamento é desativado via software caso o motor de validação detecte:

- inconsistências;
- formatos inválidos.

---

# 📦 Como Executar a Aplicação Localmente

## 1. Instalação das Dependências

Abra o terminal na pasta raiz do projeto frontend e execute:

```bash
npm install
```

---

## 2. Configuração das Variáveis de Ambiente (`.env`)

Na raiz do projeto (mesmo nível do `package.json`), crie um arquivo chamado `.env` e configure a URL base do servidor backend:

```env
EXPO_PUBLIC_API_URL=https://desafio-tecnico-back-end-django-production.up.railway.app
```

> **Nota:**  
> Preencha a URL sem aspas e sem `/` ao final.

---

## 3. Iniciar o Servidor de Desenvolvimento (Metro Bundler)

Execute o comando abaixo limpando o cache:

```bash
npx expo start -c
```

Isso garante a injeção correta das novas variáveis de ambiente.

---

## 4. Executar no Smartphone

1. Instale o aplicativo **Expo Go** no dispositivo móvel:
   - Android → Google Play
   - iOS → App Store

2. Abra:
   - a câmera do celular (iOS), ou
   - o leitor interno do Expo Go (Android)

3. Escaneie o QR Code exibido no terminal.

---

# ⚠️ Nota de Conectividade

Caso utilize um backend local, configure o `.env` utilizando o IP privado da máquina na rede Wi-Fi:

```env
EXPO_PUBLIC_API_URL=http://192.168.X.X:8000
```

Certifique-se de que:

- o smartphone;
- e o computador;

estejam conectados exatamente à mesma rede Wi-Fi.
    └── utils/           # Funções auxiliares e helpers reutilizáveis
        ├── mascaras.ts      
        └── validacoes.ts
