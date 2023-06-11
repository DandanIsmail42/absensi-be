const {Model, DataTypes} = require('sequelize')
const sequelize = require('../db.config')
class Absensi extends Model {}

Absensi.init({
    users_nip: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.ENUM('in', 'out')
    },
    password: {
        type: DataTypes.STRING
    }
}, {
sequelize, 
modelName: 'Absensi'
})

module.exports = Absensi