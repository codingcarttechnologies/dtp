import { Injectable } from '@angular/core';
import {ToastyService, ToastOptions} from "ng2-toasty";

@Injectable()
export class EventReportingService {

  constructor(private _toasty: ToastyService) { }

  public report(title: string, message: string) {
    let toastOptions: ToastOptions = {
      title: title,
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'bootstrap'
    };

    this._toasty.error(toastOptions);
  }

  public success(title: string, message: string) {
    let toastOptions: ToastOptions = {
      title: title,
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'bootstrap'
    };

    this._toasty.success(toastOptions);
  }

}
