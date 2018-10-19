exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('meal_food').insert({
      meal_id: 1, food_id: 1
    }, 'id'),
    knex('meal_food').insert({
      meal_id: 1, food_id: 2
    }, 'id'),
    knex('meal_food').insert({
      meal_id: 1, food_id: 3 
    }, 'id'),
     knex('meal_food').insert({
      meal_id: 1, food_id: 4
    }, 'id'),
    knex('meal_food').insert({
      meal_id: 2, food_id: 5
    }, 'id'),
    knex('meal_food').insert({
      meal_id: 2, food_id: 2
    }, 'id'),
     knex('meal_food').insert({
      meal_id: 3, food_id: 3
    }, 'id'),
    knex('meal_food').insert({
      meal_id: 3, food_id: 4 
    }, 'id'),
    knex('meal_food').insert({
      meal_id: 4, food_id: 5 
    }, 'id')
      .then(() => console.log('Seeding meal_food complete'))
      .catch(error => console.log(`Error seeding meal_food data: ${error}`))
  ])
}