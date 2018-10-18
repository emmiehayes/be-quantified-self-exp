const express = require('express')
const router = express.Router()
const mealsController = require('../../../controllers/meals_controller')
const mealFoodsController = require('../../../controllers/meal_foods_controller')

router.get('/', mealsController.index)
router.get('/:id', mealsController.show)
// don't like having these in the same routes file but for now, it works
router.post('/:meal_id/foods/:id', mealFoodsController.create)
router.delete('/:meal_id/foods/:id', mealFoodsController.delete)

module.exports = router

