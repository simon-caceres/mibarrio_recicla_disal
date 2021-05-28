# App Mi Barrio Recicla: 

## Proyecto para Disal, Municipalidad de providencia y ab Chile
```
al descargar repositorio correr comando yarn o eliminar archivo yarn.lock y correr npm
```
## Composicion:
	
### Routes: 

		Se utilizan tres tipos de navegaciones, Drawer, Stack y Modal, se explica a detalle.

		DetalleScreen.js: Vista Principal de la pagina de noticias, 
			cuenta con componentes: ItemNoticias y Header

		HomeScreen.js: Pagina del Home, donde se ubica principalmente la logica para acceder a la info.
			Cuenta con componentes Item, Items y Header.

			funcion searchText: logica para el filtro de busqueda en la moda.
			funcion getData: llamada principal a la api, primera llamada es para listar a los departamentos con id y segunda llamada para tomar el acumulado por indicador
			la constante last consulta el ultimo retiro, utilizando la logica puesta en la funcion getLasRetire() que basicamente calcula, la fecha del jueves anterior al dia actual de la semana.

		Modal.js: Muestra el detalle del departamento sobre el cual se hizo click. hace el calculo y con el hook de useEffect se calcula que color mostrar en la modal segun el ranking que venga dentro de los props (pendiente por definir )

		ModalWebView.js: se deriva desde DetalleScreen a esta vista, muestra el detalle de la noticia seleccionada, con una logica de espera mientras carga la url que viene en el parametro, se usa el componente webview de react native para mostrar.

### Components: 
		
		Header: contiene la cabecera de la app, el titulo y la logica para activar el sidebar

		Item: Componente que se aplica en el listado interno al momento de buscar la direccion del domicilio, acepta 4 props: onPress para activar la funcion de busqueda, title, subtitle e id 

		ItemNoticias: Cada uno de los componentes dentro de la seccion de noticias, trae item como props que es un objeto y el cual carga cada una de las secciones del item, es recorrido en la seccion de noticias, a traves del llamado a la api news,

		Items.js : Muestra el detalle por indicador y por departamento, ademas de la seccion de ultimo retiro, es reutilizado en la vista principal y en la vista detalle.


### Pendiente:

		Reducir tiempos de carga: se deberia lograr, al reducir los multiples llamados a la api, idealmente a solo uno y con redux manejar toda la data de forma general (consultar con back end)

		Logica para el ranking: se debe hacer un calculo general que permita entender el ranking, consultar con back end si se hara en el front la logica o como aplicara.

		Seccion de noticias: actualmente se consume una api que publica cada 8 dias, consultar si tendria mas sentido dejar una entrada al a api donde alguien se encargue de subir imagenes y links, para posteriormente mostrar en la app.

		Publicacion y detalles esteticos: por ver.:
	
	
