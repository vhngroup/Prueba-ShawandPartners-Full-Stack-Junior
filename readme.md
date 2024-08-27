## Prueba Tecnica Full Stack Junior ShawandPartners ##
En esta prueba tecnica usamos Reac Junto a NodeJs, montamos backend y frontend en entornos separados, pero interactuando entre ellos. 
Leemos un archivos ```.csv``` y lo convertimos a formato json y posteriormente buscamos en sus registros.

![Example](https://github.com/vhngroup/Prueba-ShawandPartners-Full-Stack-Junior/static/blob/main/image.png)

## Alistamiento de entorno ##
* Tener instalado Nodejs
* Manejador de paquetes pnpm
### Como correrlo ### 
* En la carpeta raiz, ejecutar ```pnpm i```
* Para ejecutar, correr ```pnpm --filter "**" dev```
### Fallos ###
* En ocasiones las dependencias no se instalan en cada proyecto, por lo cual recomendamos:
  * En la carpeta raiz, ejecutar ```pnpm i```
  * En la carpeta frontend, ejecutar ```pnpm i```
  * En la carpeta backend, ejecutar ```pnpm i```
* Instalar tipos
  * pnpm install @types/multer -D
  * pnpm install @types/node -D
  * pnpm install @types/express -D
  * pnpm install @vitejs/plugin-vue -D
* Errores en dependencia: Instalar Typos:
  * Eliminar las carpetas node_modules en cada proyectos y ejecutar el comnando pnpm i
# Agradecimientos: #
Este proyecto fu realizado en base al proyecto de [@midudev](https://github.com/midudev) [en su canal de youtube](https://www.youtube.com/watch?v=MmfoLqiu1A0)
