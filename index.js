const moment = require("moment");
const tipodiaRepository = require('./src/repositories/tipodia'); 

module.exports = {
    contarDias: (_fechaInicio, _fechaFin, _periodoConceptoDias, _periodosNoLaborados, _tipoConteo='priorizacionPoTipoDia')=>{
        try{
            let dias = 0;
            switch(_periodoConceptoDias){
                case 14:
                case 15:
                case 16:
                case 30:
                    if(_tipoConteo=='priorizacionPoTipoDia')
                        dias = module.exports.contarPorPriorizacionDiasMensuales(_fechaInicio, _fechaFin, _periodoConceptoDias, _periodosNoLaborados);
                    else if (_tipoConteo=='contarDiasComerciales'){
                        dias = module.exports.contarDiasComercialesMensuales(_fechaInicio, _fechaFin, _periodoConceptoDias, _periodosNoLaborados);
                    }    
                    break;
                case 360:
                    dias = module.exports.contarDiasAnuales(_fechaInicio, _fechaFin, _periodoConceptoDias, _periodosNoLaborados,_tipoConteo);
                    break;
                default:
                    dias = module.exports.contarDiasCalendario(_fechaInicio, _fechaFin, _periodoConceptoDias, _periodosNoLaborados);
            }
            return dias;
        }catch(e){
            console.log("Error contarDias", e);
            throw e;
        }
    },
    contarDiasAnuales: (_fechaInicio, _fechaFin, _periodoConceptoDias, _periodosNoLaborados, _tipoConteo)=>{
        try{
            _fechaInicio = _fechaInicio.split('T')[0];
            _fechaFin = _fechaFin.split('T')[0];
            let days = 0;

            //Setear fecha de inicial
            let startDate = moment(_fechaInicio).utc().startOf('day');
            //Establecer fecha de fin
            let endDate = moment(_fechaFin).utc().endOf('day');

            let max = moment(endDate.format());
            while( startDate.isBefore(max) ){
                //Obtener inicio del mes y fin del mes
                let inicioTemp = moment(startDate.format()).utc().startOf('month');
                let finTemp = moment(startDate.format()).utc().endOf('month');

                //Verificar si la fecha inciio es despues de inicio de mes
                if(inicioTemp.isBefore(startDate) && days==0){
                    inicioTemp = startDate;
                }

                //Verificar si la fecha final es antes de fin de mes
                if(finTemp.isAfter(endDate)){
                    finTemp = endDate;
                }

                //Contar dias mensuales
                let diasMes;
                if(_tipoConteo=='priorizacionPoTipoDia')
                    diasMes = module.exports.contarPorPriorizacionDiasMensuales(inicioTemp.format(),finTemp.format(), 30, _periodosNoLaborados);
                else if (_tipoConteo=='contarDiasComerciales'){
                    diasMes = module.exports.contarDiasComercialesMensuales(inicioTemp.format(), finTemp.format(), 30, _periodosNoLaborados);
                }    
                
                //Sumar a dias totales
                days += diasMes;

                //Ir al siguiente mes
                startDate.add(1,'month').startOf('month');
            }  
            
            return days;
            
        }catch(e){
            console.log("Error contarDiasAnuales", e);
            throw e;
        }
    },
    contarPorPriorizacionDiasMensuales: (_fechaInicio, _fechaFin, _periodoConceptoDias, _periodosNoLaborados)=>{
        try{
            _fechaInicio = _fechaInicio.split('T')[0];
            _fechaFin = _fechaFin.split('T')[0];
            let days = 0;
            //Iniciar recorrido de días apartir de la fecha inicio
            let startDate = moment(_fechaInicio).utc().startOf('day');
            //Establecer fecha de fin
            let endDate = moment(_fechaFin).utc().endOf('day');
            //Obtener el dia inicial
            let startDay = startDate.get('date');
            let endDay = endDate.get('date');
            let diasPeriodo = endDate.diff(startDate, 'days')+1;

            let esMesCompleto = endDate.isSame(moment(endDate.format()).utc().endOf('month').format(),'day') && startDate.isSame(moment(startDate.format()).utc().startOf('month').format(),'day');

            // Validar si periodo entre _fechaInicio y _fechaFin esta dentro _periodosNoLaborados
            /**
             *  pnlfi = _periodosNoLaborados.fechainicio
             *  pnlff = _periodosNoLaborados.fechafin
             *  fi = _fechaInicio
             *  ff = _fechaFin
             *    |--------------------------------------------------|
             *  pnlfi                                               pnlff
             *         |---------------|
             *         fi             fn
             * 
             */
            for(let i in _periodosNoLaborados){
                let pnl = _periodosNoLaborados[i];
                if(moment(_fechaInicio).isSameOrAfter(moment(pnl.fechainicio)) && moment(_fechaFin).isSameOrBefore(moment(pnl.fechafin))){
                    return 0;
                }
            }

            //Transformar periodosnolaborados en array de dias
            let diasNoLaborados = module.exports.transformarPeriodosAArray(JSON.parse(JSON.stringify(_periodosNoLaborados)));

            //Transformar periodosnolaborados en array de objetos con tipodia.
            let diasNoLaboradosConTipodia = module.exports.transformarPeriodosAObjetoConTipodia(JSON.parse(JSON.stringify(_periodosNoLaborados)));

            let periodosNoLaboradorlleganHastaUltimoDia = false;
            _periodosNoLaborados.forEach((periodo)=>{
                if(moment(periodo.fechafin).utc().endOf('day').isSameOrAfter(endDate) && moment(periodo.fechainicio).utc().isSameOrBefore(endDate) && esMesCompleto){
                    periodosNoLaboradorlleganHastaUltimoDia = true;
                }
            });


            let conteoTipodia = {
                [tipodiaRepository.laborado]: 0,
                [tipodiaRepository.permiso]: 0,
                [tipodiaRepository.ausencia]: 0,
                [tipodiaRepository.baja]: 0,
                [tipodiaRepository.alta]: 0
            }
            let max = moment(endDate.format());
            let copyPeriodosNoLaborados = JSON.parse(JSON.stringify(_periodosNoLaborados));
            while( startDate.isBefore(max) && startDay <= endDay ){
                //Solo tomar en cuenta el dia si no esta dentro de los periodos no laborados
                if(diasNoLaborados.indexOf(startDate.format('YYYY-MM-DD'))<0){
                    days=days+1;
                    conteoTipodia[tipodiaRepository.laborado] = conteoTipodia[tipodiaRepository.laborado] + 1
                }else{
                    let diasASumar = 0;
                    let diasARestar = 1;
                    copyPeriodosNoLaborados.forEach((periodo)=>{
                        if(!!periodo.detalle && periodo.detalle.length>0) {
                            periodo.detalle.forEach((fecha)=>{
                                fecha.fechainicio = !!fecha.fechainicio ? fecha.fechainicio.split('T')[0] : fecha.fechainicio;
                                if(moment(fecha.fechainicio).isSame(startDate.format('YYYY-MM-DD'),'day')){
                                    diasASumar = 1-parseFloat(fecha.dias);                                                                        
                                    diasARestar = parseFloat(fecha.dias);
                                }
                            });
                        }
                    });          
                    conteoTipodia[diasNoLaboradosConTipodia[startDate.format('YYYY-MM-DD')] || 'ausencia'] = conteoTipodia[diasNoLaboradosConTipodia[startDate.format('YYYY-MM-DD')]  || 'ausencia'] + diasARestar
                    days = days + diasASumar;
                }

                startDate.add(1,'days');
                startDay++;
            }

            //Cambiar el dia final del mes, cuando esta definido el periodo concepto dias
            if( esMesCompleto && !!_periodoConceptoDias && _periodoConceptoDias == 30){
                diasPeriodo = _periodoConceptoDias;
            }
            /**
             * Ajustar dias segun prioridad de tipo de dia. El que tenga menor prioridad se ajusta
             * 
             * Prioridad 3: Ausencias y permisos
             * Prioridad 2: Dias no laborados posterior a baja o previo a alta 
             * Prioridad 1: Dias laborados
             *    
             */      
            const ajustarDiasPorFindeMes = (dias) => {
                if (esMesCompleto && [28,29,31].indexOf(parseFloat(moment(_fechaFin).daysInMonth()))>=0 && dias == moment(_fechaFin).daysInMonth()){
                    dias = parseFloat(diasPeriodo);
                }
                return dias;
            }
            const ajustarDiasLaboradosPorAusenciaOPermiso = () => {
                let dias = parseFloat(diasPeriodo) - parseFloat(conteoTipodia[tipodiaRepository.ausencia]) - parseFloat(conteoTipodia[tipodiaRepository.permiso]);             
                return dias;
            }       
            let diasAux = parseFloat(conteoTipodia[tipodiaRepository.laborado]);
            // Si hay dias no laborados por ausencias o por permisos, se debe verificar si hay dias no laborados por baja o por alta para ver si se ajustan esos dias o los dias laborados.
            if (conteoTipodia[tipodiaRepository.ausencia] > 0 || conteoTipodia[tipodiaRepository.permiso] > 0) {
                if (conteoTipodia[tipodiaRepository.baja] > 0 || conteoTipodia[tipodiaRepository.alta] > 0) {
                    diasAux = ajustarDiasPorFindeMes(diasAux);
                }else{
                    // Al no haber dias no laborados por baja o alta se ajustan los dias laborados                    
                    diasAux = ajustarDiasLaboradosPorAusenciaOPermiso();
                }
            }else{
                diasAux = ajustarDiasPorFindeMes(diasAux);
            }
            days = diasAux;

            //Retornar valor final de days
            return days;
        }catch(e){
            console.log("Error contarDiasMensuales", e);
            throw e;
        }
    },
    contarDiasComercialesMensuales: (_fechaInicio, _fechaFin, _periodoConceptoDias, _periodosNoLaborados)=>{       
        _fechaInicio = _fechaInicio.split('T')[0];
        _fechaFin = _fechaFin.split('T')[0];
        let days = 0;
        //Iniciar recorrido de días apartir de la fecha inicio
        let startDate = moment(_fechaInicio).startOf('day');
        //Establecer fecha de fin
        let endDate = moment(_fechaFin).endOf('day');
        //Obtener el dia inicial
        let startDay = startDate.get('date');
        let endDay = endDate.get('date');
        // Obtener dias total en el mes de la fecha de fin
        let diasenelmes = moment(endDate).daysInMonth();
        // obtener dia limite del mes segun endDate. Si endDay es menor que los dias en el mes, se toma como endDay, si no 30
        let limitDay = endDay < diasenelmes ? endDay : 30;

        let fechasNoLaboradosConTipodia = module.exports.transformarPeriodosAObjetoConTipodia(JSON.parse(JSON.stringify(_periodosNoLaborados)));
        let diasNoLaboradosConTipodia = {};
        Object.keys(fechasNoLaboradosConTipodia).map((fecha)=>{
            if(moment(fecha).isSameOrAfter(startDate) && moment(fecha).isSameOrBefore(endDate)){
                let dia = moment(fecha).get('date');
                diasNoLaboradosConTipodia[dia] = fechasNoLaboradosConTipodia[fecha];
            }
        });

        while( startDay <= limitDay ){
            // Solo sumar dias si el día es laborado
            if(!diasNoLaboradosConTipodia.hasOwnProperty(startDay)){
                // Si es posterior a la ultima fecha del mes, verificar si dentro de los dias no laborados el ultimo día del mes es tipodia baja, ya no debe seguir sumando
                if (!(startDay>=endDay && diasNoLaboradosConTipodia[endDay] == 'baja')){
                    // Si es posterior a la ultima fecha del mes, y si los días no laboradorados son todo el periodo, no seguir sumando 
                    if (!(startDay>=endDay && Object.keys(diasNoLaboradosConTipodia).length == endDay)){
                        days++;
                    }
                }                
            }else{
                // cuando el dia es no laborado .....
            }
            startDay++;        
            startDate.add(1,'days');
        }

        return days;
    },
    contarDiasCalendario: (_fechaInicio, _fechaFin, _periodoConceptoDias, _periodosNoLaborados)=>{
        try{
            _fechaInicio = _fechaInicio.split('T')[0];
            _fechaFin = _fechaFin.split('T')[0];
            let days = 0;
            //Iniciar recorrido de días apartir de la fecha inicio
            let startDate = moment(_fechaInicio).utc().startOf('day');
            //Establecer fecha de fin
            let endDate = moment(_fechaFin).utc().endOf('day');
            //Obtener el dia inicial
            let startDay = startDate.get('date');
            let endDay = endDate.get('date');

            //Transformar periodosnolaborados en array de dias
            let diasNoLaborados = module.exports.transformarPeriodosAArray(JSON.parse(JSON.stringify(_periodosNoLaborados)));
            
            //Cambiar el dia final del mes, cuando esta definido el periodo concepto dias
            if( !!_periodoConceptoDias ){
                endDay = _periodoConceptoDias;
            }

            let periodosNoLaboradorlleganHastaUltimoDia = false;
            _periodosNoLaborados.forEach((periodo)=>{
                if(moment(periodo.fechafin).format('YYYY-MM-DD') == endDate.format('YYYY-MM-DD')){
                    periodosNoLaboradorlleganHastaUltimoDia = true;
                }
            })


            let max = moment(endDate.format());
            while( startDate.isBefore(max) ){
                if(diasNoLaborados.indexOf(startDate.format('YYYY-MM-DD'))<0){
                    // Es labordor entonces sumar
                    days++;
                }else{
                    // cuando el dia es no laborado .....
                }
                startDate.add(1,'days');
                startDay++;
            }
            return days;
        }catch(e){
            console.log("Error contarDiasMensuales", e);
            throw e;
        }
    },
    transformarPeriodosAArray: (periodos)=>{
        let dias = [];
        try{            

            periodos.forEach(element => {
                element.fechainicio = element.fechainicio.split('T')[0];
                element.fechafin = element.fechafin.split('T')[0];
                let start = moment(element.fechainicio).utc();
                let end = moment(element.fechafin).utc();
                while(start.isBefore(moment(end.format()).add(1,'days'))){
                    dias.push(start.format('YYYY-MM-DD'));
                    start.add(1,'days')
                }
            });

            return dias;

        }catch(e){
            console.log("transformarPeriodosAArray",e);
            return dias;
        }
    },
    transformarPeriodosAObjetoConTipodia: (periodos)=>{
        let dias = {};
        try{            

            periodos.forEach(element => {
                element.fechainicio = element.fechainicio.split('T')[0];
                element.fechafin = element.fechafin.split('T')[0];
                let start = moment(element.fechainicio).utc();
                let end = moment(element.fechafin).utc();
                while(start.isBefore(moment(end.format()).add(1,'days'))){
                    dias[start.format('YYYY-MM-DD')] = element.tipodia || 'ausencia';
                    start.add(1,'days')
                }
            });
            return dias;

        }catch(e){
            console.log("transformarPeriodosAObjetoConTipodia",e);
            return dias;
        }
    },
    periodoNoLaboradoPrevioAlta:  async (ctx, personaId, fechaInicio, fechaFin, _periodoConceptoDias=null, _tipoConteo='priorizacionPoTipoDia') => {
        let antesdealta = [];
        const AltaRepository = require('./src/repositories/alta');
        let Alta = new AltaRepository();
        await Alta.init(ctx);
        try {
            let fechaAlta = await Alta.findOne({ persona: personaId });
            let dias = 0;
            switch(_periodoConceptoDias){
                case 30:
                case 360:
                    dias = module.exports.contarDiasAnuales(moment(fechaInicio).utc().format('YYYY-MM-DD'), moment(fechaAlta.fecha).utc().subtract(1,'days').format('YYYY-MM-DD'),_periodoConceptoDias, [], _tipoConteo)
                    break;
                default:
                    dias = moment(fechaAlta.fecha).diff(fechaInicio, 'days')
                    break;
            }
            if (!!fechaAlta && moment(fechaAlta.fecha).isBetween(fechaInicio, fechaFin)) {
                antesdealta.push(
                    {
                        fechainicio:fechaInicio,
                        fechafin: moment(fechaAlta.fecha).subtract(1,'days').format('YYYY-MM-DD'),
                        dias: dias,
                        tipodia: tipodiaRepository.alta
                    }
                );
            }
            return antesdealta
        } catch (e) {
            console.log("Error al obtener alta de persona ", e)
            return antesdealta;
        }
    },
    periodoNoLaboradoPorBaja:  async (fechaBaja, fechaInicio, fechaFin, _periodoConceptoDias=null, _tipoConteo='priorizacionPoTipoDia') => {        
        let despuesdealta = [];
        if(!fechaBaja) return despuesdealta;
        
        fechaBaja = fechaBaja.split('T')[0];
        try {
            let dias = 0;
            switch(_periodoConceptoDias){
                case 30:
                case 360:
                    dias = module.exports.contarDiasAnuales(moment(fechaBaja).utc().add(1,'days').format('YYYY-MM-DD'),  moment(fechaFin).utc().format('YYYY-MM-DD'),_periodoConceptoDias, [], _tipoConteo)
                    break;
                default:
                    dias = moment(fechaFin).diff(fechaBaja, 'days')
                    break;
            }
            if (!!fechaBaja && moment(fechaBaja).endOf('day').isBetween(fechaInicio, fechaFin)) {
                despuesdealta.push(
                    {
                        fechainicio: moment(fechaBaja).add(1,'days').format('YYYY-MM-DD'),
                        fechafin: moment(fechaFin).format('YYYY-MM-DD'),
                        dias: dias,
                        tipodia: tipodiaRepository.baja
                    }
                );
            }
            return despuesdealta
        } catch (e) {
            console.log("Error al obtener alta de persona ", e)
        }
    }
}