"use strict";
const { Model } = require("sequelize");
const { documentStatus } = require("../utils/constants");
module.exports = (sequelize, DataTypes) => {
  class document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  document.init(
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false
      },
      fileId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: documentStatus.pending,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "documents",
      modelName: "Document"
    }
  );
  return document;
};
