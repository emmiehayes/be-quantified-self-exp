const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

class Meal {

  static all() {
    return database('meals')
      .returning("*")
  }

  static find(id) {
    return database('meals')
      .where('id', id)
      .select("*")
  }

  static create(meal) {
    return database('meals')
      .insert(meal, 'id')
  }

  static delete(id) {
    return database('meals')
      .where('id', id)
      .del()
  }

  static update(id, mealData) {
    console.log(mealData)
    return database('meals')
      .where('id', id)
      .update(mealData)
  }

}

module.exports = Meal