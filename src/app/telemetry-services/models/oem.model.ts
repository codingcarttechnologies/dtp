import { AddressModel } from "./adrdress.model";

export class OemModel {
  public email: string;
  public name: string;
  public userName: string;
  public phoneNumber: string;
  public organization:string;

  public address: AddressModel;

  constructor() {
    this.address = new AddressModel();

    this.email = '';
    this.name = '';
    this.phoneNumber = '';
    this.userName = '';
    this.organization = '';
  }
}
