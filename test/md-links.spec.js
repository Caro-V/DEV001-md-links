/* eslint-disable no-undef */
/* eslint-disable max-len */
// Mocking Axios
// jest.mock('axios');
require('axios');

const {
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
} = require('../index');

// *** VERIFIES IF THE PATH EXISTS ***
describe('doesPathExist', () => {
  it('should be a function', () => {
    expect(typeof doesPathExist).toBe('function');
  });
  it('should return "true" if the path exists', () => {
    const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(doesPathExist(path)).toBeTruthy();
  });
  it('should return "false" if the path DOES NOT exist', () => {
    const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTR.md';
    expect(doesPathExist(path)).toBeFalsy();
  });
});

// *** VERIFIES IF THE PATH IS ABSOLUTE ***
describe('isPathAbsolute', () => {
  it('should be a function', () => {
    expect(typeof isPathAbsolute).toBe('function');
  });
  it('should return "true" if the path is absolute', () => {
    const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(isPathAbsolute(path)).toBeTruthy();
  });
  it('should return "false" if the path IS NOT absolute (relative)', () => {
    const path = 'prueba/EXTRA.md';
    expect(isPathAbsolute(path)).toBeFalsy();
  });
});

// *** TURNS A RELATIVE PATH INTO ABSOLUTE ***
describe('turnIntoAbsolute', () => {
  it('should be a function', () => {
    expect(typeof turnIntoAbsolute).toBe('function');
  });
  it('should return an absolute path', () => {
    const path = 'prueba/EXTRA.md';
    const pathAbsolute = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(turnIntoAbsolute(path)).toBe(pathAbsolute);
  });
  it('should return the same path if it is already absolute', () => {
    const pathAbsolute = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(turnIntoAbsolute(pathAbsolute)).toBe('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md');
  });
});

// *** VERIFIES IF THE PATH IS A FILE OR NOT ***
describe('isItFile', () => {
  it('should be a function', () => {
    expect(typeof isItFile).toBe('function');
  });
  it('should return "true" if it is a file', () => {
    const pathAbsolute = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(isItFile(pathAbsolute)).toBeTruthy();
  });
  it('should return "false" if it IS NOT a file', () => {
    const notFile = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba';
    expect(isItFile(notFile)).toBeFalsy();
  });
});

// *** VERIFIES IF THE FILE IS .md OR NOT ***
describe('isItMarkdown', () => {
  it('should be a function', () => {
    expect(typeof isItMarkdown).toBe('function');
  });
  it('should return "true" if the file is .md', () => {
    const pathAbsolute = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
    expect(isItMarkdown(pathAbsolute)).toBeTruthy();
  });
  it('should return "false" if it IS NOT an .md file', () => {
    const txt = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/prueba.txt';
    expect(isItMarkdown(txt)).toBeFalsy();
  });
});

// *** READS WHAT IS INSIDE AN .md FILE ***
describe('readFile', () => {
  it('should be a function', () => {
    expect(typeof readFile).toBe('function');
  });
  it('should read what is inside the file "texto.md" ', () => {
    const pathWithText = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/texto.md';
    expect(readFile(pathWithText)).toEqual('Hola soy un archivo .md con texto.');
  });
});

const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';

const links = [
  {
    href: 'https://www.theodysseyonline.com/road-trips-worthwhil',
    text: 'Fuente',
    file: path,
  },
  {
    href: 'https://es.wikipedia.org/wiki/Refactorizaci%C3%B3',
    text: 'Refactoriza',
    file: path,
  },
  {
    href: 'https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5d',
    text: 'Travel pic',
    file: path,
  },
  {
    href: 'https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5d',
    text: 'Travel pic',
    file: path,
  },
];

const arrResponse = [
  {
    href: 'https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5d',
    text: 'Travel pic',
    file: 'prueba/EXTRA.md',
    status: 200,
    message: 'ok',
  },
];
const arrayLinks = [{
  href: 'https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5d',
  text: 'Travel pic',
  file: 'prueba/EXTRA.md',
}];

const arrResponseFail = [
  {
    href: 'https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5',
    text: 'Travel pic',
    file: 'prueba/EXTRA.md',
    status: 403,
    message: 'fail',
  },
];
const arrayLinksFail = [{
  href: 'https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5',
  text: 'Travel pic',
  file: 'prueba/EXTRA.md',
}];

// *** FINDS THE LINKS INSIDE AN .md FILE ***
describe('findLinks', () => {
  it('should be a function', () => {
    expect(typeof findLinks).toBe('function');
  });
  it('should find the links', () => {
    const content = `Texto Ejemplo [Fuente](https://www.theodysseyonline.com/road-trips-worthwhil) 
    Texto Ejemplo [Refactoriza](https://es.wikipedia.org/wiki/Refactorizaci%C3%B3) 
    Texto Ejemplo [Travel pic](https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5d)
    Texto Ejemplo [Travel pic](https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5d)`;
    expect(findLinks(content, path)).toStrictEqual(links);
  });
});

// *** CANTIDAD DE LINKS ***
describe('totalStats', () => {
  it('should be a function', () => {
    expect(typeof totalStats).toBe('function');
  });
  it('should count the total of links', () => {
    expect(totalStats(links)).toBe(4);
  });
});

// *** LINKS ÚNICOS ***
describe('uniqueStats', () => {
  it('should be a function', () => {
    expect(typeof uniqueStats).toBe('function');
  });
  it('should count the unique links', () => {
    expect(uniqueStats(links)).toBe(3);
  });
});

// *** LINKS ROTOS ***
describe('brokenStats', () => {
  it('should be a function', () => {
    expect(typeof brokenStats).toBe('function');
  });
  it('should count the broken links', () => {
    expect(brokenStats(arrResponseFail)).toBe(1);
  });
});

// *** VALIDA LOS LINKS ***
describe('linkValidation', () => {
  it('should be a function', () => {
    expect(typeof linkValidation).toBe('function');
  });
  it('should return status: 200 and message "ok" ', () => {
    linkValidation(arrayLinks).then(((response) => {
      expect(response).toEqual(arrResponse);
    }));
  });
  it('should return status: 404 and message "fail" ', () => {
    linkValidation(arrayLinksFail).then(((response) => {
      expect(response).toEqual(arrResponseFail);
    }));
  });
});

// *** MDLINKS ***
const arrayResult = [
  {
    href: 'https://assets-auto.rbl.ms/5fefc7fee587f0e4aca6794810f346d3c555463eed4e21eaa015d6fc9e6bcb5d',
    text: 'Travel pic',
    file: 'prueba/EXTRA.md',
  },
  {
    href: 'https://www.theodysseyonline.com/road-trips-worthwhile',
    text: 'Fuente',
    file: 'prueba/EXTRA.md',
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/API/Fetch_API',
    text: 'fetch',
    file: 'prueba/EXTRA.md',
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/API/Fetch_API',
    text: 'fetch',
    file: 'prueba/EXTRA.md',
  },
  {
    href: 'https://www.chartjs.org/',
    text: 'Chart.js',
    file: 'prueba/EXTRA.md',
  },
  {
    href: 'https://developers.google.com/chrt/',
    text: 'Google Charts',
    file: 'prueba/EXTRA.md',
  },
  {
    href: 'https://es.wikipedia.org/wiki/Refactorizaci%C3%B3',
    text: 'Refactoriza',
    file: 'prueba/EXTRA.md',
  },
];

describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('should return an error if the path does not exist', () => {
    mdLinks('prueba/EXTRA.md').catch((error) => {
      expect(error.message).toBe('The path DOES NOT exist');
    });
  });
  it('should return an array of objects if the path exists', () => {
    mdLinks('prueba/EXTRA.md').then((arrLinks) => {
      expect(arrLinks).toStrictEqual(arrayResult);
    });
  });
  it('should return an error if the path is not a file', () => {
    mdLinks('prueba/prueba.txt').catch((error) => {
      expect(error.message).toBe('It IS NOT an .md file'.bgRed);
    });
  });
});
