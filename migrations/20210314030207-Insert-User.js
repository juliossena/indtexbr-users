module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('user', [
      {
        idUser: 1,
        email: 'admin@admin.com',
        name: 'Admin',
        password: '$2a$08$kYGNNEqi3MKQzlLpO1ul..0rSyKt8VBiFIjDpiS26Xg6sZQ8l5nFG',
        idTypeUser: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: queryInterface => queryInterface.bulkDelete('user', null, {}),
};
