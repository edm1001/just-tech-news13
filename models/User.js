const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// inits the User table into Model
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        },
    },
        {
        hooks: {
            // set up beforeCreate lifecycle hook functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;                   
             },
            // set up beforeUpdate lifecycle hook functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
            },       

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