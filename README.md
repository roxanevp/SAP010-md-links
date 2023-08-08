# Markdown Links

## Índice

* [1. Prefácio](#1-prefácio)
* [2. Guia de instalação e uso](#2-guia-de-instalação-e-uso)
* [3. Funcionalidades da Biblioteca](#3-funcionalidades-da-biblioteca)
* [4. Fluxograma](#4-fluxograma)
* [5. Tecnologias Utilizadas](#5-tecnologias-utilizadas)
* [6. Colaboradores](#6-colaboradores)

***

## 1. Prefácio

[Markdown](https://pt.wikipedia.org/wiki/Markdown) é uma linguagem de marcação muito popular entre os programadores. É usada em muitas plataformas que manipulam texto (GitHub, fórum, blogs e etc) e é muito comum encontrar arquivos com este formato em qualquer repositório (começando pelo tradicional README.md).

O Objetivo deste projeto é desenvolver uma biblioteca que lê arquivos Markdown através de uma CLI (command-line interface) que possiblita a execução da biblioteca no terminal, a partir de um módulo do Node.js, no qual, este irá fazer a leitura dos arquivos em formato Markdown('.md'), verificando a existência de links e estatisticas que nele existem.


## 2. Guia de instalação e uso

### 2.1 Instalação

Para instalar a biblioteca, utilize o gerenciador de pacotes npm. No terminal, execute o seguinte comando:

```
npm install https://github.com/roxanevp/SAP010-md-links.git
```

### 2.2 Utilização

Após a instalação, você poderá utilizar o Markdown Links através da CLI, basta executar o seguinte comando:

```
mdlinks <caminho-do-arquivo> [--validate] [--stats]
```
Como:

< caminho-do-arquivo > : O caminho para o arquivo .md que deseja analisar. <br>
--validate: (Opcional) Realiza a validação dos links, exibindo o status de cada link (ativo ou quebrado).<br>
--stats: (Opcional) Exibe estatísticas dos links, como o total de links e links únicos. Exemplo:

## 3. Funcionalidades da Biblioteca 

O Markdown Links oferece as seguintes funcionalidades:

### 3.1 Extração de Links

A biblioteca é capaz de ler um arquivo .md e extrair os links presentes nele. Os links são identificados pelo formato ```[texto] (url)```.

<img width="808" alt="image" src="https://github.com/roxanevp/SAP010-md-links/assets/101724531/7799e0b1-de1f-4bf7-b5fc-79630a9ef074">


### 3.2 Validação de Links

Utilizando a opção --validate na CLI, a biblioteca realizará uma requisição HTTP para cada link encontrado a fim de verificar se estão ativos ou quebrados. Os links ativos terão o status "ok" e os quebrados terão o status "fail".

<img width="808" alt="image" src="https://github.com/roxanevp/SAP010-md-links/assets/101724531/5a55ba47-003d-489d-99b4-c54faf75b899">


### 3.3 Estatísticas de Links

Utilizando a opção --stats na CLI, a biblioteca exibirá estatísticas sobre os links encontrados no arquivo. Será exibido o total de links e a quantidade de links únicos.

<img width="808" alt="image" src="https://github.com/roxanevp/SAP010-md-links/assets/101724531/35a6870b-659a-435b-bd03-4e60d69e1c34">


### 3.4 Validação e Estatísticas de Links

Utilizando as opções --validate --stats na CLI, a biblioteca exibirá tanto as estatísticas quanto a validação dos links encontrados.

<img width="808" alt="image" src="https://github.com/roxanevp/SAP010-md-links/assets/101724531/b6a08d7f-0a48-4386-8903-79572f176eab">


## 4. Fluxograma

![md-links](https://raw.githubusercontent.com/roxanevp/SAP010-md-links/7f6ae222446dea2311c0d4dc3c9f21b97c6208ff/Fluxograma.drawio.svg)

Também usado o GitHub Projects para o planejamento de cada etapa dentro dos marcos acima do projeto. 

## 5. Tecnologias Utilizadas

<div dir="auto"><br> 
  <a target="_blank" rel="noopener noreferrer nofollow" href="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg"><img align="center" alt="JS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" style="max-width: 100%;"></a>
  <a target="_blank" rel="noopener noreferrer nofollow" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"><img align="center" alt="GitHub" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" style="max-width: 100%;"></a>
  <a target="_blank" rel="noopener noreferrer nofollow" href="https://camo.githubusercontent.com/dc9e7e657b4cd5ba7d819d1a9ce61434bd0ddbb94287d7476b186bd783b62279/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6769742f6769742d6f726967696e616c2e737667"><img align="center" alt="git" height="30" width="40" src="https://camo.githubusercontent.com/dc9e7e657b4cd5ba7d819d1a9ce61434bd0ddbb94287d7476b186bd783b62279/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6769742f6769742d6f726967696e616c2e737667" data-canonical-src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style="max-width: 100%;"></a>
  <a target="_blank" rel="noopener noreferrer nofollow" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"><img align="center" alt="Jest" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" style="max-width: 100%;"></a>
  <a target="_blank" rel="noopener noreferrer nofollow" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"><img align="center" alt="NPM" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" style="max-width: 100%;"></a>
  <a target="_blank" rel="noopener noreferrer nofollow" href="https://camo.githubusercontent.com/5fa137d222dde7b69acd22c6572a065ce3656e6ffa1f5e88c1b5c7a935af3cc6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f7673636f64652f7673636f64652d6f726967696e616c2e737667"><img align="center" alt="vscode" height="30" width="40" src="https://camo.githubusercontent.com/5fa137d222dde7b69acd22c6572a065ce3656e6ffa1f5e88c1b5c7a935af3cc6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f7673636f64652f7673636f64652d6f726967696e616c2e737667" data-canonical-src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" style="max-width: 100%;"></a>
</div>       

## 6. Colaboradores

   <td align="center">
      <a href="#">
        <img src="https://github.com/roxanevp/SAP010-md-links/assets/101724531/5eab0ff6-7649-4cad-b726-0d66ad6e8408" width="100px;" alt="Foto da Roxane Príncipe no GitHub"/><br>
        <sub>
          <b>Roxane Príncipe</b>
        </sub>
      </a>
    </td>
     </tr>
  </table>
