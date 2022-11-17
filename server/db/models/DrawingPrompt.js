const Sequelize = require("sequelize");
const db = require("../db");

const DrawingPrompts = db.define("drawingprompts" , {
    word:{
        type: Sequelize.STRING,
        allowNull: false,
        validator:{
            notEmpty: true
        }
    }
})

module.exports = DrawingPrompts;