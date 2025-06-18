# TaskFlow - Um aplicativo de gerenciamento de tarefas em Next.js

TaskFlow é um aplicativo web moderno construído com Next.js e Firebase que permite aos usuários gerenciar suas tarefas de forma eficiente. Ele possui autenticação de usuário, atualizações de tarefas em tempo real com Firestore e uma interface limpa e responsiva.

## Funcionalidades Principais

-   **Autenticação Firebase**: Login e registro seguros usando e-mail e senha.
-   **Integração com Firestore**: As tarefas são armazenadas e gerenciadas no Firestore, associadas a usuários autenticados.
-   **Operações CRUD**: Os usuários podem adicionar, listar, atualizar (status) e excluir tarefas.
-   **Atualizações em Tempo Real**: A lista de tarefas é atualizada em tempo real quando ocorrem alterações.
-   **Perfil do Usuário**: Visualize informações do usuário e faça logout.
-   **Design Responsivo**: Layout limpo, baseado em cartões, que funciona em vários tamanhos de tela.
-   **UI Moderna**: Estilizado com Tailwind CSS e componentes ShadCN UI, apresentando um tema de cores personalizado.

## Pilha de Tecnologia

-   Next.js (App Router, Server Components, TypeScript)
-   Firebase (Authentication, Firestore SDK v9+)
-   Tailwind CSS
-   ShadCN UI
-   React Hook Form & Zod (para validação de formulários)
-   Lucide React (para ícones)
-   date-fns (para formatação de datas)

## Pré-requisitos

-   Node.js (v18 ou posterior recomendado)
-   npm ou yarn

## Configuração do Firebase

Antes de executar o aplicativo, você precisa configurar um projeto Firebase:

1.  **Criar um Projeto Firebase**:
    * Vá para o [Firebase Console](https://console.firebase.google.com/).
    * Clique em "Adicionar projeto" e siga as instruções.

2.  **Adicionar um aplicativo da web ao seu projeto**:
    * No painel do seu projeto Firebase, clique no ícone da Web (`</>`) para adicionar um novo aplicativo da web.
    * Registre seu aplicativo (você pode nomeá-lo "TaskFlow" ou similar).
    * O Firebase fornecerá um objeto `firebaseConfig`. Copie esses valores.

3.  **Ativar a Autenticação do Firebase**:
    * No console do Firebase, vá para "Authentication" (em Build).
    * Clique em "Começar".
    * Em "Método de login", ative "E-mail/Senha".

4.  **Configurar o Banco de Dados Firestore**:
    * No console do Firebase, vá para "Firestore Database" (em Build).
    * Clique em "Criar banco de dados".
    * Comece no **modo de teste** para facilitar a configuração (você pode configurar as regras de segurança mais tarde para produção).
    * Escolha um local do Firestore mais próximo dos seus usuários.

5.  **Configurar Variáveis de Ambiente**:
    * No diretório raiz deste projeto, crie um arquivo chamado `.env.local`.
    * Adicione suas chaves de configuração do Firebase a este arquivo, assim:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=sua_chave_api
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_dominio_auth
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_id_projeto
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_bucket_armazenamento
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_id_remetente_mensagens
    NEXT_PUBLIC_FIREBASE_APP_ID=seu_id_app
    ```

    Substitua `sua_chave_api`, `seu_dominio_auth`, etc., pelos valores reais da configuração do aplicativo da web do seu projeto Firebase.

## Começando

1.  **Clone o repositório (se aplicável) ou certifique-se de ter os arquivos do projeto.**

2.  **Instale as dependências**:
    Abra seu terminal, navegue até o diretório do projeto e execute:
    ```bash
    npm install
    # ou
    # yarn install
    ```

3.  **Execute o servidor de desenvolvimento**:
    ```bash
    npm run dev
    # ou
    # yarn dev
    ```

    O aplicativo agora deve estar em execução em [http://localhost:9002](http://localhost:9002) (ou outra porta se 9002 estiver em uso - verifique a saída do seu terminal).

## Estrutura do Projeto

-   `src/app/`: Páginas e layouts do Next.js App Router.
    -   `(app)/`: Grupo para rotas autenticadas (dashboard, adicionar tarefa, perfil).
    -   `login/`: Página de login.
    -   `register/`: Página de registro.
-   `src/components/`: Componentes React reutilizáveis.
    -   `auth/`: Componentes relacionados à autenticação (formulários de login/registro, AuthGuard).
    -   `layout/`: Componentes de layout como Navbar.
    -   `tasks/`: Componentes relacionados a tarefas (lista de tarefas, item, formulário de adição).
    -   `ui/`: Componentes ShadCN UI.
-   `src/context/`: Provedores de Contexto React (por exemplo, `AuthContext`).
-   `src/firebase/`: Configuração do Firebase e funções de serviço.
    -   `config.ts`: Inicialização do aplicativo Firebase.
    -   `firestore.ts`: Operações CRUD do Firestore para tarefas.
-   `src/hooks/`: Hooks React personalizados.
-   `src/lib/`: Funções de utilidade e definições de tipo.
    -   `types.ts`: Definições de tipo TypeScript.
    -   `utils.ts`: Funções de utilidade gerais.

## Construindo para Produção

Para construir o aplicativo para produção, execute:
```bash
npm run build


Em seguida, para iniciar o servidor de produção:

npm run start