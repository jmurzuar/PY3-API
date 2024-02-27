![banner](https://github.com/jmurzuar/PY3-API/blob/main/img/banner.png)

# PROYECTO 3: Tablero de Datos ("Dashboard")

## **ÍNDICE**

* [1. Intro](#1-intro)
* [2. Estructura de la página](#2-Estructura)
* [3. Pantallas](#3-Pantallas)
* [4. Tecnologías Utilizadas](#4-Tecnologías-Utilizadas)
* [5. Principales Características](#5-Principales-Características)
* [6. Legal](#6-Legal)
* [7. Despliegue](#7-Despliegue)
  
****

## 1. Intro

En este proyecto se construyó un dashboard que consume 3 API's públicas, sus principales características son:

- Se usa un ambiente de desarrollo con Node.js
- Se utiliza Chart.js para el desarrollo de gráficas
- Realizar una conexión a 3 API's externas para extraer datos, una de ella contiene una API KEY.
- Se trabaja con procesos síncronos y asíncronos en JavaScript

[volver al índice](#ÍNDICE)
****

## 2. Estructura

### Estructura general de la página
![Esquema1](https://github.com/jmurzuar/PY3-API/blob/main/img/modelo_basico.png)

Esta aplicación contiene 5 bloques, en 3 de ellos se utiliza JavaScript:

- HEADER, Sección con el nombre del Dashboard y reloj y fecha
- INDICADORES ECONÓMICOS CHILE, valores de principales indicadores chilenos del día, con gráfico de los últimos 12 valores históricos
- INDICADORES MONEDAS ELECTRÓNICAS, valores de las dos principales monedas electrónicas, con el último valore reportado y gráfico de los últimos 30 días, además se incluye un gráfico con actualiación cada 10 segundos, con los últimos 10 registros de bitcoin
- CLIMA CHILE, se muestran tarjetas con el valore actual del clima de 6 cuidades de Chile, incluye información de cuidad, temperatura, descripción del clima, velocidad del viento e ícono animado de la descripción del clima 
- FOOTER, información adicional de la página

[volver al índice](#ÍNDICE)
****

## 3. Pantallas

### Pantalla completa
![Pantalla](https://github.com/jmurzuar/PY3-API/blob/main/img/pantalla1.png)

### Pantalla responsive
![Responsive](https://github.com/jmurzuar/PY3-API/blob/main/img/pantalla2.png)


[volver al índice](#ÍNDICE)
****

## 4. Tecnologías Utilizadas

![LogosPY2](https://github.com/jmurzuar/PY3-API/blob/main/img/tecno1.png)

El objetivo principal de este proyecto fue desarrollar una aplicación que consuma una API, utilizando interfaz HTML, CSS y JavaScript

Aplicando:

- Prototipado simple que muestra un DASHBOARD con información externa y dinámica
- Etiquetas estándar HTML5.
- CSS, incluyendo técnicas Flexbox y Responsive Web Design.
- Se utiliza Fetch API y JSON para consumir y disponibilizar la información de las API's
- Se realiza control de versiones con GIT y GITHUB
- Se publica solución en netlify


![API](https://github.com/jmurzuar/PY3-API/blob/main/img/api.png)

Durante el desarrollo de este proyecto se han utilizado las siguientes API's 

- **openweathermap.org/api**, API pública con suscripción gratuita para seguimiento del clima en distintas ciudades del mundo
- **api.coincap.io**, API pública sin suscripción con información de las momedas electrónicas
- **mindicador.cl/api**, API pública Chilena sin suscripción que muestra información de los indicadores económicos Chilenos

Para realizar los gráficos, se utilizó la siguiente librería

- Chart.js


[volver al índice](#ÍNDICE)
****

## 5. Principales Características

En el desarollo de este proyecto, se cumple con:

### UI
- [X] Aplicar HTML5.
- [X] Aplicar selectores en CSS.
- [X] Sección de gráficos (Chart.js utiliza canvas).


### JAVASCRIPT
- [X] Uso de fetch para el consumo de datos.
- [X] Modularización con import y export.
- [X] Uso de promesas y async-await.

### CONTROL DE VERSIONES
- [X] Utilizar GIT para en control de versiones.
- [X] Crear un repositorio en GitHub y realizar mínimo 5 "commits" en tu repositorio.
- [X] Crear una URL para compartir (netlify)
- [X] Se crea archivo README con la descripción dentro del repositorio


[volver al índice](#ÍNDICE)
****

## 6. Legal

- Esta página fue creada con fines educativos, NO COMERCIAL, contiene imagenes con derechos de autor que se han utilizado solo para ejemplos
- Página creada en el marco del Bootcamp desarrollo web full stack, corte 11 de la Universidad de Desarrrollo - Chile
- Creado en Febrero 2024
  
[volver al índice](#ÍNDICE)
****

## 7. Despliegue

Link al proyecto publicado en netlify.com (https://py3-api-juan-urzua.netlify.app/)

[volver al índice](#ÍNDICE)
