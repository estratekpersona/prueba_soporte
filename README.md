# Prueba Técnica para Posición de Soporte y Mantenimiento EPC #

El código fuente en este [repositorio](https://github.com/estratekpersona/prueba_soporte) contiene el método de cálculo de asistencia que utiliza el sistema de planilla para calcular el pago de los colaboradores.

### Instrucciones de la prueba ###

* Simula la recepción de un mensaje de un cliente que reporta esta incidencia. Registra la respuesta que le brindarías al cliente al recibir dicho mensaje.
* Tu tarea es realizar los ajustes necesarios en el código para solucionar el inconveniente.
* Realiza un commit del código ajustado en el repositorio proporcionado para su revisión y publicación.
* Una vez aprobados los ajustes, debes informar al cliente que el problema ha sido resuelto, registra tu respuesta.

### Mensaje recibido del cliente ###

**Asunto:** Incidencia en el cálculo de asistencia para planilla de pago

**Mensaje:**
Hola equipo de soporte,

Espero que estén bien. Quiero reportar un inconveniente que detectamos en el cálculo de asistencia para la planilla de este mes. Nos dimos cuenta de que el sistema no está registrando correctamente las ausencias de medio día. Por ejemplo, un colaborador con una ausencia de medio día aparece con 29 días trabajados en un mes de 30 días, cuando debería aparecer con 29.5.

Este detalle está afectando la precisión de nuestras planillas, por lo que agradeceríamos su ayuda para resolverlo lo antes posible.

Por favor, avísennos cuando hayan identificado el problema o necesiten más información de nuestra parte.

Gracias por su apoyo.

Saludos,
Sophia Petronila
Tezla Motores

### Dependencias ###

Versión de Nodejs: 16.15 o superior

### Indicaciones del repositorio ###

Instalación de dependencias

```

npm install

```

En el archivo /tests/asistencia.test.js se encuentran las pruebas unitarias de los distintos métodos del archivo index.js. 

4 de las pruebas contienen el caso de uso con ausencias de medio día, las cuales fallan en su validación.

Con el siguiente comando se ejecutan las pruebas unitarias:

```

npm run test

```

Se considera que el inconveniente ha sido solventado al tener exitosa la ejecución de todos las 69 casos de uso.


### Evaluación: ###
* Correcta identificación y solución del problema en el código.
* Comunicación con el cliente.
* Correcto uso del repositorio.