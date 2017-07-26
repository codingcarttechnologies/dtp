import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management/user-management.service';
import { UserManagementModel } from "../user-management/user.management.model";
import { InlineEdit } from "../components/inline-edit/inline-edit.component";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users:UserManagementModel[] = [];
  public Organization = [];

  constructor(private _UserManagementService: UserManagementService ) { }

    ngOnInit() {
      this._UserManagementService.getUsers(true)
      .subscribe((resUsers) => {
        this.users = <UserManagementModel[]>resUsers;
      });
      
      this._UserManagementService.getOrganizations()
      .subscribe((resOrganization) => {
        this.Organization = resOrganization;
      });
    }

    public deleteUser(user){
      if (confirm('Are you sure you want to delete this user?')) {
        let index: number = this.users.indexOf(user);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
        this._UserManagementService.delete(user);
      }
    }

    public approveUser(user){
      this.users.forEach(function(value){
        if(value.id==user.id){
          value.pending = false;
        }
      });
      this._UserManagementService.approve(user);
    }

    changeOemName(evt, user) {
      user.oemName = evt;
      this._UserManagementService.approve(user);
    }
}