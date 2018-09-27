
import  PouchDB  from "pouchdb";
import pfind from "pouchdb-find"
PouchDB.plugin(pfind);


export default class FPouchdb{
    constructor(database_name="MdbDataBase", fields=[]){
        this.db = new PouchDB(database_name)
        this.collections = null
        this.res = null
        this.cretaIndex(fields)
    }

    async find(params){
       
        this.res = []
        try {
            const sval = params.query
            this.res =  await this.db.find({selector:sval})
            console.log(this.res);
            return this.res    
        } catch (error) {
            console.log(error);
            
        }
        
    }

    cretaIndex(fields){
        this.db.createIndex({
            index:{
                fields:fields
            }
        })
    }

    async get(id, params){
        this.res = await this.db.get(id)
        return this.res
    }

    async create(data, params){
        try {
            await this.db.post(data)
            return true    
        } catch (error) {
            return false
        }
        
    }

    async update(id, data, params){
        try {
            await this.db.put(data)
            return true
        } catch (error) {
            return false
        }
    }

    async patch(id, data, params){
        try {
            await this.db.put(data)
            return true
        } catch (error) {
            return false
        }
    }

    async remove(id, params){
        try {
            const ele = await this.get(id)
            await this.db.remove(ele._id, ele._rev)
            return true
        } catch (error) {
            return false
        }
    }
}

//const pers = new DORM()

//export default pers 