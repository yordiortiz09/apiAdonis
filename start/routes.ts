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
import UsersController from 'App/Controllers/Http/UsersController'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/users', 'UsersController.index')
  Route.post('/login', 'UsersController.login')
  
  Route.post('/users', 'UsersController.crearusuario')
  Route.get('/users/:id', 'UsersController.mostrarusuario')
  Route.put('/users/:id', 'UsersController.actualizarusuario')
  Route.delete('/users/:id', 'UsersController.eliminarusuario')
}).prefix('api')
