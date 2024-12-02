const drapiModels = require('drapi/lib/models');

class GenericRepository {
    constructor(model){
        this.modelName = model;
    }

    async init(ctx){
        this.model = await drapiModels.getModel(ctx, this.modelName);
        return this.model;
    }

    async find(query, populate=[]){
        try{
            let result;
            if(Array.isArray(populate) && populate.length>0){             
                result = this.model.find(query).populate(populate).lean();   
            }else{
                result = this.model.find(query).lean();   
            }
            return result;
        }catch(error){
            console.log(`Error Generic(${this.modelName}).find()`, error);
            throw new Error(`Error al obtener resultados de ${this.modelName}`)
        }
    }

    findOne(query, populate=[]){
        try{
            let result;
            if(Array.isArray(populate) && populate.length>0){    
                result = this.model.findOne(query).populate(populate);
            }else{
                result = this.model.findOne(query);
            }
            return result;
        }catch(error){
            console.log(`Error Generic(${this.modelName}).findOne()`, error);
            throw new Error(`Error al obtener resultado de ${this.modelName}`)
        }

    }

    findById(){

    }

    create(){
        
    }

    update(){

    }

    delete(){

    }
}
module.exports = GenericRepository;