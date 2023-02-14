import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async register() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    const newMotorcycle = await this.service.register(motorcycle);
    
    return this.res.status(201).json(newMotorcycle);
  }

  public async getAll() {
    const list = await this.service.getAll();
    return this.res.status(200).json(list);
  }
    
  public async getById() {
    try {
      const car = await this.service.getById(this.req.params.id);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    try {
      const motorcycle: IMotorcycle = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status || false,
        buyValue: this.req.body.buyValue,
        category: this.req.body.category,
        engineCapacity: this.req.body.engineCapacity,
      };
      const updateMotorcycle = await this.service.update(this.req.params.id, motorcycle);
      
      return this.res.status(200).json(updateMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}