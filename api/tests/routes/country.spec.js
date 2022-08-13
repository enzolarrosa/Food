/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn, Diet } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  summary: 'Carne con tomate y queso encima.'
};
const dietas = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "lacto vegetarian",
  "ovo vegetarian",
  "vegan",
  "pescetarian",
  "paleo",
  "primal",
  "low fodmap",
  "whole 30",
];

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
});

describe('Diets routes ', () => {
  it('should get diets', () => {
    agent.get('/diets').expect(dietas)
  })
})
