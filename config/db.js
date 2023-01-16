const { Sequelize } = require("sequelize");

const createDB = new Sequelize("fileUpload-db", "nikhilpn", "pass-7", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

const connectDB = () => {
  createDB
    .sync()
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((e) => {
      console.log("Db connection failed hard");
    });
};
module.exports = { createDB, connectDB };