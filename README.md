# Bolso Universitário
Aplicação web minimalista de controle de gastos diários para estudantes universitários, desenvolvida em HTML, CSS e JavaScript com persistência via localStorage. Atividade da disciplina de Desenvolvimento de Sistemas Web (UFMA)

#  Bolso Universitário

Aplicação web minimalista voltada para estudantes universitários controlarem suas despesas diárias rápidas (como restaurante universitário, passagens, lanches e impressões). Desenvolvida como atividade prática da disciplina **Desenvolvimento de Sistemas Web (EECP0036)** na **Universidade Federal do Maranhão (UFMA)** — Prof. Renan Sousa Freire.

##  O que o app faz

- **Registro de despesas:** Adiciona gastos contendo descrição e valor em reais (R$).
- **Cálculo em tempo real:** Atualiza automaticamente o saldo total acumulado a cada adição ou remoção.
- **Remoção de itens:** Permite excluir despesas individuais da lista.
- **Persistência local (Trilha C):** Salva e carrega a lista automaticamente no navegador utilizando `localStorage`, sem necessidade de banco de dados externo ou login.
- **Segurança e Validação:** Valida entradas vazias ou valores inválidos com mensagens amigáveis na interface e utiliza exclusivamente `textContent` para inserção de dados no DOM (prevenindo XSS).

##  Como rodar o projeto

1. Clone este repositório:
   ```bash
   git clone [https://github.com/SEU-USUARIO/bolso-universitario-dsw.git](https://github.com/SEU-USUARIO/bolso-universitario-dsw.git)
