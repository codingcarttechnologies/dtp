import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { CommonService } from './common-services/CommonService';

import { AppRoutes } from './app.routes';

import { EventReportingService } from './shared/event-reporting-service/event-reporting.service';
import { DevicesService } from './telemetry-services/devices.service';
import { EventsService } from './telemetry-services/events.service';
import { GroupFiltersService } from './telemetry-services/filtering/group-filters.service';
import { ProfilesService } from './telemetry-services/profiles.service';

import { nvD3 } from './shared/nvd3/nvd3.component';





import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecentEventsComponent } from './dashboard/recent-events/recent-events.component';
import { DeviceOverviewComponent } from './dashboard/device-overview/device-overview.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { DashboardSidenavComponent } from './dashboard/dashboard-sidenav/dashboard-sidenav.component';
import { LoadingComponent } from './components/loading/loading.component';
import { EventDetailsModalComponent } from './dashboard/recent-events/event-details-modal/event-details-modal.component';
import { DeviceListComponent } from './dashboard/device-overview/device-list/device-list.component';
import { DeviceGridComponent } from './dashboard/device-overview/device-grid/device-grid.component';
import { DeviceGroupComponent } from './dashboard/device-overview/device-group/device-group.component';
import { StatusComponent } from './dashboard/analytics/charts/status/status.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { DeviceLineChartComponent } from './components/device-line-chart/device-line-chart.component';
import { ManageRulesModalComponent } from './device-details/manage-rules-modal/manage-rules-modal.component';
import { FilterTreeComponent } from './components/filter-tree/filter-tree.component';
import { SensorComponent } from './device-details/sensor/sensor.component';
import { CalculationModalComponent } from './device-details/manage-rules-modal/calculation-modal/calculation-modal.component';
import { ComparisonOperatorPipe } from './shared/pipes/comparison-operator.pipe';
import { SetPointModalComponent } from './device-details/manage-rules-modal/set-point-modal/set-point-modal.component';
import { ManageSensorsModalComponent } from './device-details/manage-sensors-modal/manage-sensors-modal.component';
import { ManageProfilesModalComponent } from './dashboard/device-overview/manage-profiles-modal/manage-profiles-modal.component';
import { EditProfileModalComponent } from './dashboard/device-overview/edit-profile-modal/edit-profile-modal.component';
import { AddDeviceModalComponent } from './dashboard/device-overview/add-device-modal/add-device-modal.component';
import { EditDeviceModalComponent } from './device-details/edit-device-modal/edit-device-modal.component';
import { ValidateEmailDirective } from './shared/directives/validate-email.directive';
import { UptimeComponent } from './dashboard/analytics/charts/uptime/uptime.component';
import { ActiveIssuesComponent } from './dashboard/analytics/charts/active-issues/active-issues.component';
import { EditSensorNetworkComponent } from './components/edit-sensor-network/edit-sensor-network.component';
import { HomeComponent } from './home/home.component';
import {AuthenticationService} from "./authentication/authentication.service";
import {AuthenticatedGuard} from "./authentication/authenticated.guard";
import { LoginModalComponent } from './authentication/login-modal/login-modal.component';
import { EditUserProfileModalComponent } from './authentication/edit-user-profile-modal/edit-user-profile-modal.component';
import { ChangePasswordModalComponent } from './authentication/change-password-modal/change-password-modal.component';
import {AuthHttp, AuthConfig} from "./shared/jwt/auth.http.service";
import { ForgotPasswordModalComponent } from './authentication/forgot-password-modal/forgot-password-modal.component';
import { ResetPasswordModalComponent } from './authentication/reset-password-modal/reset-password-modal.component';
import {ToastyModule} from "ng2-toasty";
import { ExportModalComponent } from './device-details/export-modal/export-modal.component';
import { SocketStateComponent } from './shared/socket-state/socket-state.component';
import {SocketsService, SignalrWindow} from "./telemetry-services/realtime/sockets.service";
import { UploadImageComponent } from './shared/upload-image/upload-image.component';
import { UserManagementService } from "./user-management/user-management.service";
import { InlineEdit } from "./components/inline-edit/inline-edit.component";
import { UsersComponent } from "./users/users.component";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'dexen_token',
    noClientCheck: true,
    tokenGetter: (() => localStorage.getItem('dexen_token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}


declare var require: any;

export function highchartsFactory() {
    const hc = require('highcharts');
    const dd = require('highcharts/modules/drilldown');
    dd(hc);
    return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    RecentEventsComponent,
    DeviceOverviewComponent,
    AnalyticsComponent,
    DashboardSidenavComponent,
    LoadingComponent,
    EventDetailsModalComponent,
    DeviceListComponent,
    DeviceGridComponent,
    DeviceGroupComponent,
    StatusComponent,
    DeviceDetailsComponent,
    DeviceLineChartComponent,
    ManageRulesModalComponent,
    FilterTreeComponent,
    SensorComponent,
    CalculationModalComponent,
    ComparisonOperatorPipe,
    SetPointModalComponent,
    ManageSensorsModalComponent,
    ManageProfilesModalComponent,
    EditProfileModalComponent,
    AddDeviceModalComponent,
    EditDeviceModalComponent,
    ValidateEmailDirective,
    nvD3,
    UptimeComponent,
    ActiveIssuesComponent,
    EditSensorNetworkComponent,
    HomeComponent,
    LoginModalComponent,
    EditUserProfileModalComponent,
    ChangePasswordModalComponent,
    ForgotPasswordModalComponent,
    ResetPasswordModalComponent,
    ExportModalComponent,
    SocketStateComponent,
    UploadImageComponent,
    InlineEdit,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    NgbModule.forRoot(),
    ChartModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    EventReportingService,
    AuthenticationService,
    AuthenticatedGuard,
    {provide: HighchartsStatic,useFactory: highchartsFactory},
    EventsService,
    DevicesService,
    GroupFiltersService,
    { provide: SignalrWindow, useValue: window },
    SocketsService,
    ProfilesService,
    UserManagementService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
