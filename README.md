# desafio-cypress-QA

## Objetivo

Automatizar cenários de testes no site simulado de e-commerce [lojaebac.ebaconline.art.br](http://lojaebac.ebaconline.art.br), utilizando Cypress, com foco em funcionalidades reutilizáveis e críticas para o negócio.

---

## Como instalar as dependências

```bash
npm install
```

---

## Como rodar os testes

```bash
npx cypress open
```

Ou, para rodar em modo headless:

```bash
npx cypress run
```

---

## Estrutura do projeto

- `cypress/e2e/login-e-compra.cy.js`: contém todos os testes de login, validações e fluxo completo de compra
- `cypress.config.js`: configurações do Cypress
- `package.json`: dependências e scripts do projeto

---

## Cenários automatizados

- Login com credenciais válidas
- Login com credenciais inválidas
- Validação de campos obrigatórios no login
- Redirecionamento após login bem-sucedido
- Exibição de menu e mensagem de boas-vindas
- Busca e compra do produto Taurus Elements Shell
- Validação de campos obrigatórios na tela de faturamento
- Aceite dos termos e condições antes da finalização da compra

---

## Motivo da escolha

Esses cenários representam funcionalidades essenciais e reutilizáveis em qualquer fluxo de e-commerce. Garantem que o usuário consiga acessar sua conta, realizar uma compra com variações de produto e que o sistema valide corretamente os dados obrigatórios antes de concluir o pedido.

---

## Autor

Murilo Munhoz  
Email: murilomunhoz.mgm@gmail.com  
GitHub: [MuriloGMunhoz](https://github.com/MuriloGMunhoz)
```
