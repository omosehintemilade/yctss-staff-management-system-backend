"use strict";
const { Model } = require("sequelize");
const { userStatus } = require("../utils/constants");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  user.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      staffId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      },
      surname: {
        type: DataTypes.STRING
      },
      pob: {
        type: DataTypes.STRING
      },
      lga: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      genotype: {
        type: DataTypes.STRING
      },
      firstname: {
        type: DataTypes.STRING
      },
      dob: {
        type: DataTypes.STRING
      },
      bloodgroup: {
        type: DataTypes.STRING
      },
      profile_pics: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: userStatus.pending,
        allowNull: false
      },
      subject: {
        type: DataTypes.STRING
      },
      nationality: {
        type: DataTypes.STRING
      },
      department: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User"
    }
  );
  return user;
};
