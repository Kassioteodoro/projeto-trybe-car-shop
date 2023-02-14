export default interface IVehicle {
  id?: string,
  model: string,
  year: number,
  color: string,
  status?: boolean | string | undefined,
  buyValue: number,
}