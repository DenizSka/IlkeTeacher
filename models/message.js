const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

// setup Message model and its fields.
module.exports = function(app) {
    const sequelizeClient = app.get('sequelizeClient');
    const Message = sequelize.define('message', {
    name: {
        type: DataTypes.CHAR,
    },
    message: {
        type: DataTypes.TEXT,
    }
    }, {
    hooks: {
      beforeCount: (options) => {
        options.raw = true;
      }
    }
});

message.associate = function(models){};
// create all the defined tables in the specified database.
    return message;

};
