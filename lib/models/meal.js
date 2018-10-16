const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

class Meal {

  static all() {
    return database('meals')
      .returning("*")
  }

}

module.exports = Meal