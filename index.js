var {FPouchdb} = require("./feathersjs-service");
var {fapp} = require("./feathersjs-app")

try {
    window.PouchF = FPouchdb
    window.fapp = fapp
} catch (error) {
    module.exports = {
        PouchF:FPouchdb,
        fapp
    }
}

//export default 