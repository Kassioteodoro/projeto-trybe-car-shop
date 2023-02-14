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
});