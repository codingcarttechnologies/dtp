import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common-services/CommonService';
import {AuthenticationService} from "../authentication/authentication.service";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public error: string = '';
  public user: {Name:string,Email: string, Subject: string, Comment: string};
  public messageRes = false;
  public alert: {type:string,message:string};
  
  constructor(private commonService: CommonService ,private _authService: AuthenticationService) { }

  ngOnInit() {
    this.error = '';
    this.user = {Name:'',Email: '', Subject: '', Comment: ''};
  }

  public tryitnow(){
    let demouser = {email: 'dexentelemeterydemo@gmail.com', password: '1oTd#mo'};
    this.commonService.notifyOther({option: 'demo-user', value: demouser});
  }



  public sendMessage(user){
    this._authService.contactform(user)
      .catch(error => {
        this.error = 'Error saving profile information. Please check the data provided.';
        return ['error'];
      })
      .subscribe(result => {
        this.messageRes = true;
        if(result != 'error') {
            this.alert = { type:"success" , message:"Your message was sent successfully. Thanks"};     
        }else{
             this.alert = { type:"danger" , message:"Error , Please try again"}; 
        }

        this.ngOnInit();
            setTimeout(function() {
                this.messageRes = false;
        }.bind(this), 8000); 
      });
  }
}
