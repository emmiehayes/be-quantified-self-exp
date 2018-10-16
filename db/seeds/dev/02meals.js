exports.seed = function (knex, Promise) {
      return Promise.all([
        knex('meals').insert({
          id: 1, name: 'Breakfast'
        }),
        knex('meals').insert({
          id: 2, name: 'Lunch'
        }),
        knex('meals').insert({
          id: 3, name: 'Dinner'
        }),
        knex('meals').insert({
          id: 4, name: 'Snack'
        })
        .then(() => console.log('Seeding Meals complete'))
        .catch(error => console.log(`Error seeding meals data: ${error}`))
      ])
    }