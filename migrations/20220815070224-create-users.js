"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("users");
  }
};
