import IVehicle from './IVehicle';

export default interface ICar extends IVehicle {
  category: ('Street' | 'Custom' | 'Trail'),
  engineCapacity: number,
}