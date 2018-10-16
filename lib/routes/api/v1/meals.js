const express = require('express')
const router = express.Router()
const mealsController = require('../../../controllers/meals_controller')


router.get('/', mealsController.index)
router.get('/:id/foods', mealsController.show)
router.post('/:id/foods/:id', mealsController.create)
router.delete('/:id/foods/:id', mealsController.delete)

module.exports = router

