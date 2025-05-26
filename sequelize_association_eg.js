//* Sequelize associations example
const { City, Airport } = require("./models");
const bengaluru = await City.findByPk(1, {
  include: {
    model: Airport,
  },
});
console.log(bengaluru);

const airport = await Airport.create({
  name: "Kempegowda International Airport",
  code: "BLR",
  cityId: 1,
});
console.log(airport);
const airports = await bengaluru.getAirports();
console.log(airports);
await City.destroy({
  where: {
    id: 1,
  },
});
