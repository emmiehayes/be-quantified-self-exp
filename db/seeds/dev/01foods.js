
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meal_foods').del()
    .then(() => {
      return knex('meals').del()
    })
    .then(() => {
      return knex('foods').del()
    })

    .then(() => {
      return Promise.all([
        knex('foods').insert({
          id: 1, name: 'Apple', calories: 10
        }),
        knex('foods').insert({
          id: 2, name: 'Banana', calories: 20
        }),
        knex('foods').insert({
          id: 3, name: 'Orange', calories: 30
        }),
         knex('foods').insert({
          id: 4, name: 'Peach', calories: 40
        }),
         knex('foods').insert({
          id: 5, name: 'Plum', calories: 50
        }),
         knex('foods').insert({
          id: 6, name: 'Pear', calories: 60
        }),
         knex('foods').insert({
          id: 7, name: 'Strawberries', calories: 70
        })
        .then(() => console.log('Seeding Foods complete'))
        .catch(error => console.log(`Error seeding foods data: ${error}`))
      ])
    })
}