import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('testando as funcionalidades de CarService', function () {
  describe('É possivel cadastras um carro', function () {
    it('com sucesso', async function () {
      // cenario
      const inputValue: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };

      const returnValue: Car = new Car({
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      });

      sinon.stub(Model, 'create').resolves(returnValue);

      // execuçao
      const service = new CarService();
      const result = await service.register(inputValue);
    
      // teste
      expect(result).to.be.deep.equal(returnValue);
    });
  });
  describe('É possivel listar os carros da collection cars', function () {
    const idValid = '6348513f34c397abcad040b2';
    const idNotFoundValid = '1111222233330000ffffcccc';
    const idInvalid = '634852326b35b5XX';

    const returnValueAll: Car[] = [new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    }),
    new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    }),
    ];

    const returnValueOne: Car = new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    it('e possivel listar todos os carros em cars', async function () {
      // cenario
      const model = sinon.stub(Model, 'find').resolves(returnValueAll);
      // execução
      const service = new CarService();
      const result = await service.getAll();
      // teste
      expect(model.calledOnce).to.be.equal(true);
      expect(result).to.be.deep.equal(returnValueAll);
    });
    it('e possivel listar um carro em especifico', async function () {
      // cenario
      const model = sinon.stub(Model, 'findOne').resolves(returnValueOne);
      // execução
      const service = new CarService();
      const result = await service.getById(idValid);
      // teste
      expect(model.calledOnce).to.be.equal(true);
      expect(result).to.be.deep.equal(returnValueOne);
    });
    it(' nao e possivel listar um carro que nao existe', async function () {
      // cenario
      sinon.stub(Model, 'findOne').resolves(undefined);
      // execução
      try {
        const service = new CarService();
        await service.getById(idNotFoundValid);
      } catch (error) {
        // teste
        expect((error as Error).message).to.be.equal('Car not found');
      }
    });
    it('nao e possivel listar um carro com id invalido', async function () {
      // cenario
      sinon.stub(Model, 'findOne').resolves(undefined);
      // execução
      try {
        const service = new CarService();
        await service.getById(idInvalid);
      } catch (error) {
        // teste
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});