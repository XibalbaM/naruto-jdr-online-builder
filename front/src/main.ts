import {AppComponent} from './app/app/app.component';
import {withInterceptorsFromDi, provideHttpClient} from '@angular/common/http';
import {appRoutes} from './app/app/app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {DataService} from './app/app/services/data.service';
import {AuthService} from './app/app/services/auth.service';
import {APP_INITIALIZER, importProvidersFrom} from '@angular/core';
import {environment} from './environments/environment';
import Environment from "./environments/environment.interface";
import Auth from "./app/app/models/auth.model";
import {provideRouter} from "@angular/router";
import {NgxPopperjsModule} from "ngx-popperjs";
import {pipes} from "./app/pipes";

const init = (authService: AuthService, dataService: DataService) => {
    authService.refreshUser();
    dataService.init();
};

const dataProviders = [
    {provide: Environment, useValue: environment},
    {provide: Auth, useValue: new Auth()},
    {provide: APP_INITIALIZER, useFactory: init, deps: [AuthService, DataService]},
];

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule),
        importProvidersFrom(NgxPopperjsModule.forRoot({})),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(appRoutes),
        pipes,
        dataProviders,
    ]
}).catch(err => console.error(err));