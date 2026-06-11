# Relatório de Auditoria de Integração — Diário do Bebê

Data: 11/06/2026 · Branch: `update-styles`

## Resumo executivo

- **Total de endpoints no backend:** 43 (11 grupos de rotas)
- **Integrados corretamente (✅):** 13 endpoints usados pelo app
- **Integrados parcialmente / corrigidos nesta auditoria (⚠️→✅):** 5 telas
- **Não integrados, mas com serviço pronto em `src/services/` (⚪ standby):** ~25 endpoints (CRUDs administrativos)
- **Mock removido nesta auditoria (🔴→✅):** 4 pontos
- **Endpoints faltando no backend (aguardando confirmação):** 1 (recuperação de senha)

O fluxo principal **login → dashboard → relatório diário/presença → logout** está integrado de ponta a ponta com chamadas reais à API e token JWT enviado via interceptor do axios.

## Tabela completa de integração

| Endpoint | Método | Tela/Componente | Status | Observação |
|---|---|---|---|---|
| `/auth/login` | POST | login.tsx → AuthContext | ✅ | Loading e mensagem de erro adicionados |
| `/auth/me` | GET | AuthContext (restaurar sessão) | ✅ | Token via AsyncStorage |
| `/bebes/turma/:id` | GET | TeacherAttendanceContext | ✅ | Lista da turma da professora |
| `/bebes/perfil/:id` | GET | baby/[id].tsx | ✅ | Responsáveis, alergias, medicamentos |
| `/bebes` | POST/GET/PATCH/DELETE | bebeService.ts | ⚪ | Serviço pronto; sem tela de admin |
| `/diarios` | POST | register/[id].tsx | ✅ | Loading, erro legível e data dinâmica adicionados |
| `/diarios/presenca` | POST | class.tsx (check-in) | ✅ | Upsert por dia no backend |
| `/diarios/bebe/:bebeId` | GET | ResponsibleChildContext, calendar | ✅ | Filtro por data suportado |
| `/diarios/:id`, `/diarios` | GET/PATCH/DELETE | diarioService.ts | ⚪ | Serviço pronto; sem uso direto |
| `/dashboard/:adiId/:turmaId` | GET | dashboardService.ts | ⚪ | Home da professora calcula no cliente via contexto; endpoint disponível |
| `/dashboard/parents/:pid/:bid` | GET | dashboardService.ts | ⚪ | Home do responsável usa `/auth/me` + diários; endpoint disponível |
| `/responsaveis/:id` | GET | (responsible)/profile.tsx | ✅ | **Integrado nesta auditoria** (antes mock) |
| `/responsaveis` | POST/GET/PATCH/DELETE | responsavelService.ts | ⚪ | Sem tela de cadastro no app |
| `/adis/:id` | GET | adiService.ts | ⚪ | Perfil da professora usa `/auth/me` (suficiente) |
| `/adis` | POST/GET/PATCH/DELETE | adiService.ts | ⚪ | Administrativo |
| `/escolas` | POST/GET/PATCH/DELETE | escolaService.ts | ⚪ | Administrativo |
| `/turmas` | POST/GET/PATCH/DELETE | turmaService.ts | ⚪ | Administrativo |
| `/eventos/:turmaId` | GET | calendar/index.tsx | ✅ | Eventos da turma no calendário |
| `/eventos` | GET | calendar/index.tsx (fallback) | ✅ | Quando não há turma definida |
| `/eventos` | POST/PATCH/DELETE | eventoService.ts | ⚪ | Sem tela de criação de eventos |
| `/ocorrencias` | GET | (teacher)/home.tsx | ✅ | **Integrado nesta auditoria** (antes "1" fixo) |
| `/ocorrencias` | POST/PATCH/DELETE | ocorrenciaService.ts | ⚪ | Sem tela de registro de ocorrência |
| `/vinculo/:respId/:bebeId` | POST | vinculoService.ts | ⚪ | Sem tela; vínculos criados via seed/API |

### Rotas públicas vs. protegidas (backend)

Protegidas por `ensureAuthenticated`: `/auth/me`, todos os `/diarios/*`, `/dashboard/*`, `/bebes/turma/:id`, `/bebes/perfil/:id`, `/adis/:id`, `/responsaveis/:id`. As demais (CRUDs de escolas, turmas, eventos, ocorrências, vínculo e os POST/GET/PATCH/DELETE básicos de bebês/adis/responsáveis) são **públicas** — aceitável para MVP, mas listado em pendências.

## AsyncStorage (Tarefa 1)

**Arquivos atualizados:**
- [secureStorage.ts](frontend/src/services/secureStorage.ts) — reescrito para usar exclusivamente `@react-native-async-storage/async-storage` (sem `expo-secure-store`, sem branch web/localStorage). API pública mantida (`saveStoredToken`, `getStoredToken`, `removeStoredToken`, `storeToken`) + aliases `saveToken`/`getToken`/`removeToken`. Nada que consome o wrapper (`api.ts`, `AuthContext.tsx`) precisou mudar.

**Dependências removidas:**
- `expo-secure-store` (removida via `npm uninstall`).
- `crypto-js`/`aes-js`: **não existiam** no projeto — nada a remover.

Outros usos de AsyncStorage já existentes (seleção de filho, relatórios visualizados, eventos locais/notificações) foram mantidos.

## Correções de integração aplicadas (Tarefa 3)

1. **[index.tsx](frontend/src/app/index.tsx)** — antes sempre redirecionava para o login, ignorando sessão restaurada. Agora aguarda o `AuthContext` e direciona para a home correta por tipo de usuário.
2. **[login.tsx](frontend/src/app/(auth)/login.tsx)** — botão com estado "Entrando..." e desabilitado durante a requisição; erros da API continuam exibidos de forma legível.
3. **[register/[id].tsx](frontend/src/app/register/[id].tsx)** — salvar relatório agora tem try/catch com mensagem de erro visível, estado "Salvando..." com botão desabilitado, e a data fixa "Segunda, 14 de Agosto" virou a data real do dia.
4. **[(responsible)/profile.tsx](frontend/src/app/(responsible)/profile.tsx)** — CPF, endereço, local de trabalho, telefone e parentesco mockados substituídos por dados reais de `GET /responsaveis/:id` (com fallback "Nao informado").
5. **[(teacher)/home.tsx](frontend/src/app/(teacher)/home.tsx)** — card "Ocorrencia: 1" fixo substituído pela contagem real de ocorrências do dia via `GET /ocorrencias` (falha não trava a tela: cai para 0).
6. **[(responsible)/home.tsx](frontend/src/app/(responsible)/home.tsx) + [ResponsibleChildContext.tsx](frontend/src/context/ResponsibleChildContext.tsx)** — antes a home retornava tela em branco (`null`) enquanto carregava ou sem filhos. Contexto ganhou flag `loading`; a home mostra spinner durante o carregamento e mensagem amigável se não houver criança vinculada.

`npx tsc --noEmit` passa sem erros no frontend e no backend.

## Endpoints criados no backend

**Nenhum.** Não foi necessário criar rotas.

### Endpoint faltando (aguardando confirmação — não criado)

- **Recuperação de senha** (`POST /auth/forgot-password`): a tela [forgot-password.tsx](frontend/src/app/(auth)/forgot-password.tsx) apenas simula o envio (valida email e mostra "enviado"). Implementar de verdade exigiria envio de email/token de reset — fora do escopo simples. Mantido como simulação (⚪).

## Fluxo principal validado (análise de código)

- **Login:** `POST /auth/login` → token salvo no AsyncStorage → interceptor injeta `Authorization: Bearer` em todas as chamadas → redirect por tipo de usuário. ✅
- **Dashboard professora:** `/auth/me` (turmas) → `/bebes/turma/:id` → `/diarios/bebe/:id` → estatísticas e lista reais + ocorrências reais. ✅
- **Funcionalidade principal (professora):** check-in de presença (`POST /diarios/presenca`) e relatório diário (`POST /diarios`) com loading/erro. ✅
- **Dashboard responsável:** filhos via `/auth/me`, status do dia via diários, detalhes em dailyReport e calendário com eventos reais. ✅
- **Logout:** remove token do AsyncStorage, limpa usuário, volta ao login. ✅

> Observação: a validação acima é estática (código + contratos batendo). Recomendo um teste manual com o seed (`npx prisma db seed`) antes da apresentação — ver passos de execução já documentados na conversa.

## Pendências pós-MVP

- **Segurança:** maioria dos CRUDs do backend é pública (sem `ensureAuthenticated`); senhas aceitas em texto plano no fallback de `passwordMatches`; cadastros (`/adis`, `/responsaveis`) gravam `senhaHash` sem hashear no servidor.
- **Recuperação de senha:** tela é simulação; precisa de endpoint + envio de email.
- **Foto do dia** no relatório do responsável: placeholder fixo ("A professora ainda nao enviou uma foto") — sem upload no backend.
- **Nome da professora** no relatório do responsável: fixo "Professora" no mapper (`mappers.ts`); o diário tem `adiId`, daria para resolver com include no backend.
- **Dashboard endpoints** (`/dashboard/*`) existem mas o app calcula no cliente; `totalTurma: 4` está hardcoded no `DashboardController`.
- **Telas administrativas** (escolas, turmas, eventos, ocorrências, vínculos, cadastro de bebês/adis/responsáveis): serviços prontos, sem UI.
- **Notificações/eventos locais** (`eventStorage.ts`, `utils/notifications/*`): usam AsyncStorage local e mockData; não conectados ao backend.
- **Constantes mock não usadas:** `constants/ResponsibleChildren.ts` e `constants/TeacherChildren.ts` são código morto (nenhum import) — podem ser deletadas.
- Horário "8 às 18h" no perfil da professora segue fixo (não existe esse campo no modelo).
