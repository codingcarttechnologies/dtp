import { DeviceDetailsComponent } from './device-details/device-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";


import { AuthenticatedGuard } from "./authentication/authenticated.guard";


export let AppRoutes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'device-details/:deviceId',
    component: DeviceDetailsComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path:'users',
    component:UsersComponent,
    canActivate:[AuthenticatedGuard]
  },
  {
    path: '**',
    component: HomeComponent
  }
];
