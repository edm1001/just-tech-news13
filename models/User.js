const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// inits the User table into Model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE (frstnm, lstnm, eml)
        // define id
        id: {
            // DataTypes is by sequelize to show the data type
            type: DataTypes.INTEGER,
            //  equals to NOT NULL in sql
            allowNull: false,
            //  instruct that this is the Primary Key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define username
        username: {
            type:DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //stop any duplicates
            unique: true,
            // run data through validators before creating table data
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // pass length must exceed 7
                len:[7]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE 
        sequelize,
        timestamps: false,
        freezeTableName: true,
        // if used underscores instead of camel casing
        underscored: true,
        modelName: 'user'
      }
);

module.exports = User;