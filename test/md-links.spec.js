const chalk = require('chalk');
const mdLinks = require('../cli');

// checkStatus (Função que valida o código de status do link)
// - testa se um link com status 200 retorna sucesso
// - testa se um link com status 300 retorna sucesso
// - testa se um link com status 400 retorna falha
// - testa se um link com status 500 retorna falha
//
// validateLink (Função que bate na internet e pega o status do link)
// - testa se um link funcional retorna 200
// - testa se um link não funcional retorn 404
//
// readFileFolder (Função que lê o arquivo e pega os links dele)
// - testa um arquivo com links e retorna os links
// - testa um arquivo sem links e retorna um array vazio
//
// readPath (Função que valida se o path é um arquivo ou pasta,
// se for pasta executa recursivamente,
// se for arquivo chama a função readFileFolder)
// - testa se é um arquivo ou pasta
// - se for um arquivo:
//   - testa a aquisição de links
// - se for uma pasta:
//   - testa se a pasta está vazia
//   - testa a leitura dos arquivos da pasta e aquisição de links nestes arquivos
//   - testa se tem outras pastas e chama ela mesma de forma recursiva, caso tenha
//
// readAllFilesAndFolders (Função que valida se o path inicial existe)
// - testa se o path existe
// - testa se o path não existe
//
// mdLinks (Função principal, que chama todas as outras)
// - testa se é uma função
// - testa se retorna uma promise

// getStats (Função que valida se option stats foi passado e muda o retorno do cli de acordo)
// - testa se o option status não foi passado e retorna um array de links
// - testa se o option status foi passado e retorna total de links e links unicos
// - testa se o option status e o option validate foram passados e retorna links quebrados também
//
// statusColor (Função que colore o terminal de acordo com o status do link)
// - testa se o link é válido e imprime o valor na cor verde
// - testa se o link é invalido e imprime o valor na cor vermelha
// - testa se não tem status de link e retorna null
//
// renderLine (Função que imprime a linha de link no console)
// - testa se a linha é impressa corretamente
// - testa se o option validate é passado e ele imprime os status do link
//
// main (Função principal do CLI, chama a função MDLinks do index e imprime o resultado)
// - testa um path inexistente
// - testa um path existente de arquivo
// - testa um path existente de pasta
// - testa com o option validate
// - testa com o option stats
// - testa com o option validate e o stats

let log;

const resultFn = (done, results) => () => {
  results.forEach((result, index) => {
    expect(log).toHaveBeenNthCalledWith(index + 1, result);
  });

  done();
};

const statusColor = (value) => {
  if (value === null) {
    return null;
  }

  return value === 'fail' || value >= 400
    ? chalk.red(value)
    : chalk.green(value);
};

const renderTestLine = (file, href, text, status = null, code = null) => [
  chalk.yellow(file),
  chalk.underline.cyanBright(href),
  statusColor(status),
  statusColor(code),
  chalk.white(text),
].filter((item) => item !== null).join(' ');

describe('mdLinks', () => {
  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    log.mockReset();
  });

  describe('deveria chamar a função mdLinks', () => {
    test('passou o de um arquivo path como parametro', (done) => {
      const results = [
        renderTestLine('./exemplos/exemplo1.md', 'https://facebook.com', 'exemplo facebook'),
        renderTestLine('./exemplos/exemplo1.md', 'https://facebook.com', 'exemplo facebook2'),
        renderTestLine('./exemplos/exemplo1.md', 'https://youtube.com/exit/dimitri', 'exemplo youtube erro'),
      ];

      mdLinks('./exemplos/exemplo1.md', null, resultFn(done, results));
    });

    test('passou o path como parametro', (done) => {
      const results = [
        renderTestLine('./exemplos/exemplo1.md', 'https://facebook.com', 'exemplo facebook'),
        renderTestLine('./exemplos/exemplo1.md', 'https://facebook.com', 'exemplo facebook2'),
        renderTestLine('./exemplos/exemplo1.md', 'https://youtube.com/exit/dimitri', 'exemplo youtube erro'),
        renderTestLine('./exemplos/exemplo2.md', 'https://google.com', 'exemplo google'),
        renderTestLine('./exemplos/exemplo2.md', 'https://facebook.com/exit/dimitri', 'exemplo facebook erro'),
        renderTestLine('./exemplos/exemplospasta/exemplo4.md', 'https://google.com', 'Um exemplo aqui'),
        renderTestLine('./exemplos/exemplospasta/exemplo4.md', 'https://goosgle.com', 'Um exemplo que de erro'),
      ];

      mdLinks('./exemplos', null, resultFn(done, results));
    });

    test('passou o path como parametro e o option validate', (done) => {
      const results = [
        renderTestLine('./exemplos/exemplo1.md', 'https://facebook.com', 'exemplo facebook', 'ok', 200),
        renderTestLine('./exemplos/exemplo1.md', 'https://facebook.com', 'exemplo facebook2', 'ok', 200),
        renderTestLine('./exemplos/exemplo1.md', 'https://youtube.com/exit/dimitri', 'exemplo youtube erro', 'fail', 404),
        renderTestLine('./exemplos/exemplo2.md', 'https://google.com', 'exemplo google', 'ok', 200),
        renderTestLine('./exemplos/exemplo2.md', 'https://facebook.com/exit/dimitri', 'exemplo facebook erro', 'fail', 404),
        renderTestLine('./exemplos/exemplospasta/exemplo4.md', 'https://google.com', 'Um exemplo aqui', 'ok', 200),
        renderTestLine('./exemplos/exemplospasta/exemplo4.md', 'https://goosgle.com', 'Um exemplo que de erro', 'fail'),
      ];

      mdLinks('./exemplos', { validate: true }, resultFn(done, results));
    });

    test('passou o path como parametro e o option validate', (done) => {
      const results = [
        chalk.yellow('total:', 7),
        chalk.cyan('unique:', 5),
      ];

      mdLinks('./exemplos', { stats: true }, resultFn(done, results));
    });

    test('passou o path como parametro e o option validate e o stats', (done) => {
      const results = [
        chalk.yellow('total:', 7),
        chalk.cyan('unique:', 5),
        chalk.red('broken:', 3),
      ];

      mdLinks('./exemplos', { validate: true, stats: true }, resultFn(done, results));
    });

    test('não passou o path como parametro', (done) => {
      const results = [
        'The path to the file does not exist or was used incorrectly',
      ];

      mdLinks(null, null, resultFn(done, results));
    });
  });
});
