const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

class MealFood {

  static create(mealFood) {
    const food = mealFood.food_id
    const meal = mealFood.meal_id
    
    return database('meal_food')
    .insert({ food_id: food, meal_id: meal })
    .returning('*')
  }


  static delete(id) {
    return database('meal_food')
      .where('id', id)
      .del()
  }
}


module.exports = MealFood