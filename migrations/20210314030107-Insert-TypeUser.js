module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('typeUser', [
      {
        idTypeUser: 1,
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idTypeUser: 2,
        name: 'Usuarios',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: queryInterface => queryInterface.bulkDelete('typeUser', null, {}),
};
