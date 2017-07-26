export class AddressModel {
  public street1: string;
  public street2: string;
  public city: string;
  public state: string;
  public country: string;
  public zip: string;

  constructor() {
    this.street1 = '';
    this.street2 = '';
    this.city = '';
    this.state = '';
    this.country = '';
    this.zip = '';
  }
}
