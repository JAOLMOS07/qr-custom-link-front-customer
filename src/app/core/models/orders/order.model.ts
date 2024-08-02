export class Order {
  id: string;
  productionOrder: string;
  date: Date;
  amountQr: number;
  amountAvailable: number;
  company: Company;
  constructor(
    id: string,
    productionOrder: string,
    date: Date,
    amountAvailable: number,
    amountQr: number,
    company: Company
  ) {
    this.id = id;
    this.company = company;
    this.productionOrder = productionOrder;
    this.date = date;
    this.amountAvailable = amountAvailable;
    this.amountQr = amountQr;
  }
}

export class Company {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
