const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

class Meal {

  static all() {
    return database('meals')
    // knex map over array of meals and appendFoods to each meal
    .map(this.appendFoods)
  }

  static find(id) {
    return database('meals')
    .where('id', id)
    // this is not the best solve obviously but it works for now
    .map(this.appendFoods)
  }
  
  static appendFoods(meal) {
    // get all foods
    return database('foods')
    // mealfood_id comes in as :id along with the :food_id and :meal_id on join, hence line 17
    .select('food_id as id', 'name', 'calories')
    .from('foods')
    .join('meal_food', 'foods.id', 'meal_food.food_id')
    .where('meal_food.meal_id', meal.id)
    // resolve meal- at this point I am returning grouped foods with no meal information headings
    .then(foodsPerMeal => {
       meal.foods = foodsPerMeal
       return meal
    })
  }
}

module.exports = Meal
