
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      // Inserts seed entries
      return knex('foods').insert([
        { id: 1, name: 'Apple', calories: '10' },
        { id: 2, name: 'Banana', calories: '80' },
        { id: 3, name: 'Orange', calories: '30' },
        { id: 4, name: 'Peach', calories: '40' },
        { id: 5, name: 'Plum', calories: '50' }
      ]);
    });
};