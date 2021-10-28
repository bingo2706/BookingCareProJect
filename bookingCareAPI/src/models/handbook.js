'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Handbook extends Model {

        static associate(models) {
            // define association here
        }
    };
    Handbook.init({
        shortdescription: DataTypes.TEXT('long'),
        descriptionHTML: DataTypes.TEXT('long'),
        descriptionMarkdown: DataTypes.TEXT('long'),
        image: DataTypes.BLOB('long'),
        title: DataTypes.STRING,
        categoryId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Handbook',
    });
    return Handbook;
};