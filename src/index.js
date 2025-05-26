const express = require("express");
const apiRoutes = require("./routes");
const { ServerConfig, Logger } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
    // Logger.info(`Successfully started on port ${ServerConfig.PORT}`, `root`, {});
    
    //* Sequelize associatioins example
//   const { City, Airport } = require("./models");
//   const bengaluru = await City.findByPk(1, {
//     include: {
//       model: Airport,
//     },
//   });
  //   console.log(bengaluru);

  //   const airport = await Airport.create({
  //     name: "Kempegowda International Airport",
  //     code: "BLR",
  //     cityId: 1,
  //   });
  //   console.log(airport);
//   const airports = await bengaluru.getAirports();
//     console.log(airports);
//     await City.destroy({
//       where: {
//         id: 1,
//       },
//     });
});
