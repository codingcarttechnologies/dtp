import {AddressModel} from "./adrdress.model";
import {ProfilesModel} from "./profiles.model";
import {DeviceDetailsModel} from "./device.details.model";

export class DeviceEditModel {
  id: string;
  profile: ProfilesModel;
  organization: string;
  modser: string;
  prodser: string;
  custname: string;
  address: AddressModel;
  email: string;
  phone: string;
  modelname: string;
  modelnumber: string;
  sensorNetwork: string;
  sendSms: boolean;
  sendEmail: boolean;
  imageURL: string;

  constructor() {
    this.address = new AddressModel();
    this.sensorNetwork = 'false';
  }

  public fromDevice(dbdevice: DeviceDetailsModel) {
    this.id = dbdevice.id;
    this.organization = dbdevice.organization;
    this.modser = dbdevice.serialNumber;
    this.prodser = dbdevice.productSerialNumber;
    this.custname = dbdevice.name;
    this.address = dbdevice.address;
    this.email = dbdevice.email;
    this.phone = dbdevice.phoneNumber;
    this.sensorNetwork = 'false';
    this.modelname = dbdevice.modelName;
    this.modelnumber = dbdevice.modelNumber;
    this.sendSms = dbdevice.sendSms;
    this.sendEmail = dbdevice.sendEmail;
    this.imageURL = dbdevice.imageURL;

    if(!this.address) {
      this.address = new AddressModel();
    }

    this.profile = new ProfilesModel();
    this.profile.systemType = dbdevice.systemType;
    this.profile.calculations = dbdevice.calculations;
    this.profile.sensors = dbdevice.sensors;
    this.profile.setPoints = dbdevice.setPoints;
    this.profile.uiSensors.fromReadings(dbdevice.sensors);
  }

  public toDevice(dbdevice: DeviceDetailsModel) {
    dbdevice.organization = this.organization;
    dbdevice.serialNumber = this.modser;
    dbdevice.productSerialNumber = this.prodser;
    dbdevice.name = this.custname;
    dbdevice.address = this.address;
    dbdevice.email = this.email;
    dbdevice.phoneNumber = this.phone;
    dbdevice.modelName = this.modelname;
    dbdevice.modelNumber = this.modelnumber;
    dbdevice.sendSms = this.sendSms;
    dbdevice.sendEmail = this.sendEmail;
    dbdevice.imageURL = this.imageURL;
  }
}
