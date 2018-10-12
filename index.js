import FPouchdb from "./feathersjs-service";
import fapp from "./feathersjs-app";

try {
    window.PouchF = FPouchdb
    window.fapp = fapp
    
} catch (error) {
    
}

export default {
    PouchF:FPouchdb,
    fapp
}