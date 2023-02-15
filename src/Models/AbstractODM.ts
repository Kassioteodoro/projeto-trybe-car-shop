import {
  Model,
  models,
  Schema,
  model,
  isValidObjectId,
} from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  private notFound(result: T | null) {
    if (!result && this.modelName === 'Car') throw Error('Car not found');
    if (!result && this.modelName === 'Motorcycle') throw Error('Motorcycle not found');
  }
  
  public async getById(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('Invalid mongo id');
    const result = await this.model.findOne({ _id });
    this.notFound(result);
    return result;
  }

  public async update(_id: string, obj: Partial<T>) {
    if (!isValidObjectId(_id)) throw Error('Invalid mongo id');
    await this.model.updateOne({ _id }, { ...obj });
    const result = await this.model.findOne({ _id });
    this.notFound(result);
    return result;
  }
}

export default AbstractODM;