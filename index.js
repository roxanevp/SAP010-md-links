const fs = require('fs');
const axios = require('axios');

const checkStatus = (callback) => (param) => {
  if (param.status >= 200 || param.status < 400) {
    return callback({ status: param.status, ok: 'ok' });
  }

  const failedStatus = JSON.parse(JSON.stringify(param));
  return callback({ status: failedStatus.status, ok: 'fail' });
};

const validateLink = (link) => new Promise((resolve, reject) => {
  axios.get(link)
    .then(checkStatus(resolve))
    .catch(checkStatus(resolve));
});

const readFileFolder = (path, success, fail) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      fail(err);
      return;
    }

    const searchLinks = /(\[.*\]\(http.*\))/gmi;
    const foundLinks = data.match(searchLinks) || [];
    const links = foundLinks.map((link) => {
      const [text, url] = link.split('](');
      return {
        text: text.replace('[', ''),
        href: url.replace(')', ''),
        file: path,
      };
    });

    success(links);
  });
};

const readPath = (path, success, fail) => {
  const stats = fs.statSync(path);
  const isFolder = stats.isDirectory();

  if (isFolder) {
    const folderContent = fs.readdirSync(path, { withFileTypes: true })
      .map((item) => ({ name: item.name, isFolder: item.isDirectory() }));

    const files = folderContent.filter((item) => item.isFolder === false && item.name.endsWith('.md'));
    const folders = folderContent.filter((item) => item.isFolder === true);

    Promise.all([
      // trás todos os links dos arquivos da pasta atual
      ...files.map((file) => new Promise((resolve, reject) => {
        readFileFolder(`${path}/${file.name}`, resolve, reject);
      })),
      // chama a função readPath novamente para cada uma das pastas dentro da pasta
      // atual (função recursiva)
      ...folders.map((folder) => new Promise((resolve, reject) => {
        readPath(`${path}/${folder.name}`, resolve, reject);
      })),
    // quando todas as promises resolvem, cria um array de links, ou dispara o erro
    ]).then((values) => success([].concat(...values))).catch(fail);
  } else {
    readFileFolder(path, success, fail);
  }
};

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const pathExists = fs.existsSync(path);

  if (pathExists) {
    readPath(path, resolve, reject);
  }
});

exports.validateLink = validateLink;
// module.exports = mdLinks;
