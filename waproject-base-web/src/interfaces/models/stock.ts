export default interface IStock {
  id?: number;
  name: string;
  quantity: number;
  price: number;

  createdDate?: Date;
  updatedDate?: Date;
}
