# Relatório de Endpoints — API Diário do Bebê

Data: 11/06/2026 · Base URL: `http://localhost:3000` (dev) / `http://192.168.1.73:3000` (Expo Go)

🔒 = exige `Authorization: Bearer <token>` (middleware `ensureAuthenticated`) · 🌐 = rota pública

Total: **43 endpoints** em 11 grupos de rotas.

---

## Auth (`/auth`) — 2 endpoints

| Método | Rota | Auth | Uso no frontend |
|---|---|---|---|
| POST | `/auth/login` | 🌐 | `authService.loginRequest` → tela de login |
| GET | `/auth/me` | 🔒 | `authService.getAuthenticatedUser` → restaurar sessão e pós-login |

**POST /auth/login** — payload: `{ email, senha | password, type? ('responsible'|'teacher') }`. Tenta responsável primeiro, depois ADI. Resposta `200`: `{ token, user: { id, nome, email, type, escolaId? } }`. Erros: `400` campos faltando, `401` credenciais inválidas. Aceita senha em texto plano se o registro não estiver hasheado (fallback de dev).

**GET /auth/me** — resposta para responsável inclui `bebes` (vínculos + dados do bebê); para professora inclui `escola` e `turmas`. Erros: `401` token inválido, `404` usuário não encontrado.

---

## Bebês (`/bebes`) — 6 endpoints

| Método | Rota | Auth | Uso no frontend |
|---|---|---|---|
| POST | `/bebes` | 🌐 | `bebeService.createBebe` (sem tela) |
| GET | `/bebes` | 🌐 | `bebeService.listBebes` (sem tela) |
| GET | `/bebes/turma/:TURMAid` | 🔒 | `TeacherAttendanceContext` → lista da turma |
| GET | `/bebes/perfil/:BEBEid` | 🔒 | `baby/[id].tsx` → perfil da criança |
| PATCH | `/bebes/:id` | 🌐 | `bebeService.updateBebe` (sem tela) |
| DELETE | `/bebes/:id` | 🌐 | `bebeService.deleteBebe` (sem tela) |

**POST** — payload: `{ nome*, dataNascimento*, genero, alergias, turmaId*, escolaId* }`. `400` se faltar obrigatório.
**GET /turma/:id** — array de bebês da turma (sem includes).
**GET /perfil/:id** — bebê com `escola`, `turma` e `responsaveis` (vínculo + responsável). Atenção: retorna `200` com corpo `null` se o id não existir.

---

## Diários (`/diarios`) — 7 endpoints

| Método | Rota | Auth | Uso no frontend |
|---|---|---|---|
| POST | `/diarios` | 🔒 | `register/[id].tsx` → salvar relatório diário |
| POST | `/diarios/presenca` | 🔒 | `class.tsx` → check-in de presença |
| GET | `/diarios` | 🔒 | `diarioService.listDiarios` (sem tela) |
| GET | `/diarios/bebe/:bebeId` | 🔒 | Contextos + calendário → histórico por criança |
| GET | `/diarios/:id` | 🔒 | `diarioService.getDiario` (sem tela) |
| PATCH | `/diarios/:id` | 🔒 | `diarioService.updateDiario` (sem tela) |
| DELETE | `/diarios/:id` | 🔒 | `diarioService.deleteDiario` (sem tela) |

**POST /diarios** — payload flexível, normalizado no backend: `{ bebeId*, adiId*, presenca|frequencia, chegadaHumor|humor, alimentacao, banho ('sim'|'nao'|bool), sono | sonecaInicio+sonecaFim, fralda | fraldaTrocada+quantidadeFraldas, atividades (array→JSON), desenvolvimentoPedagogico, observacoes|observacoesFinais, data? }`. `400` se presente sem humor/desenvolvimento. Resposta `201` com o diário criado.

**POST /diarios/presenca** — payload: `{ bebeId*, adiId*, frequencia|presenca, data? }`. Faz **upsert por dia**: se já existe diário do bebê na data, atualiza a frequência; senão cria. `200` (atualizado) ou `201` (criado).

**GET /diarios/bebe/:bebeId** — query opcional `?data=YYYY-MM-DD` filtra o dia; ordenado por data desc.

---

## Responsáveis (`/responsaveis`) — 5 endpoints

| Método | Rota | Auth | Uso no frontend |
|---|---|---|---|
| POST | `/responsaveis` | 🌐 | `responsavelService.createResponsavel` (sem tela) |
| GET | `/responsaveis` | 🌐 | `responsavelService.listResponsaveis` (sem tela) |
| GET | `/responsaveis/:responsavelId` | 🔒 | `(responsible)/profile.tsx` → perfil |
| PATCH | `/responsaveis/:id` | 🌐 | sem uso |
| DELETE | `/responsaveis/:id` | 🌐 | sem uso |

**POST** — payload: `{ nome*, cpf*, email*, senhaHash*, telefone, endereco, bebeId?, parentesco? }` — se `bebeId`+`parentesco` vierem, cria o vínculo junto. ⚠️ a senha é gravada como vier (sem hash no servidor).
**GET /:id** — responsável com `bebes` (vínculos + bebê). `404` se não existir.

---

## ADIs / Professoras (`/adis`) — 5 endpoints

| Método | Rota | Auth | Uso no frontend |
|---|---|---|---|
| POST | `/adis` | 🌐 | `adiService.createAdi` (sem tela) |
| GET | `/adis` | 🌐 | `adiService.listAdis` (sem tela) |
| GET | `/adis/:ADIid` | 🔒 | `adiService.getAdiProfile` (sem tela; perfil usa `/auth/me`) |
| PATCH | `/adis/:id` | 🌐 | sem uso |
| DELETE | `/adis/:id` | 🌐 | sem uso |

**POST** — payload: `{ nome*, matricula*, email*, telefone, senhaHash, escolaId }`. **GET /:id** — ADI com `escola` e `turmas`; `404` se não existir.

---

## Dashboard (`/dashboard`) — 2 endpoints

| Método | Rota | Auth | Uso no frontend |
|---|---|---|---|
| GET | `/dashboard/:ADIid/:TURMAid` | 🔒 | `dashboardService.getTeacherDashboard` (standby — home calcula no cliente) |
| GET | `/dashboard/parents/:ParentID/:BabyID` | 🔒 | `dashboardService.getParentDashboard` (standby) |

**Professora** — resposta: `{ perfil { nome, escola, saudacao }, estatisticas { preenchidos, ausentes, totalTurma }, ocorrencias, listaCrianças, turmaAtual, listarAlunos }`. ⚠️ `totalTurma` está fixo em `4` e `ocorrencias` não filtra por turma. `404` se a ADI não existir.

**Responsável** — resposta: `{ perfil { nome, escola, turma, saudacao }, filhos, statusHoje { presente, alimentacao, sono } | { presente: false, mensagem } }`. `404` se responsável ou bebê não existir.

---

## Escolas (`/escolas`) — 4 endpoints

| Método | Rota | Auth | Uso no frontend |
|---|---|---|---|
| POST | `/escolas` | 🌐 | sem uso (payload: `{ nome*, telefone*, endereco }`) |
| GET | `/escolas` | 🌐 | sem uso |
| PATCH | `/escolas/:id` | 🌐 | sem uso |
| DELETE | `/escolas/:id` | 🌐 | sem uso |

---

## Turmas (`/turmas`) — 4 endpoints

| Método | Rota | Auth | Uso no frontend |
|---|---|---|---|
| POST | `/turmas` | 🌐 | sem uso (payload: `{ nome, anoLetivo*, escolaId* }`) |
| GET | `/turmas` | 🌐 | sem uso |
| PATCH | `/turmas/:id` | 🌐 | sem uso |
| DELETE | `/turmas/:id` | 🌐 | sem uso |

---

## Eventos (`/eventos`) — 5 endpoints

| Método | Rota | Auth | Uso no frontend |
|---|---|---|---|
| POST | `/eventos` | 🌐 | sem uso (payload: `{ titulo*, dataEvento*, descricao, local, horario_inicio, horario_fim, escolaId, turmaId }`) |
| GET | `/eventos` | 🌐 | `calendar/index.tsx` (fallback sem turma) |
| GET | `/eventos/:TURMAid` | 🌐 | `calendar/index.tsx` → eventos da turma |
| PATCH | `/eventos/:id` | 🌐 | sem uso |
| DELETE | `/eventos/:id` | 🌐 | sem uso |

⚠️ A rota `GET /eventos/:TURMAid` captura qualquer `GET /eventos/<algo>` — não existe rota "evento por id".

---

## Ocorrências (`/ocorrencias`) — 4 endpoints

| Método | Rota | Auth | Uso no frontend |
|---|---|---|---|
| POST | `/ocorrencias` | 🌐 | sem uso (payload: `{ titulo*, prioridade*, descricao, horario, bebeId, adiId }`) |
| GET | `/ocorrencias` | 🌐 | `(teacher)/home.tsx` → card "Ocorrencias hoje" |
| PATCH | `/ocorrencias/:id` | 🌐 | sem uso |
| DELETE | `/ocorrencias/:id` | 🌐 | sem uso |

⚠️ `GET /ocorrencias` retorna **todas** as ocorrências (sem filtro por turma/escola); o frontend filtra por data no cliente.

---

## Vínculo (`/vinculo`) — 1 endpoint

| Método | Rota | Auth | Uso no frontend |
|---|---|---|---|
| POST | `/vinculo/:responsavelId/:bebeId` | 🌐 | `vinculoService.vincularFilho` (sem tela) |

Payload: `{ parentesco* }`. Cria registro em `VinculoFamiliar`. `400` sem parentesco; erro do Prisma se o par já existir (constraint `@@unique`).

---

## Resumo

| Grupo | Endpoints | Protegidos | Usados pelo app |
|---|---|---|---|
| /auth | 2 | 1 | 2 |
| /bebes | 6 | 2 | 2 |
| /diarios | 7 | 7 | 3 |
| /responsaveis | 5 | 1 | 1 |
| /adis | 5 | 1 | 0 |
| /dashboard | 2 | 2 | 0 |
| /escolas | 4 | 0 | 0 |
| /turmas | 4 | 0 | 0 |
| /eventos | 5 | 0 | 2 |
| /ocorrencias | 4 | 0 | 1 |
| /vinculo | 1 | 0 | 0 |
| **Total** | **43** | **14** | **11** |

### Observações de segurança (pós-MVP)
- 29 endpoints são públicos, incluindo todos os DELETE/PATCH de escolas, turmas, eventos e ocorrências.
- Senhas são gravadas sem hash no servidor (`senhaHash` vem pronto do cliente) e o login aceita texto plano como fallback.
- Não há verificação de "dono": qualquer token válido acessa dados de qualquer responsável/turma (ex: `GET /responsaveis/:id` de outro usuário).
- Tabelas `VivenciaGeral` e `AvisoGeral` existem no banco (e no seed) mas **não têm nenhuma rota** — candidatas a endpoints futuros.
