var mysql = require('mysql');

var config = {
    connection: mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        schema: "vms_dev"
    })
};
module.exports = config;