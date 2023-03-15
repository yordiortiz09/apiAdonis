/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Event from '@ioc:Adonis/Core/Event';


Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/api/chefs/stream', async ({ response }) => {
    const stream = response.response;
    stream.writeHead(200, {
      "Access-Control-Allow-Origin":"*",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });
    Event.on("new::chef", (chef) => {
      stream.write(`event: newChef\ndata: ${JSON.stringify(chef)}\n\n`);
      console.log('Se recibió un nuevo chef:', chef);
    });
  })
  Route.post('/registrar', 'UsersController.registrar')
  Route.post('/login', 'UsersController.login')
  Route.delete('/logout', 'UsersController.logout').middleware('auth')

  Route.get('/user/:id', 'UsersController.info').middleware('auth')
  Route.get('/users', 'UsersController.getUsers').middleware('auth')

  Route.get('/role', 'UsersController.getRole').middleware('auth')
  Route.get('/status', 'UsersController.getStatus').middleware('auth')

  Route.put('/update/rol/:id', 'UsersController.updateRole').middleware('auth')
  Route.put('/update/status/:id', 'UsersController.updateStatus').middleware('auth')

  Route.delete('/user/delete/:id', 'UsersController.delete').middleware('auth')
  Route.put('/user/update/:id', 'UsersController.updateUser').middleware('auth')

  Route.get('/validarnumero/:url', 'UsersController.numerodeverificacionmovil').as('validarnumero');
  Route.post('/validaCode','UsersController.registrarsms')
 
  Route.get('/verifyToken', ({ response }) => {
    return response.json({ message: 'Token válido' })
  }).middleware(['auth', 'status'])
});

Route.group(() => {
////////Chef////////
Route.group(() => {
  Route.post('/create', 'ChefsController.create').middleware('roles:1,2')
  Route.get('/info', 'ChefsController.getChefs').middleware('roles:1,2,3')
  Route.get('/info/:id', 'ChefsController.chefInfo').middleware('roles:1,2')
  Route.put('/update/:id', 'ChefsController.update').middleware('roles:1,2')
  Route.delete('/delete/:id', 'ChefsController.delete').middleware('roles:1,2')
}).prefix('/chef').middleware('auth')


////////Platillo////////
Route.group(() => {
  Route.post('/create', 'TipoPlatosController.create').middleware('roles:1,2')
  Route.get('/info', 'TipoPlatosController.getTipoPlatos').middleware('roles:1,2,3')
  Route.get('/info/:id', 'TipoPlatosController.tipoPlatoInfo').middleware('roles:1,2')
  Route.put('/update/:id', 'TipoPlatosController.update').middleware('roles:1,2')
  Route.delete('/delete/:id', 'TipoPlatosController.delete').middleware('roles:1,2')
}
).prefix('/plato').middleware('auth')

/////////Ingredientes////////
Route.group(() => {
  Route.post('/create', 'IngredientesController.create').middleware('roles:1,2')
  Route.get('/info', 'IngredientesController.getIngredientes').middleware('roles:1,2,3')
  Route.get('/info/:id', 'IngredientesController.getIngrediente').middleware('roles:1,2')
  Route.put('/update/:id', 'IngredientesController.update').middleware('roles:1,2')
  Route.delete('/delete/:id', 'IngredientesController.delete').middleware('roles:1,2')
}
).prefix('/ingrediente').middleware('auth')

/////////Receteas////////
Route.group(() => {
  Route.post('/create', 'RecetasController.create').middleware('roles:1,2')
  Route.get('/info', 'RecetasController.getRecetas').middleware('roles:1,2,3')
  Route.get('/info/:id', 'RecetasController.getReceta').middleware('roles:1,2')
  Route.put('/update/:id', 'RecetasController.update').middleware('roles:1,2')
  Route.delete('/delete/:id', 'RecetasController.delete').middleware('roles:1,2')
}
).prefix('/receta').middleware('auth')

/////////Conductor//////////
Route.group(() => {
  Route.post('/create', 'ConductorsController.create').middleware('roles:1,2')
  Route.get('/info', 'ConductorsController.getConductores').middleware('roles:1,2,3')
  Route.get('/info/:id', 'ConductorsController.getConductor').middleware('roles:1,2')
  Route.put('/update/:id', 'ConductorsController.update').middleware('roles:1,2')
  Route.delete('/delete/:id', 'ConductorsController.delete').middleware('roles:1,2')
} 
).prefix('/conductor').middleware('auth')

///////Avion////////
Route.group(() => {
  Route.post('/create', 'AvionesController.create').middleware('roles:1,2')
  Route.get('/info', 'AvionesController.getAvions').middleware('roles:1,2,3')
  Route.get('/info/:id', 'AvionesController.getAvion').middleware('roles:1,2')
  Route.put('/update/:id', 'AvionesController.update').middleware('roles:1,2')
  Route.delete('/delete/:id', 'AvionesController.delete').middleware('roles:1,2')
}
).prefix('/avion').middleware('auth')

///////Seguros////////
Route.group(() => {
  Route.post('/create', 'SegurosController.create').middleware('roles:1,2')
  Route.get('/info', 'SegurosController.getSeguros').middleware('roles:1,2,3')
  Route.get('/info/:id', 'SegurosController.getSeguro').middleware('roles:1,2')
  Route.put('/update/:id', 'SegurosController.update').middleware('roles:1,2')
  Route.delete('/delete/:id', 'SegurosController.delete').middleware('roles:1,2')
}
).prefix('/seguro').middleware('auth')

///////Hospitals/////////
Route.group(() => {
  Route.post('/create', 'HospitalsController.create').middleware('roles:1,2')
  Route.get('/info', 'HospitalsController.getHospitals').middleware('roles:1,2,3')
  Route.get('/info/:id', 'HospitalsController.getHospital').middleware('roles:1,2')
  Route.put('/update/:id', 'HospitalsController.update').middleware('roles:1,2')
  Route.delete('/delete/:id', 'HospitalsController.delete').middleware('roles:1,2')
}
).prefix('/hospital').middleware('auth')
}).middleware('status')

