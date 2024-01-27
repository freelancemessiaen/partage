/// <reference types="cypress" />

import todos from '../fixtures/todos';

const BASE_URL = 'https://restapi.fr/api/rtodo';

describe('my first set of tests', () => {
  before(() => {
    cy.intercept(BASE_URL, { fixture: 'todos' }).as('fetchedTodos');
    cy.fixture('todos').as('todos');
    cy.visit('/');
  });

  it('my first test', () => {
    cy.wait('@fetchedTodos').its('request.method').should('equal', 'GET');

    cy.get('@todos').should('have.length', 4);
    cy.wrap(todos).should('have.length', 4);
  });
});