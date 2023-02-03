/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
require('colors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// identificar si la ruta existe
const doesPathExist = (inputPath) => fs.existsSync(inputPath);

// identificar si la ruta es absoluta
const isPathAbsolute = (inputPath) => path.isAbsolute(inputPath);
// console.log(isPathAbsolute('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/prueba.md'));

// convertir la ruta relativa a absoluta
const turnIntoAbsolute = (inputPath) => (isPathAbsolute(inputPath) ? inputPath : path.resolve(inputPath));
// console.log(turnIntoAbsolute('prueba/prueba.md'));

// identificar si la ruta absoluta es un directorio
// const isItDirectory = (inputPath) => fs.statSync(inputPath).isDirectory();
// console.log(isItDirectory('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba'));

// identificar si la ruta absoluta es un archivo
const isItFile = (inputPath) => fs.statSync(inputPath).isFile();
// console.log(isItFile('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba'));

// identificar si el archivo es .md
const isItMarkdown = (inputPath) => path.extname(inputPath) === '.md';
// console.log(isItMarkdown('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/prueba.txt'));

// leer el archivo md
const readFile = (inputPath) => fs.readFileSync(inputPath, 'utf8');
// console.log(readFile('prueba/EXTRA.md'));

const findLinks = (content, inputPath) => {
  const regExp = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  let arrayLinks = [...content.matchAll(regExp)]; // spread operator
  // console.log(arrayLinks)
  let arrayObjects = [];
  // console.log(arrayObjects)
  for (let i = 0; i < arrayLinks.length; i++) {
    arrayObjects.push({
      href: arrayLinks[i][2],
      text: arrayLinks[i][1],
      file: inputPath,
    });
  }
  return arrayObjects;
};
// console.log(findLinks(readFile('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md'), '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md'));
// console.log(findLinks(leer, 'README.md'));

const linkValidation = (arr) => {
  let arrayPromises = [];

  for (let i = 0; i < arr.length; i++) {
    const object = arr[i];
    let links = axios.get(object.href)
      .then((res) => ({
        href: res.config.url,
        text: object.text,
        file: object.file,
        status: res.status,
        message: 'ok',
      }))
      .catch((error) => {
        // console.log(error)
        if ('response' in error) {
          return {
            href: object.href,
            text: object.text,
            file: object.file,
            status: error.response.status,
            message: 'fail',
          };
        }
      });
    arrayPromises.push(links);
  }
  return Promise.all(arrayPromises);
};

// TOTAL DE LINKS
const totalStats = (links) => {
  const totalLinks = links.length;
  return totalLinks;
};
// console.log(totalStats(linksEjem)); // 4

// LINKS ÚNICOS
const uniqueStats = (links) => {
  const uniqueLinks = [...new Set(links.map((link) => link.href))];
  return uniqueLinks.length;
};
// console.log(uniqueStats(linksEjem)); // 3

// LINKS ROTOS
const brokenStats = (links) => {
  const brokenLinks = links.filter((link) => link.message === 'fail');
  return brokenLinks.length;
};
// console.log(brokenStats(linksEjem)); // 1

/* ------------------------------- FUNCIÓN MDLINKS -------------------------------*/
const mdLinks = (inputPath, options = { }) => new Promise((resolve, reject) => {
  if (doesPathExist(inputPath)) { // identificar si la ruta existe
    // console.log('The path exists');
    if (!isPathAbsolute(inputPath)) {
      // console.log('The path is RELATIVE');
      const absolutePath = turnIntoAbsolute(inputPath);
      // console.log(`The relative path was turned into absolute ${absolutePath}`);
      if (isItFile(absolutePath)) {
        // console.log('It is a file');
        if (isItMarkdown(inputPath)) { // si es un archivo y es md, extrae los links
          // console.log('It is a markdown file');
          let content = readFile(inputPath);
          if (content !== '') {
            const arrayObjects = findLinks(content, inputPath); // si encuentra archivos md, crear un arreglo de mds
            if (arrayObjects !== '' && options.validate) {
              resolve(linkValidation(arrayObjects));
            } else if (arrayObjects !== '' && options.validate !== true) {
              resolve(arrayObjects);
            }
          } else {
            reject(new Error('There IS NOT links in this file'.bgRed)); // si el arreglo es vacío, rechazamos la promesa diciendo que no hay archivos md
          }
        } else {
          reject(new Error('It IS NOT an .md file'.bgRed));
        }
      } else {
        reject(new Error('It IS NOT a file'.bgRed));
      }
    }
  } else {
    reject(new Error('The path DOES NOT exist'.bgRed)); // si no existe la ruta, se rechaza la promesa
  }
});

module.exports = {
  doesPathExist,
  isPathAbsolute,
  turnIntoAbsolute,
  isItFile,
  isItMarkdown,
  readFile,
  findLinks,
  mdLinks,
  totalStats,
  uniqueStats,
  brokenStats,
  linkValidation,
};
