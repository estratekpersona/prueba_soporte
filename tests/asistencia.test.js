const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

var moment = require('moment');
var AsistenciaService = require('../index');
const AltaRepository = require("../src/repositories/alta");

describe('Asistencia Service', function() {



  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
      sandbox.restore();
  });

  describe('contarDiasComerciales()', function() {

    it('retornar 10 dias, si es alta el 21 de febrero', function (done) {

      let start = '2023-02-01';
      let end = '2023-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2023-02-01',
          fechafin: '2023-02-20',
          dias:12,
          "tipodia": 'alta'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(10);
      done();
    });

    it('retornar 10 dias, si es alta el 21 de Mayo', function (done) {

      let start = '2023-05-01';
      let end = '2023-05-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2023-05-01',
          fechafin: '2023-05-20',
          dias:12,
          "tipodia": 'alta'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(10);
      done();
    });

    it('retornar 18 dias, si tiene baja el 18 de febrero', function (done) {

      let start = '2023-02-01';
      let end = '2023-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2023-02-19',
          fechafin: '2023-02-28',
          dias: 10,
          "tipodia": 'baja'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(18);
      done();
    });

    it('retornar 0 dias, si tiene baja suspensión todo el mes de febrero', function (done) {

      let start = '2023-02-01';
      let end = '2023-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2023-02-01',
          fechafin: '2023-02-28',
          dias: 28,
          "tipodia": 'asuencia'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(0);
      done();
    });

    it('retornar 26 dias, si tiene suspensión del 25 al 28 de febrero', function (done) {

      let start = '2023-02-01';
      let end = '2023-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2023-02-25',
          fechafin: '2023-02-28',
          dias: 4,
          "tipodia": 'asuencia'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(26);
      done();
    });

    it('retornar 24 dias, si tiene suspensión del 22 al 27 de febrero', function (done) {

      let start = '2023-02-01';
      let end = '2023-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2023-02-22',
          fechafin: '2023-02-27',
          dias: 6,
          "tipodia": 'asuencia'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(24);
      done();
    });

    it('retornar 13 dias, si tiene alta el 18 de marzo', function (done) {

      let start = '2023-03-01';
      let end = '2023-03-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2023-03-01',
          fechafin: '2023-03-17',
          dias: 17,
          "tipodia": 'alta'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(13);
      done();
    });

    it('retornar 24 dias, si tiene baja el 25 de marzo', function (done) {

      let start = '2023-03-01';
      let end = '2023-03-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2023-03-26',
          fechafin: '2023-03-31',
          dias: 7,
          "tipodia": 'baja'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(25);
      done();
    });

    it('retornar 0 dias, si tiene suspension todo el mes de marzo', function (done) {

      let start = '2023-03-01';
      let end = '2023-03-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2023-03-01',
          fechafin: '2023-03-31',
          dias: 31,
          "tipodia": 'ausencia'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(0);
      done();
    });

    it('retornar 17 dias, si tiene suspension del 1 al 13 del mes de marzo', function (done) {

      let start = '2023-03-01';
      let end = '2023-03-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2023-03-01',
          fechafin: '2023-03-13',
          dias: 13,
          "tipodia": 'ausencia'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(17);
      done();
    });
    
    it('retornar 23 dias, si tiene ausencia del 10 al 16 del mes de marzo', function (done) {

      let start = '2023-03-01';
      let end = '2023-03-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2023-03-10',
          fechafin: '2023-03-16',
          dias: 7,
          "tipodia": 'ausencia'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(23);
      done();
    });

    it('retornar 1968 dias, alta 01/09/2017 y baja 18/02/2023', function (done) {

      let start = "2017-09-01T00:00:00+00:00";
      let end = "2023-02-28T23:59:59+00:00";
      let periodoConceptoDias = 360;
      let periodosNoLaborados = [
        {
          fechainicio: "2023-02-19",
          fechafin: "2023-02-28",
          dias: 10,
          "tipodia": 'baja'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(1968);
      done();
    });

    it('retornar 171 dias, 01/03/2023 - 30/09/2023 con baja 21/09/2023', function (done) {

      let start = "2023-03-01T00:00:00+00:00";
      let end = "2023-09-30T23:59:59+00:00";
      let periodoConceptoDias = 360;
      let periodosNoLaborados = [
        {
          fechainicio: "2023-09-22",
          fechafin: "2023-09-30",
          dias: 9,
          "tipodia": 'baja'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');

      expect(dias).to.equal(201);
      done();
    });

    it('retornar 4 dias, 01/10/2023 - 04/10/2023', function (done) {

      let start = "2023-10-01T00:00:00+00:00";
      let end = "2023-10-04T23:59:59+00:00";
      let periodoConceptoDias = 30;
      let periodosNoLaborados = []

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(4);
      done();
    });

    it('retornar 26 dias, 05/10/2023 - 31/10/2023', function (done) {

      let start = "2023-10-05T00:00:00+00:00";
      let end = "2023-10-31T23:59:59+00:00";
      let periodoConceptoDias = 30;
      let periodosNoLaborados = []

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(26);
      done();
    });

    it('retornar 14.5 dias, 01/01/2024 - 15/01/2024', function (done) {

      let start = "2023-01-01T00:00:00+00:00";
      let end = "2023-01-15T23:59:59+00:00";
      let periodoConceptoDias = 15;
      let periodosNoLaborados = [
        {
          fechainicio: "2023-01-08",
          fechafin: "2023-01-08",
          dias: 0.5,
          detalle:[
            {
              fechainicio: "2023-01-08T00:00:00+00:00",
              fechafin: "2023-01-08T00:00:00+00:00",
              dias: 0.5,
              "tipodia": 'permiso'  
            }
          ],
          "tipodia": 'permiso'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(14.5);
      done();
    });

    it('retornar 29.5 dias, 01/01/2024 - 31/01/2024', function (done) {

      let start = "2023-01-01T00:00:00+00:00";
      let end = "2023-01-31T23:59:59+00:00";
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio: "2023-01-08",
          fechafin: "2023-01-08",
          dias: 0.5,
          detalle:[
            {
              fechainicio: "2023-01-08T00:00:00+00:00",
              fechafin: "2023-01-08T00:00:00+00:00",
              dias: 0.5,
              "tipodia": 'permiso'  
            }
          ],
          "tipodia": 'permiso'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(29.5);
      done();
    });

    it('retornar 14 dias, 01/01/2024 - 15/01/2024', function (done) {

      let start = "2023-01-01T00:00:00+00:00";
      let end = "2023-01-15T23:59:59+00:00";
      let periodoConceptoDias = 15;
      let periodosNoLaborados = [
        {
          fechainicio: "2023-01-08",
          fechafin: "2023-01-08",
          dias: 1,
          "tipodia": 'permiso'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados,'contarDiasComerciales');    

      expect(dias).to.equal(14);
      done();
    });

  });
  
  describe('contarDias()', function() {
    it('Debe retornar 18 dias, si se ausento del 1 de enero al 12 de enero para un año comercial', function (done) {

        let start = '2021-01-01';
        let end = '2021-01-31';
        let periodoConceptoDias = 30;
        let periodosNoLaborados = [
          {
            fechainicio:'2021-01-01',
            fechafin: '2021-01-12',
            dias:12
          }
        ]

        let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

        expect(dias).to.equal(18);
        done();
    });

    it('Debe retornar 6 dias, si se ausento del 1 de febrero al 24 de febrero para un año comercial no bisiesto', function (done) {

      let start = '2021-02-01';
      let end = '2021-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2021-02-01',
          fechafin: '2021-02-24',
          dias:12
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(6);
      done();
    });

    it('Debe retornar 6 dias, si se ausento del 1 de febrero al 24 de febrero para un año comercial bisiesto', function (done) {

      let start = '2020-02-01';
      let end = '2020-02-29';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2020-02-01',
          fechafin: '2020-02-24',
          dias:12
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(6);
      done();
    });

    it('Debe retornar 26 dias, si se ausento del 1 de abril al 4 de abril para un año comercial', function (done) {

      let start = '2020-04-01';
      let end = '2020-04-30';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2020-04-01',
          fechafin: '2020-04-04',
          dias:12
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(26);
      done();
    });

    it('Debe retornar 5 dias, si se ausento del 1 de Julio al 25 de Julio para un año comercial', function (done) {

      let start = '2020-07-01';
      let end = '2020-07-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2020-07-01',
          fechafin: '2020-07-25',
          dias:12
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(5);
      done();
    });

    it('Debe retornar 29 dias, si se ausento del 1 de Julio para un año comercial', function (done) {

      let start = '2020-07-01';
      let end = '2020-07-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2020-07-01',
          fechafin: '2020-07-01',
          dias:12
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(29);
      done();
    });

    it('Debe retornar 3 dias, si se ausento del 1 de febrero al 27 de febrero para un año comercial', function (done) {

      let start = '2021-02-01';
      let end = '2021-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2021-02-01',
          fechafin: '2021-02-27',
          dias:12
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(3);
      done();
    });

    it('Debe retornar 29 dias, si se ausento del 30 de enero al 31 de enero para un año comercial', function (done) {

      let start = '2021-01-01';
      let end = '2021-01-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2021-01-30',
          fechafin: '2021-01-31',
          dias:2
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(28);
      done();
    });

    it('Debe retornar 29 dias, si se ausento el 31 de enero para un año comercial', function (done) {

      let start = '2021-01-01';
      let end = '2021-01-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2021-01-31',
          fechafin: '2021-01-31',
          dias:12
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(29);
      done();
    });
    
    it('Debe retornar 30 dias, si no se ausento ni un dia en enero', function (done) {

      let start = '2021-01-01';
      let end = '2021-01-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = []

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(30);
      done();
    });

    it('Debe retornar 30 dias, si no se ausento ni un dia en febrero', function (done) {

      let start = '2021-02-01';
      let end = '2021-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = []

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(30);
      done();
    });

    it('Debe retornar 21 dias, si se suspendio del 5 de enero al 14 de enero para un año comercial', function (done) {

      let start = '2021-01-01';
      let end = '2021-01-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2021-01-05',
          fechafin: '2021-01-14',
          dias:12
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(20);
      done();
    });

    it('Debe retornar 19 dias, si se suspendio del 19 de marzo al 29 de marzo para un año comercial', function (done) {

      let start = '2021-03-01';
      let end = '2021-03-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2021-03-19T00:00:00.000Z',
          fechafin: '2021-03-29T06:00:00.000Z',
          dias:11
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(19);
      done();
    });

    it('Debe retornar 20 dias, si se suspendio del 19 de marzo al 29 de marzo para un año comercial', function (done) {

      let start = '2021-03-01';
      let end = '2021-03-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2021-03-19T00:00:00.000Z',
          fechafin: '2021-03-31T06:00:00.000Z',
          dias:13
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(17);
      done();
    });

    it('Debe retornar 24 dias, si se dio de baja el 25 de un mes de 31 para un año comercial', function (done) {

      let start = '2021-03-01';
      let end = '2021-03-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2021-03-26T00:00:00.000Z',
          fechafin: '2021-03-31T06:00:00.000Z',
          dias:6
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(24);
      done();
    });

    it('Debe retornar 24 dias, si se dio de baja el 22 de un mes de 28 para un año comercial', function (done) {

      let start = '2021-02-01';
      let end = '2021-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2021-02-23T00:00:00.000Z',
          fechafin: '2021-02-28T06:00:00.000Z',
          dias:6
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(24);
      done();
    });

    it('Debe retornar 19 dias, si se dio de baja el 22 de un mes de 28 para un año comercial', function (done) {

      let start = '2021-05-01';
      let end = '2021-05-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          "fechainicio": "2021-05-20T00:00:00.000Z",
          "fechafin": "2021-05-31T23:59:59+00:00",
          "dias": 11,
          "motivoausencia": {
            "_id": "5afde08a649e0e14013ef663",
            "deleted": false,
            "nombre": "Suspensión IGSS (Enfermedad Común)",
            "tipomotivoausencia": "suspension",
            "createdAt": "2018-05-17T20:05:30.001Z",
            "updatedAt": "2021-03-23T21:28:02.619Z",
            "__v": 0,
            "modifiedBy": {
              "id": "beb88bc0-193b-11eb-b2e3-0e342745a55e"
            }
          },
          "estadoausencia": "5b0c3d9cb673d550a5829299",
          "persona": "5fbfee520bd29f00151ddb89",
          "tipoausencia": "5ad5156c5dd17f0001ff0e15",
          "silla": "60f5ea15741b1a00109ad7ba",
          "detalle": [
            {
              "_id": "6102af23fa9e000010ca09a7",
              "logsestadopersona": [],
              "deleted": false,
              "tipoausencia": "5ad5156c5dd17f0001ff0e15",
              "motivoausencia": {
                "_id": "5afde08a649e0e14013ef663",
                "deleted": false,
                "nombre": "Suspensión IGSS (Enfermedad Común)",
                "tipomotivoausencia": "suspension",
                "createdAt": "2018-05-17T20:05:30.001Z",
                "updatedAt": "2021-03-23T21:28:02.619Z",
                "__v": 0,
                "modifiedBy": {
                  "id": "beb88bc0-193b-11eb-b2e3-0e342745a55e"
                }
              },
              "septimo": false,
              "comentario": "Por enfermedad.",
              "fechainicio": "2021-05-20T00:00:00.000Z",
              "fechafin": "2021-05-20T00:00:00.000Z",
              "estadoausencia": "5b0c3d9cb673d550a5829299",
              "persona": "5fbfee520bd29f00151ddb89",
              "silla": "60f5ea15741b1a00109ad7ba",
              "dias": 1,
              "periodoinicio": "2021-05-20T06:00:00.000Z",
              "periodofin": "2021-06-03T06:00:00.000Z",
              "__v": 0,
              "createdAt": "2021-07-29T13:37:39.603Z",
              "updatedAt": "2021-07-29T13:37:39.603Z"
            },
            {
              "_id": "6102af23fa9e000010ca09a8",
              "logsestadopersona": [],
              "deleted": false,
              "tipoausencia": "5ad5156c5dd17f0001ff0e15",
              "motivoausencia": {
                "_id": "5afde08a649e0e14013ef663",
                "deleted": false,
                "nombre": "Suspensión IGSS (Enfermedad Común)",
                "tipomotivoausencia": "suspension",
                "createdAt": "2018-05-17T20:05:30.001Z",
                "updatedAt": "2021-03-23T21:28:02.619Z",
                "__v": 0,
                "modifiedBy": {
                  "id": "beb88bc0-193b-11eb-b2e3-0e342745a55e"
                }
              },
              "septimo": false,
              "comentario": "Por enfermedad.",
              "fechainicio": "2021-05-21T00:00:00.000Z",
              "fechafin": "2021-05-21T00:00:00.000Z",
              "estadoausencia": "5b0c3d9cb673d550a5829299",
              "persona": "5fbfee520bd29f00151ddb89",
              "silla": "60f5ea15741b1a00109ad7ba",
              "dias": 1,
              "periodoinicio": "2021-05-20T06:00:00.000Z",
              "periodofin": "2021-06-03T06:00:00.000Z",
              "__v": 0,
              "createdAt": "2021-07-29T13:37:39.603Z",
              "updatedAt": "2021-07-29T13:37:39.603Z"
            },
            {
              "_id": "6102af23fa9e000010ca09a9",
              "logsestadopersona": [],
              "deleted": false,
              "tipoausencia": "5ad5156c5dd17f0001ff0e15",
              "motivoausencia": {
                "_id": "5afde08a649e0e14013ef663",
                "deleted": false,
                "nombre": "Suspensión IGSS (Enfermedad Común)",
                "tipomotivoausencia": "suspension",
                "createdAt": "2018-05-17T20:05:30.001Z",
                "updatedAt": "2021-03-23T21:28:02.619Z",
                "__v": 0,
                "modifiedBy": {
                  "id": "beb88bc0-193b-11eb-b2e3-0e342745a55e"
                }
              },
              "septimo": false,
              "comentario": "Por enfermedad.",
              "fechainicio": "2021-05-24T00:00:00.000Z",
              "fechafin": "2021-05-24T00:00:00.000Z",
              "estadoausencia": "5b0c3d9cb673d550a5829299",
              "persona": "5fbfee520bd29f00151ddb89",
              "silla": "60f5ea15741b1a00109ad7ba",
              "dias": 1,
              "periodoinicio": "2021-05-20T06:00:00.000Z",
              "periodofin": "2021-06-03T06:00:00.000Z",
              "__v": 0,
              "createdAt": "2021-07-29T13:37:39.603Z",
              "updatedAt": "2021-07-29T13:37:39.603Z"
            },
            {
              "_id": "6102af23fa9e000010ca09aa",
              "logsestadopersona": [],
              "deleted": false,
              "tipoausencia": "5ad5156c5dd17f0001ff0e15",
              "motivoausencia": {
                "_id": "5afde08a649e0e14013ef663",
                "deleted": false,
                "nombre": "Suspensión IGSS (Enfermedad Común)",
                "tipomotivoausencia": "suspension",
                "createdAt": "2018-05-17T20:05:30.001Z",
                "updatedAt": "2021-03-23T21:28:02.619Z",
                "__v": 0,
                "modifiedBy": {
                  "id": "beb88bc0-193b-11eb-b2e3-0e342745a55e"
                }
              },
              "septimo": false,
              "comentario": "Por enfermedad.",
              "fechainicio": "2021-05-25T00:00:00.000Z",
              "fechafin": "2021-05-25T00:00:00.000Z",
              "estadoausencia": "5b0c3d9cb673d550a5829299",
              "persona": "5fbfee520bd29f00151ddb89",
              "silla": "60f5ea15741b1a00109ad7ba",
              "dias": 1,
              "periodoinicio": "2021-05-20T06:00:00.000Z",
              "periodofin": "2021-06-03T06:00:00.000Z",
              "__v": 0,
              "createdAt": "2021-07-29T13:37:39.604Z",
              "updatedAt": "2021-07-29T13:37:39.604Z"
            },
            {
              "_id": "6102af23fa9e000010ca09ab",
              "logsestadopersona": [],
              "deleted": false,
              "tipoausencia": "5ad5156c5dd17f0001ff0e15",
              "motivoausencia": {
                "_id": "5afde08a649e0e14013ef663",
                "deleted": false,
                "nombre": "Suspensión IGSS (Enfermedad Común)",
                "tipomotivoausencia": "suspension",
                "createdAt": "2018-05-17T20:05:30.001Z",
                "updatedAt": "2021-03-23T21:28:02.619Z",
                "__v": 0,
                "modifiedBy": {
                  "id": "beb88bc0-193b-11eb-b2e3-0e342745a55e"
                }
              },
              "septimo": false,
              "comentario": "Por enfermedad.",
              "fechainicio": "2021-05-26T00:00:00.000Z",
              "fechafin": "2021-05-26T00:00:00.000Z",
              "estadoausencia": "5b0c3d9cb673d550a5829299",
              "persona": "5fbfee520bd29f00151ddb89",
              "silla": "60f5ea15741b1a00109ad7ba",
              "dias": 1,
              "periodoinicio": "2021-05-20T06:00:00.000Z",
              "periodofin": "2021-06-03T06:00:00.000Z",
              "__v": 0,
              "createdAt": "2021-07-29T13:37:39.604Z",
              "updatedAt": "2021-07-29T13:37:39.604Z"
            },
            {
              "_id": "6102af23fa9e000010ca09ac",
              "logsestadopersona": [],
              "deleted": false,
              "tipoausencia": "5ad5156c5dd17f0001ff0e15",
              "motivoausencia": {
                "_id": "5afde08a649e0e14013ef663",
                "deleted": false,
                "nombre": "Suspensión IGSS (Enfermedad Común)",
                "tipomotivoausencia": "suspension",
                "createdAt": "2018-05-17T20:05:30.001Z",
                "updatedAt": "2021-03-23T21:28:02.619Z",
                "__v": 0,
                "modifiedBy": {
                  "id": "beb88bc0-193b-11eb-b2e3-0e342745a55e"
                }
              },
              "septimo": false,
              "comentario": "Por enfermedad.",
              "fechainicio": "2021-05-27T00:00:00.000Z",
              "fechafin": "2021-05-27T00:00:00.000Z",
              "estadoausencia": "5b0c3d9cb673d550a5829299",
              "persona": "5fbfee520bd29f00151ddb89",
              "silla": "60f5ea15741b1a00109ad7ba",
              "dias": 1,
              "periodoinicio": "2021-05-20T06:00:00.000Z",
              "periodofin": "2021-06-03T06:00:00.000Z",
              "__v": 0,
              "createdAt": "2021-07-29T13:37:39.604Z",
              "updatedAt": "2021-07-29T13:37:39.604Z"
            },
            {
              "_id": "6102af23fa9e000010ca09ad",
              "logsestadopersona": [],
              "deleted": false,
              "tipoausencia": "5ad5156c5dd17f0001ff0e15",
              "motivoausencia": {
                "_id": "5afde08a649e0e14013ef663",
                "deleted": false,
                "nombre": "Suspensión IGSS (Enfermedad Común)",
                "tipomotivoausencia": "suspension",
                "createdAt": "2018-05-17T20:05:30.001Z",
                "updatedAt": "2021-03-23T21:28:02.619Z",
                "__v": 0,
                "modifiedBy": {
                  "id": "beb88bc0-193b-11eb-b2e3-0e342745a55e"
                }
              },
              "septimo": false,
              "comentario": "Por enfermedad.",
              "fechainicio": "2021-05-28T00:00:00.000Z",
              "fechafin": "2021-05-28T00:00:00.000Z",
              "estadoausencia": "5b0c3d9cb673d550a5829299",
              "persona": "5fbfee520bd29f00151ddb89",
              "silla": "60f5ea15741b1a00109ad7ba",
              "dias": 1,
              "periodoinicio": "2021-05-20T06:00:00.000Z",
              "periodofin": "2021-06-03T06:00:00.000Z",
              "__v": 0,
              "createdAt": "2021-07-29T13:37:39.604Z",
              "updatedAt": "2021-07-29T13:37:39.604Z"
            },
            {
              "_id": "6102af23fa9e000010ca09ae",
              "logsestadopersona": [],
              "deleted": false,
              "tipoausencia": "5ad5156c5dd17f0001ff0e15",
              "motivoausencia": {
                "_id": "5afde08a649e0e14013ef663",
                "deleted": false,
                "nombre": "Suspensión IGSS (Enfermedad Común)",
                "tipomotivoausencia": "suspension",
                "createdAt": "2018-05-17T20:05:30.001Z",
                "updatedAt": "2021-03-23T21:28:02.619Z",
                "__v": 0,
                "modifiedBy": {
                  "id": "beb88bc0-193b-11eb-b2e3-0e342745a55e"
                }
              },
              "septimo": false,
              "comentario": "Por enfermedad.",
              "fechainicio": "2021-05-31T00:00:00.000Z",
              "fechafin": "2021-05-31T00:00:00.000Z",
              "estadoausencia": "5b0c3d9cb673d550a5829299",
              "persona": "5fbfee520bd29f00151ddb89",
              "silla": "60f5ea15741b1a00109ad7ba",
              "dias": 1,
              "periodoinicio": "2021-05-20T06:00:00.000Z",
              "periodofin": "2021-05-31T23:59:59+00:00",
              "__v": 0,
              "createdAt": "2021-07-29T13:37:39.604Z",
              "updatedAt": "2021-07-29T13:37:39.604Z"
            }
          ],
          "periodoinicio": "2021-05-20T06:00:00.000Z",
          "periodofin": "2021-06-03T06:00:00.000Z"
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(18);
      done();
    });

    it('Debe retornar 607 dias, si se dio de alta un 16 de julio 2019 y se dio de baja el 22 de febrero 2021 para un año comercial', function (done) {

      let start = '2019-06-16';
      let end = '2021-02-28';
      let periodoConceptoDias = 360;
      let periodosNoLaborados = [
        {
          fechainicio:'2019-06-01T00:00:00.000Z',
          fechafin: '2019-06-15T06:00:00.000Z',
          dias:15
        },
        {
          fechainicio:'2021-02-23T00:00:00.000Z',
          fechafin: '2021-02-28T06:00:00.000Z',
          dias:6
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(609);
      done();
    });

    it('Debe retornar 14 dias, si el periodo es menor a 1 mes para un año comercial', function (done) {

      let start = '2020-12-01';
      let end = '2020-12-17';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2020-12-01T00:00:00.000Z',
          fechafin: '2020-12-03T06:00:00.000Z',
          dias:3
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(14);
      done();
    });

    it('Debe retornar 48 dias, si el periodo inicia entre el mes y finaliza entre mes para un año comercial', function (done) {

      let start = '2020-10-27';
      let end = '2020-12-17';
      let periodoConceptoDias = 360;
      let periodosNoLaborados = [
        {
          fechainicio:'2020-12-01T00:00:00.000Z',
          fechafin: '2020-12-03T06:00:00.000Z',
          dias:3
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(49);
      done();
    });

    it('Debe retornar 16 dias, si tiene periodosNoLaborados entre el mes para un año comercial', function (done) {

      let start = '2021-02-01';
      let end = '2021-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        {
          fechainicio:'2021-02-01T00:00:00.000Z',
          fechafin: '2021-02-14',
          dias:14
        },
        {
          "fechainicio": "2021-03-01",
          "fechafin": "2021-02-28",
          "dias": 1
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(16);
      done();
    });

    it('Debe retornar 19 dias, si tiene periodosNoLaborados entre el mes para un año comercial', function (done) {

      let start = '2022-08-01';
      let end = '2022-08-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = [
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2022-08-17T00:00:00.000Z', 
          fechafin: '2022-08-17T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 1, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2022-08-17T00:00:00.000Z', 
            fechafin: '2022-08-17T00:00:00.000Z', 
            dias: 1
          }] 
        },
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2022-08-18T00:00:00.000Z', 
          fechafin: '2022-08-18T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 1, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2022-08-18T00:00:00.000Z', 
            fechafin: '2022-08-18T00:00:00.000Z', 
            dias: 1
          }] 
        },
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2022-08-19T00:00:00.000Z', 
          fechafin: '2022-08-19T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 1, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2022-08-19T00:00:00.000Z', 
            fechafin: '2022-08-19T00:00:00.000Z', 
            dias: 1
          }] 
        },
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2022-08-20T00:00:00.000Z', 
          fechafin: '2022-08-20T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 1, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2022-08-20T00:00:00.000Z', 
            fechafin: '2022-08-20T00:00:00.000Z', 
            dias: 1
          }] 
        },
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2022-08-21T00:00:00.000Z', 
          fechafin: '2022-08-21T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 1, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2022-08-21T00:00:00.000Z', 
            fechafin: '2022-08-21T00:00:00.000Z', 
            dias: 1
          }] 
        },
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2022-08-24T00:00:00.000Z', 
          fechafin: '2022-08-24T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 1, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2022-08-24T00:00:00.000Z', 
            fechafin: '2022-08-24T00:00:00.000Z', 
            dias: 1
          }] 
        },
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2022-08-25T00:00:00.000Z', 
          fechafin: '2022-08-25T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 1, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2022-08-25T00:00:00.000Z', 
            fechafin: '2022-08-25T00:00:00.000Z', 
            dias: 1
          }] 
        },
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2022-08-26T00:00:00.000Z', 
          fechafin: '2022-08-26T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 1, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2022-08-26T00:00:00.000Z', 
            fechafin: '2022-08-26T00:00:00.000Z', 
            dias: 1
          }] 
        },
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2022-08-27T00:00:00.000Z', 
          fechafin: '2022-08-27T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 1, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2022-08-27T00:00:00.000Z', 
            fechafin: '2022-08-27T00:00:00.000Z', 
            dias: 1
          }] 
        },
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2022-08-28T00:00:00.000Z', 
          fechafin: '2022-08-28T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 1, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2022-08-28T00:00:00.000Z', 
            fechafin: '2022-08-28T00:00:00.000Z', 
            dias: 1
          }] 
        },
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2022-08-31T00:00:00.000Z', 
          fechafin: '2022-08-31T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 1, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2022-08-31T00:00:00.000Z', 
            fechafin: '2022-08-31T00:00:00.000Z', 
            dias: 1
          }] 
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(19);
      done();
    });

    it('Debe retornar 579 dias, si se dio de alta un 16 de julio 2019 y se dio de baja el 22 de febrero 2021 para un año comercial', function (done) {

      let start = '2019-07-01T00:00:00+00:00';
      let end = '2021-02-28T23:59:59+00:00';
      let periodoConceptoDias = 360;
      let periodosNoLaborados = [
        {
          fechainicio:'2019-07-01T00:00:00.000Z',
          fechafin: '2019-07-15T06:00:00.000Z',
          dias:15
        },
        {
          fechainicio:'2021-02-23T00:00:00.000Z',
          fechafin: '2021-02-28T06:00:00.000Z',
          dias:15
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(579);
      done();
    });

    it('Debe retornar 618 dias, si se dio de alta un 16 de julio 2019 y se dio de baja el 22 de febrero 2021 para un año calendario', function (done) {

      let start = '2019-06-01';
      let end = '2021-02-28';
      let periodosNoLaborados = [
        {
          fechainicio:'2019-06-01T00:00:00.000Z',
          fechafin: '2019-06-15T06:00:00.000Z',
          dias:15
        },
        {
          fechainicio:'2021-02-23T00:00:00.000Z',
          fechafin: '2021-02-28T06:00:00.000Z',
          dias:15
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,null,periodosNoLaborados);    

      expect(dias).to.equal(618);
      done();
    });
  
    it('Debe retornar 14.5 dias, para una quincena con medio dia de permiso no remunerado', function (done) {

      let start = '2023-01-01';
      let end = '2023-01-15';
      let periodosNoLaborados = [
        {
          fechainicio: "2023-01-08",
          fechafin: "2023-01-08",
          dias: 0.5,
          detalle:[
            {
              fechainicio: "2023-01-08T00:00:00+00:00",
              fechafin: "2023-01-08T00:00:00+00:00",
              dias: 0.5
            }
          ],
          "tipodia": 'permiso'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,null,periodosNoLaborados);    

      expect(dias).to.equal(14.5);
      done();
    });


  
    it('Debe retornar 30.5 dias, para un mes con medio dia de permiso no remunerado', function (done) {

      let start = '2023-01-01';
      let end = '2023-01-31';
      let periodosNoLaborados = [
        {
          fechainicio: "2023-01-08",
          fechafin: "2023-01-08",
          dias: 0.5,
          detalle:[
            {
              fechainicio: "2023-01-08T00:00:00+00:00",
              fechafin: "2023-01-08T00:00:00+00:00",
              dias: 0.5
            }
          ],
          "tipodia": 'permiso'
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,null,periodosNoLaborados);    

      expect(dias).to.equal(30.5);
      done();
    });

    it('Debe retornar 365 dias, para un año calendario', function (done) {

      let start = '2020-07-01';
      let end = '2021-06-30';
      let periodosNoLaborados = [
      ]

      let dias = AsistenciaService.contarDias(start,end,null,periodosNoLaborados);    

      expect(dias).to.equal(365);
      done();
    });

    it('Debe retornar 360 dias, para un año comercial', function (done) {

      let start = '2020-07-01';
      let end = '2021-06-30';
      let periodoConceptoDias = 360;
      let periodosNoLaborados = [
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(360);
      done();
    });

    it('Debe retornar 86 dias, para un periodo anual comercial con alta entre periodo', function (done) {

      let start = '2020-07-01';
      let end = '2021-06-30';
      let periodoConceptoDias = 360;
      let periodosNoLaborados = [
        {
          "fechainicio": "2020-07-01T00:00:00.000Z",
          "fechafin": "2021-04-04",
          "dias": 274
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(86);
      done();
    });

    it('Debe retornar 14.5 dias, si se ausento medio dia para un año comercial', function (done) {

      let start = '2020-04-01';
      let end = '2020-04-15';
      let periodoConceptoDias = 15;
      let periodosNoLaborados = [
        { 
          _id: '6101c00f64e0c40010d91495', 
          esremunerado: false, 
          estadopermiso: 'done', 
          logsestadopersona: [], 
          deleted: false, 
          fechainicio: '2020-04-09T00:00:00.000Z', 
          fechafin: '2020-04-09T00:00:00.000Z', 
          licencia: 'vacaciones-guatemala', 
          persona: '5fbfee450bd29f00151ddb5f', 
          dias: 0.5, 
          silla: '5fc10a39bfbb660010dcc125', 
          __v: 0, 
          createdAt: '2021-07-28T20:37:35.354Z', 
          updatedAt: '2021-07-28T20:37:35.354Z', 
          detalle: [{
            fechainicio: '2020-04-09T00:00:00.000Z', 
            fechafin: '2020-04-09T00:00:00.000Z',
            dias: 0.5
          }] 
        }
      ]

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(14.5);
      done();
    });

    it('Debe retornar 11 dias, si se ausento del 13 de mayo a fin de mayo en periodo de 30 dias', function (done) {

      let start = '2022-05-01';
      let end = '2022-05-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
        [
          {
            "fechainicio":"2022-05-13T00:00:00.000Z",
            "fechafin":"2022-05-31T06:00:00.000Z",
            "dias":19,
            "motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},
            "estadoausencia":
            "5b0c3d9cb673d550a5829299",
            "persona":"5fbfee4e0bd29f00151ddb7f",
            "tipoausencia":"5ad5156c5dd17f0001ff0e15",
            "silla":"5fc10a58bfbb660010dcc165",
            "detalle":[
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-13T00:00:00.000Z","fechafin":"2022-05-13T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-14T00:00:00.000Z","fechafin":"2022-05-14T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-15T00:00:00.000Z","fechafin":"2022-05-15T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-18T00:00:00.000Z","fechafin":"2022-05-18T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-19T00:00:00.000Z","fechafin":"2022-05-19T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-20T00:00:00.000Z","fechafin":"2022-05-20T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-21T00:00:00.000Z","fechafin":"2022-05-21T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-22T00:00:00.000Z","fechafin":"2022-05-22T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-25T00:00:00.000Z","fechafin":"2022-05-25T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-26T00:00:00.000Z","fechafin":"2022-05-26T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-27T00:00:00.000Z","fechafin":"2022-05-27T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-28T00:00:00.000Z","fechafin":"2022-05-28T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-05-29T00:00:00.000Z","fechafin":"2022-05-29T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-05-13T06:00:00.000Z","periodofin":"2022-05-31T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"}
            ],
            "periodoinicio":"2022-05-13T06:00:00.000Z",
            "periodofin":"2022-05-31T06:00:00.000Z"
          }
        ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(11);
      done();
    });

    it('Debe retornar 14 dias, si se ausento del 13 de febrero al 28 de febrero en periodo de 30 dias', function (done) {

      let start = '2022-02-01';
      let end = '2022-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
        [
          {
            "fechainicio":"2022-02-13T00:00:00.000Z",
            "fechafin":"2022-02-28T06:00:00.000Z",
            "dias":16,
            "motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},
            "estadoausencia":
            "5b0c3d9cb673d550a5829299",
            "persona":"5fbfee4e0bd29f00151ddb7f",
            "tipoausencia":"5ad5156c5dd17f0001ff0e15",
            "silla":"5fc10a58bfbb660010dcc165",
            "detalle":[
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-13T00:00:00.000Z","fechafin":"2022-05-13T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-16T00:00:00.000Z","fechafin":"2022-05-14T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-17T00:00:00.000Z","fechafin":"2022-05-15T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-18T00:00:00.000Z","fechafin":"2022-05-18T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-19T00:00:00.000Z","fechafin":"2022-05-19T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-20T00:00:00.000Z","fechafin":"2022-05-20T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-23T00:00:00.000Z","fechafin":"2022-05-21T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-24T00:00:00.000Z","fechafin":"2022-05-22T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-25T00:00:00.000Z","fechafin":"2022-05-25T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-26T00:00:00.000Z","fechafin":"2022-05-26T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-27T00:00:00.000Z","fechafin":"2022-05-27T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"}              
            ],
            "periodoinicio":"2022-02-13T06:00:00.000Z",
            "periodofin":"2022-02-28T06:00:00.000Z"
          }
        ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(14);
      done();
    });

    it('Debe retornar 14 dias, si se ausento del 13 de febrero al 28 de febrero en periodo de 30 dias', function (done) {

      let start = '2022-08-01';
      let end = '2022-08-15';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
        [
          {
            "fechainicio":"2022-08-15T00:00:00.000Z",
            "fechafin":"2022-08-15T06:00:00.000Z",
            "dias":1,
            "motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},
            "estadoausencia":
            "5b0c3d9cb673d550a5829299",
            "persona":"5fbfee4e0bd29f00151ddb7f",
            "tipoausencia":"5ad5156c5dd17f0001ff0e15",
            "silla":"5fc10a58bfbb660010dcc165",
            "detalle":[
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-08-14T00:00:00.000Z","fechafin":"2022-08-14T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-08-18T00:00:00.000Z","fechafin":"2022-08-18T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-16T00:00:00.000Z","fechafin":"2022-05-14T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-17T00:00:00.000Z","fechafin":"2022-05-15T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-18T00:00:00.000Z","fechafin":"2022-05-18T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-19T00:00:00.000Z","fechafin":"2022-05-19T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-20T00:00:00.000Z","fechafin":"2022-05-20T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-23T00:00:00.000Z","fechafin":"2022-05-21T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-24T00:00:00.000Z","fechafin":"2022-05-22T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-25T00:00:00.000Z","fechafin":"2022-05-25T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-26T00:00:00.000Z","fechafin":"2022-05-26T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-27T00:00:00.000Z","fechafin":"2022-05-27T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"}              
            ],
            "periodoinicio":"2022-08-15T06:00:00.000Z",
            "periodofin":"2022-08-30T06:00:00.000Z"
          }
        ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(14);
      done();
    });
    it('Debe retornar 14 dias, si se ausento del 13 de febrero al 28 de febrero en periodo de 30 dias', function (done) {

      let start = '2022-02-01';
      let end = '2022-02-28';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
        [
          {
            "fechainicio":"2022-02-13T00:00:00.000Z",
            "fechafin":"2022-02-28T06:00:00.000Z",
            "dias":16,
            "motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},
            "estadoausencia":
            "5b0c3d9cb673d550a5829299",
            "persona":"5fbfee4e0bd29f00151ddb7f",
            "tipoausencia":"5ad5156c5dd17f0001ff0e15",
            "silla":"5fc10a58bfbb660010dcc165",
            "detalle":[
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-13T00:00:00.000Z","fechafin":"2022-05-13T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-16T00:00:00.000Z","fechafin":"2022-05-14T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-17T00:00:00.000Z","fechafin":"2022-05-15T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-18T00:00:00.000Z","fechafin":"2022-05-18T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-19T00:00:00.000Z","fechafin":"2022-05-19T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-20T00:00:00.000Z","fechafin":"2022-05-20T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-23T00:00:00.000Z","fechafin":"2022-05-21T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-24T00:00:00.000Z","fechafin":"2022-05-22T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-25T00:00:00.000Z","fechafin":"2022-05-25T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-26T00:00:00.000Z","fechafin":"2022-05-26T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"},
              {"_id":"609c1abef168820012c74f8e","logsestadopersona":[],"deleted":false,"tipoausencia":"5ad5156c5dd17f0001ff0e15","motivoausencia":{"_id":"5afde08a649e0e14013ef663","deleted":false,"nombre":"Suspensión IGSS (Enfermedad Común)","tipomotivoausencia":"suspension","createdAt":"2018-05-17T20:05:30.001Z","updatedAt":"2021-04-12T21:28:02.619Z","__v":0,"modifiedBy":{"id":"beb88bc0-193b-11eb-b2e3-0e342745a55e"}},"septimo":true,"comentario":"test","fechainicio":"2022-02-27T00:00:00.000Z","fechafin":"2022-05-27T00:00:00.000Z","estadoausencia":"5b0c3d9cb673d550a5829299","persona":"5fbfee4e0bd29f00151ddb7f","silla":"5fc10a58bfbb660010dcc165","dias":1,"periodoinicio":"2022-02-13T06:00:00.000Z","periodofin":"2022-02-28T06:00:00.000Z","__v":0,"createdAt":"2021-04-11T18:13:18.681Z","updatedAt":"2021-04-27T18:13:18.681Z"}              
            ],
            "periodoinicio":"2022-02-13T06:00:00.000Z",
            "periodofin":"2022-02-28T06:00:00.000Z"
          }
        ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(14);
      done();
    });

    it('Debe retornar 14 dias, si se ausento del 13 de febrero al 28 de febrero en periodo de 30 dias', function (done) {

      let start = '2022-08-01';
      let end = '2022-08-31';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
        [
              {
                "fechainicio": "2022-08-15T06:00:00.000Z",
                "fechafin": "2022-08-30T00:00:00.000Z",
                "dias": 15,
                "motivoausencia": {
                  "_id": "614d3c2b4d4c85001287d10a",
                  "ausencias": [],
                  "deleted": false,
                  "nombre": "Suspensión IGSS / Enfermedad común",
                  "tipomotivoausencia": "suspension",
                  "modifiedBy": {
                    "id": "d98cd6b4-57f7-11ea-8328-0e342745a55e"
                  },
                  "createdAt": "2021-09-24T02:47:07.732Z",
                  "updatedAt": "2021-10-12T01:08:15.422Z",
                  "__v": 0
                },
                "septimo": false,
                "estadoausencia": "5b0c3d9cb673d550a5829299",
                "persona": "626a4a062b67df59d9f0b262",
                "tipoausencia": "5ad5156c5dd17f0001ff0e15",
                "silla": "626a50d42b67df59d9f0b2a9",
                "detalle": [
                  {
                    "_id": "630e90b8a1bc7a001264c338",
                    "logsestadopersona": [],
                    "deleted": false,
                    "tipoausencia": "5ad5156c5dd17f0001ff0e15",
                    "motivoausencia": {
                      "_id": "614d3c2b4d4c85001287d10a",
                      "ausencias": [],
                      "deleted": false,
                      "nombre": "Suspensión IGSS / Enfermedad común",
                      "tipomotivoausencia": "suspension",
                      "modifiedBy": {
                        "id": "d98cd6b4-57f7-11ea-8328-0e342745a55e"
                      },
                      "createdAt": "2021-09-24T02:47:07.732Z",
                      "updatedAt": "2021-10-12T01:08:15.422Z",
                      "__v": 0
                    },
                    "septimo": false,
                    "fechainicio": "2022-08-18T00:00:00.000Z",
                    "fechafin": "2022-08-18T00:00:00.000Z",
                    "estadoausencia": "5b0c3d9cb673d550a5829299",
                    "persona": "626a4a062b67df59d9f0b262",
                    "silla": "626a50d42b67df59d9f0b2a9",
                    "dias": 1,
                    "periodoinicio": "2022-08-15T06:00:00.000Z",
                    "periodofin": "2022-08-30T12:00:00.000Z",
                    "__v": 0,
                    "createdAt": "2022-08-30T22:35:36.296Z",
                    "updatedAt": "2022-08-30T22:35:36.296Z"
                  },
                  {
                    "_id": "630e90b8a1bc7a001264c339",
                    "logsestadopersona": [],
                    "deleted": false,
                    "tipoausencia": "5ad5156c5dd17f0001ff0e15",
                    "motivoausencia": {
                      "_id": "614d3c2b4d4c85001287d10a",
                      "ausencias": [],
                      "deleted": false,
                      "nombre": "Suspensión IGSS / Enfermedad común",
                      "tipomotivoausencia": "suspension",
                      "modifiedBy": {
                        "id": "d98cd6b4-57f7-11ea-8328-0e342745a55e"
                      },
                      "createdAt": "2021-09-24T02:47:07.732Z",
                      "updatedAt": "2021-10-12T01:08:15.422Z",
                      "__v": 0
                    },
                    "septimo": false,
                    "fechainicio": "2022-08-19T00:00:00.000Z",
                    "fechafin": "2022-08-19T00:00:00.000Z",
                    "estadoausencia": "5b0c3d9cb673d550a5829299",
                    "persona": "626a4a062b67df59d9f0b262",
                    "silla": "626a50d42b67df59d9f0b2a9",
                    "dias": 1,
                    "periodoinicio": "2022-08-15T06:00:00.000Z",
                    "periodofin": "2022-08-30T12:00:00.000Z",
                    "__v": 0,
                    "createdAt": "2022-08-30T22:35:36.296Z",
                    "updatedAt": "2022-08-30T22:35:36.296Z"
                  },
                  {
                    "_id": "630e90b8a1bc7a001264c33a",
                    "logsestadopersona": [],
                    "deleted": false,
                    "tipoausencia": "5ad5156c5dd17f0001ff0e15",
                    "motivoausencia": {
                      "_id": "614d3c2b4d4c85001287d10a",
                      "ausencias": [],
                      "deleted": false,
                      "nombre": "Suspensión IGSS / Enfermedad común",
                      "tipomotivoausencia": "suspension",
                      "modifiedBy": {
                        "id": "d98cd6b4-57f7-11ea-8328-0e342745a55e"
                      },
                      "createdAt": "2021-09-24T02:47:07.732Z",
                      "updatedAt": "2021-10-12T01:08:15.422Z",
                      "__v": 0
                    },
                    "septimo": false,
                    "fechainicio": "2022-08-20T00:00:00.000Z",
                    "fechafin": "2022-08-20T00:00:00.000Z",
                    "estadoausencia": "5b0c3d9cb673d550a5829299",
                    "persona": "626a4a062b67df59d9f0b262",
                    "silla": "626a50d42b67df59d9f0b2a9",
                    "dias": 1,
                    "periodoinicio": "2022-08-15T06:00:00.000Z",
                    "periodofin": "2022-08-30T12:00:00.000Z",
                    "__v": 0,
                    "createdAt": "2022-08-30T22:35:36.296Z",
                    "updatedAt": "2022-08-30T22:35:36.296Z"
                  },
                  {
                    "_id": "630e90b8a1bc7a001264c33b",
                    "logsestadopersona": [],
                    "deleted": false,
                    "tipoausencia": "5ad5156c5dd17f0001ff0e15",
                    "motivoausencia": {
                      "_id": "614d3c2b4d4c85001287d10a",
                      "ausencias": [],
                      "deleted": false,
                      "nombre": "Suspensión IGSS / Enfermedad común",
                      "tipomotivoausencia": "suspension",
                      "modifiedBy": {
                        "id": "d98cd6b4-57f7-11ea-8328-0e342745a55e"
                      },
                      "createdAt": "2021-09-24T02:47:07.732Z",
                      "updatedAt": "2021-10-12T01:08:15.422Z",
                      "__v": 0
                    },
                    "septimo": false,
                    "fechainicio": "2022-08-21T00:00:00.000Z",
                    "fechafin": "2022-08-21T00:00:00.000Z",
                    "estadoausencia": "5b0c3d9cb673d550a5829299",
                    "persona": "626a4a062b67df59d9f0b262",
                    "silla": "626a50d42b67df59d9f0b2a9",
                    "dias": 1,
                    "periodoinicio": "2022-08-15T06:00:00.000Z",
                    "periodofin": "2022-08-30T12:00:00.000Z",
                    "__v": 0,
                    "createdAt": "2022-08-30T22:35:36.297Z",
                    "updatedAt": "2022-08-30T22:35:36.297Z"
                  },
                  {
                    "_id": "630e90b8a1bc7a001264c33c",
                    "logsestadopersona": [],
                    "deleted": false,
                    "tipoausencia": "5ad5156c5dd17f0001ff0e15",
                    "motivoausencia": {
                      "_id": "614d3c2b4d4c85001287d10a",
                      "ausencias": [],
                      "deleted": false,
                      "nombre": "Suspensión IGSS / Enfermedad común",
                      "tipomotivoausencia": "suspension",
                      "modifiedBy": {
                        "id": "d98cd6b4-57f7-11ea-8328-0e342745a55e"
                      },
                      "createdAt": "2021-09-24T02:47:07.732Z",
                      "updatedAt": "2021-10-12T01:08:15.422Z",
                      "__v": 0
                    },
                    "septimo": false,
                    "fechainicio": "2022-08-22T00:00:00.000Z",
                    "fechafin": "2022-08-22T00:00:00.000Z",
                    "estadoausencia": "5b0c3d9cb673d550a5829299",
                    "persona": "626a4a062b67df59d9f0b262",
                    "silla": "626a50d42b67df59d9f0b2a9",
                    "dias": 1,
                    "periodoinicio": "2022-08-15T06:00:00.000Z",
                    "periodofin": "2022-08-30T12:00:00.000Z",
                    "__v": 0,
                    "createdAt": "2022-08-30T22:35:36.297Z",
                    "updatedAt": "2022-08-30T22:35:36.297Z"
                  },
                  {
                    "_id": "630e90b8a1bc7a001264c33d",
                    "logsestadopersona": [],
                    "deleted": false,
                    "tipoausencia": "5ad5156c5dd17f0001ff0e15",
                    "motivoausencia": {
                      "_id": "614d3c2b4d4c85001287d10a",
                      "ausencias": [],
                      "deleted": false,
                      "nombre": "Suspensión IGSS / Enfermedad común",
                      "tipomotivoausencia": "suspension",
                      "modifiedBy": {
                        "id": "d98cd6b4-57f7-11ea-8328-0e342745a55e"
                      },
                      "createdAt": "2021-09-24T02:47:07.732Z",
                      "updatedAt": "2021-10-12T01:08:15.422Z",
                      "__v": 0
                    },
                    "septimo": false,
                    "fechainicio": "2022-08-25T00:00:00.000Z",
                    "fechafin": "2022-08-25T00:00:00.000Z",
                    "estadoausencia": "5b0c3d9cb673d550a5829299",
                    "persona": "626a4a062b67df59d9f0b262",
                    "silla": "626a50d42b67df59d9f0b2a9",
                    "dias": 1,
                    "periodoinicio": "2022-08-15T06:00:00.000Z",
                    "periodofin": "2022-08-30T12:00:00.000Z",
                    "__v": 0,
                    "createdAt": "2022-08-30T22:35:36.297Z",
                    "updatedAt": "2022-08-30T22:35:36.297Z"
                  },
                  {
                    "_id": "630e90b8a1bc7a001264c33e",
                    "logsestadopersona": [],
                    "deleted": false,
                    "tipoausencia": "5ad5156c5dd17f0001ff0e15",
                    "motivoausencia": {
                      "_id": "614d3c2b4d4c85001287d10a",
                      "ausencias": [],
                      "deleted": false,
                      "nombre": "Suspensión IGSS / Enfermedad común",
                      "tipomotivoausencia": "suspension",
                      "modifiedBy": {
                        "id": "d98cd6b4-57f7-11ea-8328-0e342745a55e"
                      },
                      "createdAt": "2021-09-24T02:47:07.732Z",
                      "updatedAt": "2021-10-12T01:08:15.422Z",
                      "__v": 0
                    },
                    "septimo": false,
                    "fechainicio": "2022-08-26T00:00:00.000Z",
                    "fechafin": "2022-08-26T00:00:00.000Z",
                    "estadoausencia": "5b0c3d9cb673d550a5829299",
                    "persona": "626a4a062b67df59d9f0b262",
                    "silla": "626a50d42b67df59d9f0b2a9",
                    "dias": 1,
                    "periodoinicio": "2022-08-15T06:00:00.000Z",
                    "periodofin": "2022-08-30T12:00:00.000Z",
                    "__v": 0,
                    "createdAt": "2022-08-30T22:35:36.297Z",
                    "updatedAt": "2022-08-30T22:35:36.297Z"
                  },
                  {
                    "_id": "630e90b8a1bc7a001264c33f",
                    "logsestadopersona": [],
                    "deleted": false,
                    "tipoausencia": "5ad5156c5dd17f0001ff0e15",
                    "motivoausencia": {
                      "_id": "614d3c2b4d4c85001287d10a",
                      "ausencias": [],
                      "deleted": false,
                      "nombre": "Suspensión IGSS / Enfermedad común",
                      "tipomotivoausencia": "suspension",
                      "modifiedBy": {
                        "id": "d98cd6b4-57f7-11ea-8328-0e342745a55e"
                      },
                      "createdAt": "2021-09-24T02:47:07.732Z",
                      "updatedAt": "2021-10-12T01:08:15.422Z",
                      "__v": 0
                    },
                    "septimo": false,
                    "fechainicio": "2022-08-27T00:00:00.000Z",
                    "fechafin": "2022-08-27T00:00:00.000Z",
                    "estadoausencia": "5b0c3d9cb673d550a5829299",
                    "persona": "626a4a062b67df59d9f0b262",
                    "silla": "626a50d42b67df59d9f0b2a9",
                    "dias": 1,
                    "periodoinicio": "2022-08-15T06:00:00.000Z",
                    "periodofin": "2022-08-30T12:00:00.000Z",
                    "__v": 0,
                    "createdAt": "2022-08-30T22:35:36.297Z",
                    "updatedAt": "2022-08-30T22:35:36.297Z"
                  },
                  {
                    "_id": "630e90b8a1bc7a001264c340",
                    "logsestadopersona": [],
                    "deleted": false,
                    "tipoausencia": "5ad5156c5dd17f0001ff0e15",
                    "motivoausencia": {
                      "_id": "614d3c2b4d4c85001287d10a",
                      "ausencias": [],
                      "deleted": false,
                      "nombre": "Suspensión IGSS / Enfermedad común",
                      "tipomotivoausencia": "suspension",
                      "modifiedBy": {
                        "id": "d98cd6b4-57f7-11ea-8328-0e342745a55e"
                      },
                      "createdAt": "2021-09-24T02:47:07.732Z",
                      "updatedAt": "2021-10-12T01:08:15.422Z",
                      "__v": 0
                    },
                    "septimo": false,
                    "fechainicio": "2022-08-28T00:00:00.000Z",
                    "fechafin": "2022-08-28T00:00:00.000Z",
                    "estadoausencia": "5b0c3d9cb673d550a5829299",
                    "persona": "626a4a062b67df59d9f0b262",
                    "silla": "626a50d42b67df59d9f0b2a9",
                    "dias": 1,
                    "periodoinicio": "2022-08-15T06:00:00.000Z",
                    "periodofin": "2022-08-30T12:00:00.000Z",
                    "__v": 0,
                    "createdAt": "2022-08-30T22:35:36.297Z",
                    "updatedAt": "2022-08-30T22:35:36.297Z"
                  },
                  {
                    "_id": "630e90b8a1bc7a001264c341",
                    "logsestadopersona": [],
                    "deleted": false,
                    "tipoausencia": "5ad5156c5dd17f0001ff0e15",
                    "motivoausencia": {
                      "_id": "614d3c2b4d4c85001287d10a",
                      "ausencias": [],
                      "deleted": false,
                      "nombre": "Suspensión IGSS / Enfermedad común",
                      "tipomotivoausencia": "suspension",
                      "modifiedBy": {
                        "id": "d98cd6b4-57f7-11ea-8328-0e342745a55e"
                      },
                      "createdAt": "2021-09-24T02:47:07.732Z",
                      "updatedAt": "2021-10-12T01:08:15.422Z",
                      "__v": 0
                    },
                    "septimo": false,
                    "fechainicio": "2022-08-29T00:00:00.000Z",
                    "fechafin": "2022-08-29T00:00:00.000Z",
                    "estadoausencia": "5b0c3d9cb673d550a5829299",
                    "persona": "626a4a062b67df59d9f0b262",
                    "silla": "626a50d42b67df59d9f0b2a9",
                    "dias": 1,
                    "periodoinicio": "2022-08-15T06:00:00.000Z",
                    "periodofin": "2022-08-30T12:00:00.000Z",
                    "__v": 0,
                    "createdAt": "2022-08-30T22:35:36.297Z",
                    "updatedAt": "2022-08-30T22:35:36.297Z"
                  }
                ],
                "periodoinicio": "2022-08-15T06:00:00.000Z",
                "periodofin": "2022-08-30T12:00:00.000Z"
              }
        ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(14);
      done();
    });

    it('Debe retornar 29 dias, si fue dado de alta un 2 de noviembre y el periodo es del 2021-12-01 al 2022-11-30', function (done) {

      let start = '2021-12-01T00:00:00Z';
      let end = '2022-11-30T23:59:59Z';
      let periodoConceptoDias = 360;
      let periodosNoLaborados = 
      [
        {
          "fechainicio": "2021-12-01T00:00:00.000Z",
          "fechafin": "2022-11-01",
          "dias": 331
        }
      ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(29);
      done();
    });

    it('Debe retornar 7 dias, si fue dado de alta un 2 de noviembre y el periodo es del 2021-12-01 al 2022-11-30', function (done) {

      let start = '2022-12-01T00:00:00Z';
      let end = '2022-12-31T23:59:59Z';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
      [
        {
          "fechainicio": "2022-12-08T00:00:00.000Z",
          "fechafin": "2022-12-15T06:00:00.000Z",
          "dias": 8,
          "tipodia": 'ausencia'
        },
        {
          "fechainicio": "2022-12-08",
          "fechafin": "2022-12-31",
          "dias": 23,
          "tipodia": 'baja'
        }
      ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(7);
      done();
    });

    it('Debe retornar 15 dias, si fue dado de alta 10 de mes, 5 dias de vacaciones en cualquier momento del mes, 2 dias de suspensión 30 y 31', function (done) {

      let start = '2022-12-01T00:00:00Z';
      let end = '2022-12-31T23:59:59Z';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
      [
        {
          "fechainicio": "2022-12-01T00:00:00.000Z",
          "fechafin": "2022-12-09T06:00:00.000Z",
          "dias": 9,
          "tipodia": 'alta'
        },
        {
          "fechainicio": "2022-12-19T00:00:00.000Z",
          "fechafin": "2022-12-23T06:00:00.000Z",
          "dias": 5,
          "tipodia": 'permiso'
        },
        {
          "fechainicio": "2022-12-30T06:00:00.000Z",
          "fechafin": "2022-12-31T06:00:00.000Z",
          "dias": 2,
          "tipodia": 'ausencia'
        }
      ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(15);
      done();
    });

    it('Debe retornar 15 dias, si fue dado de baja el 15 de un mes de 31', function (done) {

      let start = '2022-12-01T00:00:00Z';
      let end = '2022-12-31T23:59:59Z';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
      [
        {
          "fechainicio": "2022-12-16T00:00:00.000Z",
          "fechafin": "2022-12-31T06:00:00.000Z",
          "dias": 16,
          "tipodia": 'baja'
        }
      ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(15);
      done();
    });

    it('Debe retornar 16 dias,  si hay suspensión 7 dias, si hay vacaciones 7 días', function (done) {

      let start = '2022-12-01T00:00:00Z';
      let end = '2022-12-31T23:59:59Z';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
      [
        {
          "fechainicio": "2022-12-04T00:00:00.000Z",
          "fechafin": "2022-12-10T06:00:00.000Z",
          "dias": 7,
          "tipodia": 'permiso'
        },
        {
          "fechainicio": "2022-12-25T00:00:00.000Z",
          "fechafin": "2022-12-31T06:00:00.000Z",
          "dias": 7,
          "tipodia": 'ausencia'
        }
      ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(16);
      done();
    });

    it('Debe retornar 1 dia, si fue dado de baja el 21 de un mes de 31 y suspension del 1 al 20', function (done) {

      let start = '2022-12-01T00:00:00Z';
      let end = '2022-12-31T23:59:59Z';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
      [
        {
          "fechainicio": "2022-12-01T00:00:00.000Z",
          "fechafin": "2022-12-20T06:00:00.000Z",
          "dias": 21,
          "tipodia": 'ausencia'
        },
        {
          "fechainicio": "2022-12-22T00:00:00.000Z",
          "fechafin": "2022-12-31T06:00:00.000Z",
          "dias": 10,
          "tipodia": 'baja'
        }
      ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(1);
      done();
    });

    it('Debe retornar 1 dia, si fue dado de baja el 21 de un mes de 31 y suspension del 1 al 20', function (done) {

      let start = '2022-02-01T00:00:00Z';
      let end = '2022-02-28T23:59:59Z';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
      [
        {
          "fechainicio": "2022-02-01T00:00:00.000Z",
          "fechafin": "2022-02-09T06:00:00.000Z",
          "dias": 9,
          "tipodia": 'alta'
        },
        {
          "fechainicio": "2022-02-15T00:00:00.000Z",
          "fechafin": "2022-02-18T06:00:00.000Z",
          "dias": 4,
          "tipodia": 'permiso'
        },
        {
          "fechainicio": "2022-02-27T00:00:00.000Z",
          "fechafin": "2022-02-28T06:00:00.000Z",
          "dias": 2,
          "tipodia": 'ausencia'
        }
      ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(13);
      done();
    });
    
    it('Debe retornar 3 dia, si fue dado de alta el 10 de un mes de 31 y vacaciones del 13 al 15', function (done) {

      let start = '2022-12-10T00:00:00Z';
      let end = '2022-12-15T23:59:59Z';
      let periodoConceptoDias = 30;
      let periodosNoLaborados = 
      [
        {
          "fechainicio": "2022-12-13T00:00:00.000Z",
          "fechafin": "2022-12-13T00:00:00.000Z",
          "detalle": [
            {
              "esremunerado": false,
              "estadopermiso": "done",
              "fechainicio": "2022-12-13T00:00:00.000Z",
              "fechafin": "2022-12-13T00:00:00.000Z",
              "licencia": "vacaciones-guatemala",
              "tipodia": "permiso",
              "dias": 1
            }
          ]
        },
        {
          "fechainicio": "2022-12-14T00:00:00.000Z",
          "fechafin": "2022-12-14T00:00:00.000Z",
          "detalle": [
            {
              "esremunerado": false,
              "estadopermiso": "pending",
              "fechainicio": "2022-12-14T00:00:00.000Z",
              "fechafin": "2022-12-14T00:00:00.000Z",
              "licencia": "vacaciones-guatemala",
              "tipodia": "permiso",
              "dias": 1
            }
          ]
        },
        {
          "fechainicio": "2022-12-15T00:00:00.000Z",
          "fechafin": "2022-12-15T00:00:00.000Z",
          "detalle": [
            {
              "esremunerado": false,
              "estadopermiso": "pending",
              "fechainicio": "2022-12-15T00:00:00.000Z",
              "fechafin": "2022-12-15T00:00:00.000Z",
              "licencia": "vacaciones-guatemala",
              "tipodia": "permiso",
              "dias": 1
            }
          ]
        },
        {
          "fechainicio": "2022-12-01T00:00:00.000Z",
          "fechafin": "2022-12-09",
          "dias": 9,
          "tipodia": "alta"
        }
      ];

      let dias = AsistenciaService.contarDias(start,end,periodoConceptoDias,periodosNoLaborados);    

      expect(dias).to.equal(3);
      done();
    });

  });

  describe('transformarPeriodosAArray()', function() {
    it('Debe retornar array de dias apartir de un listado de periodos', function (done) {

        let periodosNoLaborados = [
          {
            fechainicio:'2021-01-01',
            fechafin: '2021-01-12',
            dias:12
          }
        ]

        let dias = AsistenciaService.transformarPeriodosAArray(periodosNoLaborados);    

        let expected = [
          '2021-01-01',
          '2021-01-02',
          '2021-01-03',
          '2021-01-04',
          '2021-01-05',
          '2021-01-06',
          '2021-01-07',
          '2021-01-08',
          '2021-01-09',
          '2021-01-10',
          '2021-01-11',
          '2021-01-12',
        ]
        expect(JSON.stringify(dias)).to.equal(JSON.stringify(expected));
        done();
    });
  });

  describe('transformarPeriodosAObjetoConTipodia()', function() {
    it('Debe retornar array de dias apartir de un listado de periodos', function (done) {

        let periodosNoLaborados = [
          {
            fechainicio:'2021-01-01',
            fechafin: '2021-01-12',
            dias: 12,
            tipodia: 'baja'
          }
        ]

        let dias = AsistenciaService.transformarPeriodosAObjetoConTipodia(periodosNoLaborados);    

        let expected = {
          '2021-01-01': 'baja',
          '2021-01-02': 'baja',
          '2021-01-03': 'baja',
          '2021-01-04': 'baja',
          '2021-01-05': 'baja',
          '2021-01-06': 'baja',
          '2021-01-07': 'baja',
          '2021-01-08': 'baja',
          '2021-01-09': 'baja',
          '2021-01-10': 'baja',
          '2021-01-11': 'baja',
          '2021-01-12': 'baja'
        }
        expect(JSON.stringify(dias)).to.equal(JSON.stringify(expected));
        done();
    });
  });

  describe('periodoNoLaboradoPrevioAlta()', function() {
    it('Debe retornar periodo de dias cuando alta fue dentro de rango de fechas', async function () {

      //Mock obtener fecha alta
      sandbox.stub(AltaRepository.prototype, "init").resolves(null);
      let stubAltaValue = {fecha:'2021-01-13'};
      const stubAlta = sandbox.stub(AltaRepository.prototype, "findOne").resolves(stubAltaValue);


      let dias = await AsistenciaService.periodoNoLaboradoPrevioAlta({}, '9121291291290', '2021-01-01', '2021-01-31');    

      let expected = [{
        fechainicio:'2021-01-01',
        fechafin: '2021-01-12',
        dias:12,
        tipodia: 'alta'
      }]

      expect(JSON.stringify(dias)).to.equal(JSON.stringify(expected));
    });

    it('Debe retornar periodo de dias cuando alta fue dentro de rango de fechas 2', async function () {

      //Mock obtener fecha alta
      sandbox.stub(AltaRepository.prototype, "init").resolves(null);
      let stubAltaValue = {fecha:'2021-04-05'};
      const stubAlta = sandbox.stub(AltaRepository.prototype, "findOne").resolves(stubAltaValue);


      let dias = await AsistenciaService.periodoNoLaboradoPrevioAlta({}, '9121291291290', '2020-07-01T00:00:00Z', '2021-06-30T23:59:59Z', 360);    

      let expected = [{
        fechainicio:'2020-07-01T00:00:00Z',
        fechafin: '2021-04-04',
        dias:274,
        tipodia: 'alta'
      }]

      expect(JSON.stringify(dias)).to.equal(JSON.stringify(expected));
    });

  });

  describe('periodoNoLaboradoPorBaja()', function() {
    it('Debe retornar periodo de dias cuando baja fue dentro de rango de fechas', async function () {

      let dias = await AsistenciaService.periodoNoLaboradoPorBaja('2021-01-25', '2021-01-01', '2021-01-31');    

      let expected = [{
        fechainicio:'2021-01-26',
        fechafin: '2021-01-31',
        dias:6,
        tipodia: 'baja'
      }]

      expect(JSON.stringify(dias)).to.equal(JSON.stringify(expected));
    });

    it('Debe retornar periodo de dias cuando baja fue dentro de rango de fechas con timezone -6', async function () {

      let dias = await AsistenciaService.periodoNoLaboradoPorBaja('2021-01-25T06:00:00', '2021-01-01', '2021-01-31');    

      let expected = [{
        fechainicio:'2021-01-26',
        fechafin: '2021-01-31',
        dias:6,
        tipodia: 'baja'
      }]

      expect(JSON.stringify(dias)).to.equal(JSON.stringify(expected));
    });
    
    it('Debe retornar periodo vacio de dias cuando baja no es definida', async function () {

      let dias = await AsistenciaService.periodoNoLaboradoPorBaja(null, '2021-01-01', '2021-01-31');    

      let expected = []

      expect(JSON.stringify(dias)).to.equal(JSON.stringify(expected));
    });

    it('Debe retornar periodo vacio de dias cuando baja es ultimo dia', async function () {

      let dias = await AsistenciaService.periodoNoLaboradoPorBaja('2021-02-28', '2021-02-01T00:00:00Z', '2021-02-28T23:59:59Z');    

      let expected = []

      expect(JSON.stringify(dias)).to.equal(JSON.stringify(expected));
    });

  });
});