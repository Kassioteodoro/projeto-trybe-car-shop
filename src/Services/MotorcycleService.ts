import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null) {
    if (motorcycle) {
      return new Motorcycle(
        {
          id: motorcycle.id,
          model: motorcycle.model,
          year: motorcycle.year,
          color: motorcycle.color,
          status: motorcycle.status,
          buyValue: motorcycle.buyValue,
          category: motorcycle.category,
          engineCapacity: motorcycle.engineCapacity,
        },
      );
    }
  }
  async register(obj : IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.create(obj);
    return this.createMotorcycleDomain(result);
  }

  async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.getAll();
    const list = result.map((car) => this.createMotorcycleDomain(car));
    return list;
  }
  
  async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.getById(id);
    return this.createMotorcycleDomain(result);
  }

  async update(id: string, obj: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.update(id, obj);
    return this.createMotorcycleDomain(result);
  }
}