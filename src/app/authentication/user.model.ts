import { OemModel } from "../telemetry-services/models/oem.model";

export class UserModel {
  public password: string;
  public confirmPassword: string;

  public oem: OemModel;

  constructor(){
    this.oem = new OemModel();

    this.password = '';
    this.confirmPassword = '';
  }
}
