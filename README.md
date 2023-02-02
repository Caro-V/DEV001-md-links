# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Acerca de este proyecto](#2-acerca-de-este-proyecto)
* [3. Diagrama de flujo](#3-diagrama-de-flujo)
* [4. Instalación](#4-instalación)
* [5. Comandos](#5-comandos)
* [6. Errores](#5-errores)


***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

## 2. Acerca de este proyecto

_`md-links`_ es una librería desarrollada usando Nodejs que permite leer y analizar archivos en formato `Markdown`, para verificar los links que contengan y reportar algunas estadísticas.

## 3. Diagrama de flujo
Se elaboró un diagrama de flujo para organizar la ruta de desarrollo de este proyecto.

![diagrama](https://i.postimg.cc/RVtSj9V5/Diagrama-de-flujo.png)

## 4. Instalación
Esta librería es instalable vía `npm install https://github.com/Caro-V/DEV001-md-links.git`

## 5. Comandos
El ejecutable de esta aplicación se puede ejecutar de la siguiente manera a través de la terminal: `md-links <path-to-file> [options]`

* Si solo se ingresa `md-links`, recibimos un mensaje de bienvenida y la información detallada acerca de los comandos
```
md-links
```
![welcome](https://i.postimg.cc/kG4VxHxM/Captura-de-pantalla-2023-02-01-a-las-19-35-36.png)

* Si se ingresa `md-links <path-to-file>`, no se valida si las URLs responden ok o no, solo identifica el archivo markdown (a partir de la ruta que recibe como argumento), analiza el archivo Markdown e imprime los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link.

```
md-links prueba/EXTRA.md 
```
![uno](https://i.postimg.cc/x1ND7P0s/Captura-de-pantalla-2023-02-01-a-las-19-36-09.png)

* Si se ingresa `md-links <path-to-file> --validate`, el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.
```
md-links prueba/EXTRA.md --validate
```
![dos](https://i.postimg.cc/v8Xs6Bqv/Captura-de-pantalla-2023-02-01-a-las-19-36-38.png)
* Si se ingresa `md-links <path-to-file> --stats`, el output (salida) será un texto con estadísticas básicas sobre los links.
```
md-links prueba/EXTRA.md --stats
```
![tres](https://i.postimg.cc/k5r3dtG7/Captura-de-pantalla-2023-02-01-a-las-19-37-09.png)
* Si se ingresa `md-links <path-to-file> --stats --validate` o `md-links <path-to-file> --validate --stats` , obtendremos estadísticas que necesiten de los resultados de la validación.
```
md-links prueba/EXTRA.md --validate --stats
```
![cuatro](https://i.postimg.cc/8P5VdSxg/Captura-de-pantalla-2023-02-01-a-las-19-37-33.png)

## 6. Errores 

* Al ingresar un path que no existe
![err1](https://i.postimg.cc/8P0gtYVJ/Captura-de-pantalla-2023-02-01-a-las-19-42-25.png)

* Al ingresar un path que no es un archivo
![err2](https://i.postimg.cc/90XHn5MT/Captura-de-pantalla-2023-02-02-a-las-01-08-45.png)

* Al ingresar un path que no es un archivo con extensión .md
![err3](https://i.postimg.cc/Xq26MHGP/Captura-de-pantalla-2023-02-01-a-las-19-42-35.png)

* Cuando se identifica que el archivo .md ingresado no contiene links
![err4](https://i.postimg.cc/HxT8Lnny/Captura-de-pantalla-2023-02-02-a-las-01-11-06.png)




