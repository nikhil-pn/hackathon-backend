const { DataTypes } = require("sequelize");

const { createDB } = require("../config/db");

const Playlist = createDB.define("playlist", {
  id: {
    primaryKey: true,
    alloweNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
});

module.exports = Playlist;
