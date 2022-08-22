const { sequelize } = require("./models");

async function instantiateDB() {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log("Database authenticated");
  } catch (error) {
    console.log(error);
  }
}

module.exports = instantiateDB;
