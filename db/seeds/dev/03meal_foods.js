exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('meal_foods').insert({
      meal_id: 1, food_id: 1
    }, 'id'),
    knex('meal_foods').insert({
      meal_id: 1, food_id: 2
    }, 'id'),
    knex('meal_foods').insert({
      meal_id: 1, food_id: 3 
    }, 'id'),
     knex('meal_foods').insert({
      meal_id: 1, food_id: 4
    }, 'id'),
    knex('meal_foods').insert({
      meal_id: 2, food_id: 5
    }, 'id'),
    knex('meal_foods').insert({
      meal_id: 2, food_id: 2
    }, 'id'),
     knex('meal_foods').insert({
      meal_id: 3, food_id: 3
    }, 'id'),
    knex('meal_foods').insert({
      meal_id: 3, food_id: 4 
    }, 'id'),
    knex('meal_foods').insert({
      meal_id: 4, food_id: 5 
    }, 'id')
      .then(() => console.log('Seeding meal_foods complete'))
      .catch(error => console.log(`Error seeding meal_foods data: ${error}`))
  ])
}