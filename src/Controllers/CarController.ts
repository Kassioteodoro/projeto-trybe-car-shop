import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async register() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    const newCar = await this.service.register(car);
    
    return this.res.status(201).json(newCar);
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
    const { params: { id }, body } = this.req;
    const car: ICar = {
      model: body.model,
      year: body.year,
      color: body.color,
      status: body.status || false,
      buyValue: body.buyValue,
      doorsQty: body.doorsQty,
      seatsQty: body.seatsQty,
    };
    try {
      const updateCar = await this.service.update(id, car);
      return this.res.status(200).json(updateCar);
    } catch (error) {
      this.next(error);
    }
  }
}