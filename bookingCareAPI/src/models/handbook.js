'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Handbook extends Model {

        static associate(models) {
            Handbook.belongsTo(models.Allcode, { foreignKey: 'categoryId', targetKey: 'keyMap', as: 'categoryData' })
            Handbook.belongsTo(models.User, { foreignKey: 'doctorId', targetKey: 'id', as: 'DoctorHandbookData' })
        }
    };
    Handbook.init({
        shortdescription: DataTypes.TEXT('long'),
        descriptionHTML: DataTypes.TEXT('long'),
        descriptionMarkdown: DataTypes.TEXT('long'),
        image: DataTypes.BLOB('long'),
        title: DataTypes.STRING,
        categoryId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Handbook',
    });
    return Handbook;
};