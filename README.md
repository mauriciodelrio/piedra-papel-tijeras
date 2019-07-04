# Desafío Piedra papel tijeras 

## Consideraciones

1) La aplicación se puede ver monolítica pero tiene una arquitectura por detrás, lo que hace principalmente es minificar el código de react, para ello, genera builds. En este sentido para validar que funcione se deben correr 2 procesos, una para backend en la carpeta raiz usando el comando:

```
bash start.sh
```

De esa forma se inicia mongo y se levanta el servidor.

Previo a correr el comando de start es necesario ejecutar el comando 

```
npm install
```

De esa forma se instalarán las dependencias necesarias.

De otra terminal se posiciona en la carpeta **client** y se ejecuta el comando **npm install** y luego **npm start** para levantar la aplicación en react.

Es importante señalar es es probable generar previamente un build de la app desde la raiz ejecutando el comando 

```
npm run build
```


Consideraciones:

-> Se construye el core de la aplicación y se le da enfasis al trabajo sin ciclo de vida (redux), de esa forma no se abusa del store.

-> Se trabaja con semantic UI

-> Se guardan los estados de los usuarios y los juegos, si un usuario entra con un nickname usado con anterioridad, este deja un registro de sus partidas ganadas de forma histórica validando nickname (solamente para mantener registros, si el sistema autenticara, sería mucho mejor logrado).

-> Al terminar una racha de 3 juegos se guarda dicha racha, pensando en generar futuras stats respecto a las tendencias de marcado de los jugadores.

-> Todo se trabaja en una misma vista, de esta forma solo el sistema renderiza los componenetes que deba mostrar.

-> Se trata de mantener un estilo fiel a los wireframes.


Pendientes:

-> Pruebas unitarias Backend.
-> Feature opcional (se compensa con la posibilidad de ampliar la solución guardando los juegos completos).


