# Relatorio de Integracao Frontend x Backend

## Endpoints encontrados

| Metodo | Rota | Payload esperado | Resposta | Frontend conectado |
| --- | --- | --- | --- | --- |
| POST | `/auth/login` | `{ email, password ou senha, type? }` | `{ token, user }` | `src/context/AuthContext.tsx`, `src/app/(auth)/login.tsx` |
| GET | `/auth/me` | Header `Authorization` | usuario autenticado | `src/context/AuthContext.tsx` |
| POST | `/bebes` | `{ nome, dataNascimento, genero?, alergias?, turmaId, escolaId }` | bebe criado | Servico `bebeService` |
| GET | `/bebes` | - | lista de bebes | Servico `bebeService` |
| GET | `/bebes/turma/:TURMAid` | Header `Authorization` | bebes da turma | `TeacherAttendanceContext` |
| GET | `/bebes/perfil/:BEBEid` | Header `Authorization` | bebe com escola, turma e responsaveis | `src/app/baby/[id].tsx` |
| PATCH | `/bebes/:id` | campos parciais de bebe | bebe atualizado | Servico `bebeService` |
| DELETE | `/bebes/:id` | - | `204` | Servico `bebeService` |
| POST | `/diarios` | `{ bebeId, adiId, presenca/frequencia, humor, alimentacao, banho, sono/soneca, atividades, fralda, observacoes }` | diario criado | `src/app/register/[id].tsx` |
| POST | `/diarios/presenca` | `{ bebeId, adiId, presenca/frequencia, data? }` | diario criado/atualizado | `TeacherAttendanceContext`, `src/app/(teacher)/class.tsx` |
| GET | `/diarios` | Header `Authorization` | lista de diarios | Servico `diarioService` |
| GET | `/diarios/bebe/:bebeId?data=YYYY-MM-DD` | Header `Authorization` | diarios do bebe | `ResponsibleChildContext`, `TeacherAttendanceContext`, calendario |
| GET | `/diarios/:id` | Header `Authorization` | diario | Servico `diarioService` |
| PATCH | `/diarios/:id` | campos parciais de diario | diario atualizado | Servico `diarioService` |
| DELETE | `/diarios/:id` | - | `204` | Servico `diarioService` |
| GET | `/dashboard/:ADIid/:TURMAid` | Header `Authorization` | dashboard professora | Servico `dashboardService` |
| GET | `/dashboard/parents/:ParentID/:BabyID` | Header `Authorization` | dashboard responsavel | Servico `dashboardService` |
| POST | `/responsaveis` | `{ nome, cpf, email, senhaHash, telefone?, endereco?, bebeId?, parentesco? }` | responsavel criado | Servico `responsavelService` |
| GET | `/responsaveis` | - | lista de responsaveis | Servico `responsavelService` |
| GET | `/responsaveis/:responsavelId` | Header `Authorization` | perfil do responsavel | Servico `responsavelService` |
| PATCH | `/responsaveis/:id` | campos parciais | responsavel atualizado | Servico `responsavelService` |
| DELETE | `/responsaveis/:id` | - | `204` | Servico `responsavelService` |
| POST | `/adis` | `{ nome, matricula, email, telefone?, senhaHash, escolaId }` | ADI criada | Servico `adiService` |
| GET | `/adis` | - | lista de ADIs | Servico `adiService` |
| GET | `/adis/:ADIid` | Header `Authorization` | perfil da ADI | Servico `adiService` |
| PATCH | `/adis/:id` | campos parciais | ADI atualizada | Servico `adiService` |
| DELETE | `/adis/:id` | - | `204` | Servico `adiService` |
| POST | `/eventos` | `{ titulo, local, descricao, dataEvento, horario_inicio, horario_fim, escolaId, turmaId }` | evento criado | Servico `eventoService` |
| GET | `/eventos` | - | lista de eventos | `src/app/calendar/index.tsx` |
| GET | `/eventos/:TURMAid` | - | eventos da turma | `src/app/calendar/index.tsx` |
| PATCH | `/eventos/:id` | campos parciais | evento atualizado | Servico `eventoService` |
| DELETE | `/eventos/:id` | - | `204` | Servico `eventoService` |
| POST | `/ocorrencias` | `{ titulo, descricao, horario, prioridade, bebeId, adiId }` | ocorrencia criada | Servico `ocorrenciaService` |
| GET | `/ocorrencias` | - | lista de ocorrencias | Servico `ocorrenciaService` |
| PATCH | `/ocorrencias/:id` | campos parciais | ocorrencia atualizada | Servico `ocorrenciaService` |
| DELETE | `/ocorrencias/:id` | - | `204` | Servico `ocorrenciaService` |
| POST | `/escolas` | `{ nome, endereco?, telefone }` | escola criada | Servico `escolaService` |
| GET | `/escolas` | - | lista de escolas | Servico `escolaService` |
| PATCH | `/escolas/:id` | campos parciais | escola atualizada | Servico `escolaService` |
| DELETE | `/escolas/:id` | - | `204` | Servico `escolaService` |
| POST | `/turmas` | `{ nome?, anoLetivo, escolaId }` | turma criada | Servico `turmaService` |
| GET | `/turmas` | - | lista de turmas | Servico `turmaService` |
| PATCH | `/turmas/:id` | campos parciais | turma atualizada | Servico `turmaService` |
| DELETE | `/turmas/:id` | - | `204` | Servico `turmaService` |
| POST | `/vinculo/:responsavelId/:bebeId` | `{ parentesco }` | vinculo criado | Servico `vinculoService` |

## Telas e chamadas conectadas

- Login: `/auth/login`, token salvo em SecureStore.
- Restauracao de sessao: `/auth/me`.
- Home responsavel: filhos vindos de `/auth/me` e diarios por `/diarios/bebe/:bebeId`.
- Relatorio do responsavel: dados vindos do contexto alimentado por diarios reais.
- Home professora: lista da turma e status vindos de `/bebes/turma/:id` e `/diarios/bebe/:bebeId`.
- Turma/check-in: presenca salva em `/diarios/presenca`.
- Cadastro de relatorio diario: salva em `/diarios`.
- Perfil do bebe: `/bebes/perfil/:BEBEid`.
- Calendario: eventos por `/eventos` ou `/eventos/:TURMAid`; datas de relatorio por `/diarios/bebe/:bebeId`.
- Perfis de responsavel/professora: dados basicos do usuario autenticado.

## Mocks removidos ou substituidos

- Login baseado em email fixo substituido por `/auth/login`.
- Token/usuario em AsyncStorage substituido por SecureStore + `/auth/me`.
- `ResponsibleChildren` deixou de alimentar o contexto principal.
- `TeacherChildren` deixou de alimentar o contexto principal.
- Datas fixas de relatorio no calendario substituidas por diarios reais.
- Eventos mockados do calendario substituidos por `/eventos`.
- Dados fixos principais do perfil do bebe substituidos por `/bebes/perfil/:id`.

## Endpoints sem uso direto em telas

- CRUD administrativo de escolas, turmas, responsaveis, ADIs, ocorrencias e vinculos esta encapsulado em services, mas nao ha tela de CRUD para todos eles no app atual.
- `GET /dashboard/:ADIid/:TURMAid` e `GET /dashboard/parents/:ParentID/:BabyID` ficaram encapsulados em service; as telas atuais usam endpoints mais especificos para preservar o layout existente.

## Ajustes feitos no backend

- `POST /diarios/presenca`: registra ou atualiza a presenca do bebe no dia.
- `GET /diarios/bebe/:bebeId?data=YYYY-MM-DD`: lista diarios de um bebe, opcionalmente filtrando por dia.

## Pendencias

- Nao existe endpoint de recuperacao de senha para a tela "Esqueci minha senha".
- Para notificacoes push reais, ainda falta backend de notificacoes; o app hoje apenas agenda notificacoes locais.
