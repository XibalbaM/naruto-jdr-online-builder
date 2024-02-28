import {AppComponent} from './app/app/app.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {appRoutes} from './app/app/app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {DataService} from './app/app/services/data.service';
import {AuthService} from './app/app/services/auth.service';
import {APP_INITIALIZER, importProvidersFrom, isDevMode} from '@angular/core';
import {environment} from './environments/environment';
import Environment from "./environments/environment.interface";
import Auth from "./app/app/models/auth.model";
import {provideRouter} from "@angular/router";
import {NgxPopperjsModule} from "ngx-popperjs";
import {pipes} from "./app/pipes";
import {provideServiceWorker} from '@angular/service-worker';

const init = (authService: AuthService, dataService: DataService) => {
    return () => {
        authService.refreshUser();
        dataService.init();
    }
};

const dataProviders = [
    {provide: Environment, useValue: environment},
    {provide: Auth, useValue: new Auth()},
    {provide: APP_INITIALIZER, useFactory: init, deps: [AuthService, DataService], multi: true},
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
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        })
    ]
}).catch(err => console.error(err));