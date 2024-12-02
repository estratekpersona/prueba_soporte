const GenericRepository = require('./generic');

class AltaRepository extends GenericRepository{
    constructor(){
        super('alta')
    }
}

module.exports = AltaRepository;