/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ScrapersController = () => import('#controllers/scrapers_controller')

router.get('/', [ScrapersController, 'index'])
router.post('/scrape', [ScrapersController, 'scrape'])
// router.on('/').renderInertia('home')
