import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const hondaModel1 = 'Honda Cb 600f Hornet';

describe('testando as funcionalidades de MotorcycleService', function () {
  const returnValueOne: Motorcycle = new Motorcycle({
    id: '6348513f34c397abcad040b2',
    model: hondaModel1,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  });
  describe('É possivel cadastras uma moto', function () {
    it('com sucesso', async function () {
      // cenario
      const inputValue: IMotorcycle = {
        model: hondaModel1,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      sinon.stub(Model, 'create').resolves(returnValueOne);

      // execuçao
      const service = new MotorcycleService();
      const result = await service.register(inputValue);
    
      // teste
      expect(result).to.be.deep.equal(returnValueOne);
    });
  });
  describe('É possivel listar as motos da collection motorcycles', function () {
    const idValid = '6348513f34c397abcad040b2';
    const idNotFoundValid = '1111222233330000ffffcccc';
    const idInvalid = '634852326b35b5XX';

    const returnValueAll: Motorcycle[] = [new Motorcycle({
      id: '634852326b35b59438fbea2f',
      model: hondaModel1,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    }),
    new Motorcycle({
      id: '634852326b35b59438fbea31',
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    }),
    ];

    it('e possivel listar todas as motos', async function () {
      // cenario
      const model = sinon.stub(Model, 'find').resolves(returnValueAll);
      // execução
      const service = new MotorcycleService();
      const result = await service.getAll();
      // teste
      expect(model.calledOnce).to.be.equal(true);
      expect(result).to.be.deep.equal(returnValueAll);
    });
    it('e possivel listar uma moto em especifico', async function () {
      // cenario
      const model = sinon.stub(Model, 'findOne').resolves(returnValueOne);
      // execução
      const service = new MotorcycleService();
      const result = await service.getById(idValid);
      // teste
      expect(model.calledOnce).to.be.equal(true);
      expect(result).to.be.deep.equal(returnValueOne);
    });
    it(' nao e possivel listar uma moto que nao exista', async function () {
      // cenario
      sinon.stub(Model, 'findOne').resolves(undefined);
      // execução
      try {
        const service = new MotorcycleService();
        await service.getById(idNotFoundValid);
      } catch (error) {
        // teste
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      }
    });
    it('nao e possivel listar uma moto com id invalido', async function () {
      // cenario
      sinon.stub(Model, 'findOne').resolves(undefined);
      // execução
      try {
        const service = new MotorcycleService();
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