import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { Observable } from "rxjs";

import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private _authService: AuthenticationService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if(!this._authService.isAuthenticated) {
      this._router.navigate(['home']);
      return false;
    }

    return true;
  }

}
