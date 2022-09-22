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
