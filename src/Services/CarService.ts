import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain(car: ICar | null) {
    if (car) {
      return new Car(
        {
          id: car.id,
          model: car.model,
          year: car.year,
          color: car.color,
          status: car.status,
          buyValue: car.buyValue,
          doorsQty: car.doorsQty,
          seatsQty: car.seatsQty,
        },
      );
    }
  }
  async register(obj : ICar) {
    // puxar a model
    const carODM = new CarODM();
    // registrar o carro
    const result = await carODM.create(obj);
    // criar um dominio de carro
    // retornar o dominio
    return this.createCarDomain(result);
  }

  async getAll() {
    const carODM = new CarODM();
    const result = await carODM.getAll();
    const list = result.map((car) => this.createCarDomain(car));
    return list;
  }
  async getById(id: string) {
    const carODM = new CarODM();
    const result = await carODM.getById(id);
    return this.createCarDomain(result);
  }

  async update(id: string, obj: ICar) {
    const carODM = new CarODM();
    const result = await carODM.update(id, obj);
    return this.createCarDomain(result);
  }
}