# Diário do Bebê

Aplicativo mobile para acompanhamento diário de bebês em creches — relatórios, presença, ocorrências e comunicação com responsáveis.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) v18 ou superior
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Expo Go](https://expo.dev/go) no celular (para testar no dispositivo)

---

## 1. Banco de dados (Docker)

Abra o **Docker Desktop** antes de executar o comando abaixo.

```bash
docker compose up -d
```

Isso sobe o PostgreSQL na porta `5433`. O container se chama `diario_db`.

Para verificar se subiu:

```bash
docker ps
```

---

## 2. Backend

```bash
cd backend
```

**Instalar dependências** (primeira vez):

```bash
npm install
```

**Criar o arquivo de variáveis de ambiente:**

Crie o arquivo `backend/.env` com o conteúdo:

```env
DATABASE_URL="postgresql://admin:password123@localhost:5433/diario_bebe"
JWT_SECRET="diario-bebe-dev-secret"
JWT_EXPIRES_IN="7d"
```

**Aplicar as migrations:**

```bash
npx prisma migrate deploy
```

**Popular o banco com dados de teste:**

```bash
npx prisma db seed
```

**Iniciar o servidor:**

```bash
npm run dev
```

O backend roda em `http://localhost:3000`.

---

## 3. Frontend

Abra um **novo terminal**.

```bash
cd frontend
```

**Instalar dependências** (primeira vez):

```bash
npm install
```

**Criar o arquivo de variáveis de ambiente:**

Crie o arquivo `frontend/.env`. Use `localhost` para emulador ou o IP da sua máquina na rede para Expo Go no celular:

```env
# Emulador Android / iOS Simulator
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000

# Expo Go no celular (substitua pelo seu IP local)
# EXPO_PUBLIC_API_BASE_URL=http://192.168.1.X:3000
```

Para descobrir seu IP local:

```bash
# Windows
ipconfig
# Procure "Endereço IPv4"
```

**Iniciar o app:**

```bash
npm start
```

Escaneie o QR code com o Expo Go ou pressione `a` para Android / `i` para iOS Simulator.

---

## Contas de teste (seed)

| Tipo | E-mail | Senha |
|------|--------|-------|
| Professora | ana@escola.com | senha123 |
| Professora | beatriz@escola.com | senha123 |
| Responsável | maria@email.com | senha123 |
| Responsável | carlos@email.com | senha123 |
| Responsável | paula@email.com | senha123 |

---

## Estrutura do projeto

```
Diario_Bebe/
├── backend/          # API Node.js + Express + Prisma
├── frontend/         # App React Native + Expo
├── docs/             # Relatórios de endpoints e bugs
└── docker-compose.yml
```

---

## Comandos úteis

| Comando | Descrição |
|---------|-----------|
| `docker compose up -d` | Sobe o banco de dados |
| `docker compose down` | Para o banco de dados |
| `npx prisma studio` | Interface visual do banco (rodar em `backend/`) |
| `npx prisma migrate dev` | Cria e aplica nova migration |
| `npx prisma db seed` | Repovoar o banco com dados de teste |
| `npx tsc --noEmit` | Verificar erros de TypeScript (rodar em `frontend/`) |

---

## Convenção de commits

| Prefixo | Uso |
|---------|-----|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `refactor` | Refatoração sem mudar comportamento |
| `style` | Formatação de código |
| `docs` | Documentação |
| `chore` | Configuração, dependências |
| `perf` | Melhoria de performance |
| `test` | Testes |
| `build` | Build / dependências externas |
| `ci` | Configuração de CI/CD |
| `env` | Variáveis de ambiente / containers |
