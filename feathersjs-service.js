import PouchDB from "pouchdb";
import  pfind from "pouchdb-find";
PouchDB.plugin(pfind);


class PouchF{
    constructor(database_name="MdbDataBase", fields=[], paginate = {default: 2,max: 4}){
        this.db = new PouchDB(database_name)
        this.collections = null
        this.res = null
        this.pagination={$limit:10, $skip:0}
        this.limit = paginate.default
        this.cretaIndex(fields)
    }

    async count(params={query:{}}){
        const res = await this.db.find({selector:params.query})
        return res.docs.length
    }

    async find(params){
        /**
         * define in params page and limit
         */

        let limit = 5
        let skip = 0
        try {
            this.res = []
            if (params.pagination && params.pagination.$limit) {
            
                limit = params.pagination.$limit
            } else {
                limit = this.pagination.$limit    
            }
            if (params.pagination && params.pagination.$skip) {
                skip = params.pagination.$skip
            } else {
                skip = this.pagination.$skip    
            }
            
            
            
        } catch (error) {
            console.log(error);
            
        }
        
        
        try {
            this.res =  await this.db.find({selector:params.query,limit,skip})
            //let total = this.res.docs.length
            let total = await this.count()
            try {
                return {data:this.res.docs, limit, skip, total}    
            } catch (error) {
                return {data:[], limit:0, skip:0, total:0}
            }
                
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

export default PouchF 
