import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain(car: ICar) {
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
}