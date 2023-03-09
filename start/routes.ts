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

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/registrar', 'UsersController.registrar')
  Route.post('/login', 'UsersController.login')
  Route.delete('/logout', 'UsersController.logout').middleware('auth')

  Route.get('/user/:id', 'UsersController.info').middleware('auth')
  Route.get('/users', 'UsersController.getUsers')

  Route.get('/role', 'UsersController.getRole').middleware('auth')
  Route.get('/status', 'UsersController.getStatus').middleware('auth')

  Route.put('/update/rol/:id', 'UsersController.updateRole').middleware('auth')
  Route.put('/update/status/:id', 'UsersController.updateStatus').middleware('auth')

  Route.delete('/user/delete/:id', 'UsersController.delete').middleware('auth')
  Route.put('/user/update/:id', 'UsersController.updateUser').middleware('auth')
})


////////Chef////////
Route.group(() => {
  Route.post('/create', 'ChefsController.create').middleware('auth')
  Route.get('/info', 'ChefsController.getChefs').middleware('roles:1,2,3')
  Route.get('/info/:id', 'ChefsController.chefInfo')
  Route.put('/update/:id', 'ChefsController.update').middleware('auth')
  Route.delete('/delete/:id', 'ChefsController.delete').middleware('auth')
}).prefix('/chef').middleware('auth')

////////Platillo////////
Route.group(() => {
  Route.post('/create', 'TipoPlatosController.create').middleware('auth')
  Route.get('/info', 'TipoPlatosController.getTipoPlatos')
  Route.get('/info/:id', 'TipoPlatosController.tipoPlatoInfo')
  Route.put('/update/:id', 'TipoPlatosController.update').middleware('auth')
  Route.delete('/delete/:id', 'TipoPlatosController.delete').middleware('auth')
}
).prefix('/plato')

/////////Ingredientes////////
Route.group(() => {
  Route.post('/create', 'IngredientesController.create').middleware('auth')
  Route.get('/info', 'IngredientesController.getIngredientes')
  Route.get('/info/:id', 'IngredientesController.getIngrediente')
  Route.put('/update/:id', 'IngredientesController.update').middleware('auth')
  Route.delete('/delete/:id', 'IngredientesController.delete').middleware('auth')
}
).prefix('/ingrediente')

/////////Receteas////////
Route.group(() => {
  Route.post('/create', 'RecetasController.create').middleware('auth')
  Route.get('/info', 'RecetasController.getRecetas')
  Route.get('/info/:id', 'RecetasController.getReceta')
  Route.put('/update/:id', 'RecetasController.update').middleware('auth')
  Route.delete('/delete/:id', 'RecetasController.delete').middleware('auth')
}
).prefix('/receta')

/////////Conductor//////////
Route.group(() => {
  Route.post('/create', 'ConductorsController.create').middleware('auth')
  Route.get('/info', 'ConductorsController.getConductores')
  Route.get('/info/:id', 'ConductorsController.getConductor')
  Route.put('/update/:id', 'ConductorsController.update').middleware('auth')
  Route.delete('/delete/:id', 'ConductorsController.delete').middleware('auth')
} 
).prefix('/conductor')

///////Avion////////
Route.group(() => {
  Route.post('/create', 'AvionesController.create').middleware('auth')
  Route.get('/info', 'AvionesController.getAvions')
  Route.get('/info/:id', 'AvionesController.getAvion')
  Route.put('/update/:id', 'AvionesController.update').middleware('auth')
  Route.delete('/delete/:id', 'AvionesController.delete').middleware('auth')
}
).prefix('/avion')

///////Seguros////////
Route.group(() => {
  Route.post('/create', 'SegurosController.create').middleware('auth')
  Route.get('/info', 'SegurosController.getSeguros')
  Route.get('/info/:id', 'SegurosController.getSeguro')
  Route.put('/update/:id', 'SegurosController.update').middleware('auth')
  Route.delete('/delete/:id', 'SegurosController.delete').middleware('auth')
}
).prefix('/seguro')

///////Hospitals/////////
Route.group(() => {
  Route.post('/create', 'HospitalsController.create').middleware('auth')
  Route.get('/info', 'HospitalsController.getHospitals')
  Route.get('/info/:id', 'HospitalsController.getHospital')
  Route.put('/update/:id', 'HospitalsController.update').middleware('auth')
  Route.delete('/delete/:id', 'HospitalsController.delete').middleware('auth')
}
).prefix('/hospital')