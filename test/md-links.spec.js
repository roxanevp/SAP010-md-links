const mdLinks = require('..');

describe('mdLinks', () => {
  describe('deveria chamar a função mdLinks', () => {
    test('passou o path como parametro', () => {
      mdLinks('./readme.md');
    });

    test('não passou o path como parametro', () => {
      mdLinks();
    });
  });
});
