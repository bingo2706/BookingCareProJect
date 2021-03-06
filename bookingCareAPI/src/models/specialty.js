'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {

        static associate(models) {
            Specialty.hasMany(models.Doctor_Infor, { foreignKey: 'specialtyId', as: 'specialtyData' })
        }
    };
    Specialty.init({
        descriptionHTML: DataTypes.TEXT('long'),
        descriptionMarkdown: DataTypes.TEXT('long'),
        name: DataTypes.STRING,
        image: DataTypes.BLOB('long'),
    }, {
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
};