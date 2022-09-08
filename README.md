![HaveABeerBackend](https://user-images.githubusercontent.com/66213550/180589683-c7fe56cf-9fc1-4e6f-8d55-7df5e0ce91c6.png)


### Descripción
Have a beer is a collaborative project inspired by "Buy me a Coffee"

### Instrucciones 
- Fork este repositorio
```
cp .env.example
npm install
npm run build
npm run dev
```

### Endpoints
[Lista de endpoints](https://documenter.getpostman.com/view/18310822/UzQypNrp)

### Requisitos

Para completar la variable de entorno MONGO_COMPASS_URL se debe crear cuenta en [MongoDB](https://www.mongodb.com/)

Se puede tomar de referencia el siguiente [tutorial](https://brahianpdev.rocks/introduccin-al-backend-con-arquitectura-en-capas#2a292225596d479bad1d684d80099425ss) para completar los pasos de forma correcta

### A tener en cuenta

- Metodología de trabajo: [Gitflow](https://www.atlassian.com/es/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=Gitflow%20es%20un%20modelo%20alternativo,vez%20y%20quien%20lo%20populariz%C3%B3.)

Según la feature que se esté trabajando, se deberá crear una rama con el nombre de la feature (si no está creada).

Luego, una con tus iniciales + el nombre de dicha feature. 

Esta, se mergeara con la feature principal. Y de la feat, se hará merge a dev.

Una vez esté todo en dev, se abre una PR.

### Lista de Issues
En este apartado, estarán todos los [issues abiertos](https://github.com/brahianpdev/haveabeer/issues) de have a beer. 

#### Se debe respetar el orden de las importaciones:
- External modules
- Librerias

- Internal modules
- Interfaces
- Dtos
- Services | Controllers
- Utils
- Config

#### Así como el orden de las funciones:

- find
- findById
- create
- createMany
- update
- updateMany
- delete
- deleteMany
- Utils

#### Así como el orden de las rutas:

- External modules
- Internal modules
- Config

- get
- post
- put
- patch
- delete

