describe('Fluxo completo de compra - EBAC Loja', () => {
  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/');
    cy.get('.icon-user').click(); // Acessa a pagina de login
  });

  it('realizar login com credenciais validas', () => {
    cy.get('#username').type('murilogoncalves_munhoz@hotmail.com');
    cy.get('#password').type('pass123');
    cy.get('button[name="login"]').click();
    cy.url().should('include', '/minha-conta');
  });

  it('exibir erro com credenciais invalidas', () => {
    cy.get('#username').type('murilogoncalves_munhoz@hotmail.com');
    cy.get('#password').type('pass999');
    cy.get('button[name="login"]').click();
    cy.contains('Erro:').should('be.visible');
  });

  it('validar campos obrigatorios vazios', () => {
    cy.get('button[name="login"]').click();
    cy.get('#username:invalid').should('exist');
    cy.get('#password:invalid').should('exist');
  });

  it('redirecionar para a conta apos login bem-sucedido', () => {
    cy.get('#username').type('murilogoncalves_munhoz@hotmail.com');
    cy.get('#password').type('pass123');
    cy.get('button[name="login"]').click();
    cy.url().should('include', '/minha-conta');
  });

  it('exibir mensagem de boas-vindas e menu do usuario apos login', () => {
    cy.get('#username').type('murilogoncalves_munhoz@hotmail.com');
    cy.get('#password').type('pass123');
    cy.get('button[name="login"]').click();
    cy.contains('Ola').should('be.visible');
    cy.get('.woocommerce-MyAccount-navigation').should('exist');
  });

  it('realizar compra do produto Taurus Elements Shell', () => {
    cy.get('#username').type('murilogoncalves_munhoz@hotmail.com');
    cy.get('#password').type('pass123');
    cy.get('button[name="login"]').click();
    cy.url().should('include', '/minha-conta');

    cy.get('.search-field').type('Taurus Elements Shell{enter}');
    cy.contains('Taurus Elements Shell').click();
    cy.get('select[name="attribute_pa_size"]').select('XS');
    cy.get('select[name="attribute_pa_color"]').select('Blue');
    cy.get('button.single_add_to_cart_button').click();
    cy.contains('foi adicionado no seu carrinho').should('be.visible');

    cy.visit('http://lojaebac.ebaconline.art.br/carrinho/');
    cy.contains('Concluir Compra').click();

    cy.get('#billing_first_name').type('Murilo');
    cy.get('#billing_last_name').type('Munhoz');
    cy.get('#billing_company').type('EMPRESA');
    cy.get('#billing_address_1').type('CASA');
    cy.get('#billing_address_2').type('Nagoya Garden');
    cy.get('#billing_city').type('Vargem Grande Paulista');
    cy.get('#billing_state').select('SP');
    cy.get('#billing_postcode').type('06730000');
    cy.get('#billing_phone').type('11957939614');
    cy.get('#billing_email').clear().type('murilogoncalves_munhoz@hotmail.com');

    cy.get('#payment_method_cod').check();
    cy.get('#terms').check(); // Aceita os termos e condicoes
    cy.get('#place_order').click();

    cy.contains('Obrigado. Seu pedido foi recebido.').should('be.visible');
    cy.contains('Taurus Elements Shell - XS, Blue').should('be.visible');
    cy.contains('R$65,00').should('be.visible');
  });

  it('validar campos obrigatorios na tela de faturamento', () => {
    cy.get('#username').type('murilogoncalves_munhoz@hotmail.com');
    cy.get('#password').type('pass123');
    cy.get('button[name="login"]').click();
    cy.url().should('include', '/minha-conta');

    cy.get('.search-field').type('Taurus Elements Shell{enter}');
    cy.contains('Taurus Elements Shell').click();
    cy.get('select[name="attribute_pa_size"]').select('XS');
    cy.get('select[name="attribute_pa_color"]').select('Blue');
    cy.get('button.single_add_to_cart_button').click();

    cy.visit('http://lojaebac.ebaconline.art.br/carrinho/');
    cy.contains('Concluir Compra').click();

    // Tenta finalizar sem preencher os campos
    cy.get('#place_order').click();

    // Valida mensagens de erro
    cy.contains('O campo "Nome" do endereco de faturamento').should('be.visible');
    cy.contains('O campo "Sobrenome" do endereco de faturamento').should('be.visible');
    cy.contains('O campo "Endereco" do endereco de faturamento').should('be.visible');
    cy.contains('O campo "Cidade" do endereco de faturamento').should('be.visible');
    cy.contains('O campo "CEP" do endereco de faturamento').should('be.visible');
    cy.contains('O campo "Telefone" do endereco de faturamento').should('be.visible');
    cy.contains('Li e concordo com o(s) termos e condicoes do site').should('be.visible');
  });
});
