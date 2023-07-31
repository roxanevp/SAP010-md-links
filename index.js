const fs = require('fs');
const axios = require('axios');

const checkStatus = (callback, link) => (param) => {
  if (param.status >= 200 || param.status < 400) {
    return callback({ ...link, status: param.status, ok: 'ok' });
  }

  const failedStatus = JSON.parse(JSON.stringify(param));
  return callback({ ...link, status: failedStatus.status, ok: 'fail' });
};

const validateLink = (link) => new Promise((resolve) => {
  axios.get(link.href)
    .then(checkStatus(resolve, link))
    .catch(checkStatus(resolve, link));
});

const getStats = (options, success) => (links) => {
  if (options.stats) {
    const total = links.length;
    const unique = new Set(links.map(({ href }) => href)).size;
    
    if(options.validate) {
      const broken = links.filter((link) => link.ok === 'fail').length;
      return success({ links, total, unique, broken });
    } else {
      return success({ links, total, unique });
    }
  }

  return success(links);
};

const readFileFolder = (path, success, fail, options) => {
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
    const { validate } = options;
    if (validate) {
      Promise.all(links.map(validateLink)).then(success);
    } else {
      success(links);
    }
  });
};

const readPath = (path, success, fail, options) => {
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
        readFileFolder(`${path}/${file.name}`, resolve, reject, options);
      })),
      // chama a função readPath novamente para cada uma das pastas dentro da pasta
      // atual (função recursiva)
      ...folders.map((folder) => new Promise((resolve, reject) => {
        readPath(`${path}/${folder.name}`, resolve, reject, options);
      })),
    // quando todas as promises resolvem, cria um array de links, ou dispara o erro
    ]).then((values) => success([].concat(...values))).catch(fail);
  } else {
    readFileFolder(path, success, fail, options);
  }
};

const readAllFilesAndFolders = (path, options) => new Promise((resolve, reject) => {
  const pathExists = fs.existsSync(path);

  if (pathExists) {
    readPath(path, resolve, reject, options);
  } else {
    console.log('The path to the file does not exist or was used incorrectly');
  }
})

const mdLinks = (path, options = {}) => new Promise((resolve, reject) => {
  readAllFilesAndFolders(path, options).then(getStats(options, resolve)).catch(reject);
});

module.exports = mdLinks;
