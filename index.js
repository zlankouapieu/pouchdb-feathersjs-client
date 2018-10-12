import PouchF from "./feathersjs-service";
import fapp from "./feathersjs-app";

try {
    window.PouchF = PouchF
    window.fapp = fapp
    
} catch (error) {
    
}

export default {
    PouchF,
    fapp
}
