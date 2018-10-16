const express = require('express')
const router = express.Router()
const mealsController = require('../../../controllers/meals_controller')


router.get('/', mealsController.index)
router.get('/:id', mealsController.show)
router.post('/', mealsController.create)
router.delete('/:id', mealsController.delete)
router.patch('/:id', mealsController.update)

module.exports = router

