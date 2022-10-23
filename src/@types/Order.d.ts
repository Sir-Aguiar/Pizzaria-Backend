declare interface Locale {
  bairro: string;
  address: string;
  casa: string;
  reference: string;
  cep: string;
}

declare interface Client {
  name: string;
  phone: string;
  location: Locale;
}
declare interface EmployeeCredential {
  email:string;
  password:string;
}

declare interface Item {
  _id:string;
  name:string;
  price:number;
  image:string;
}
