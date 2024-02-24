import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


import {AppComponent} from './app/app/app.component';
import {CharactersModule} from './app/characters/characters.module';
import {withInterceptorsFromDi, provideHttpClient} from '@angular/common/http';
import {AppRoutingModule} from './app/app/app-routing.module';
import {provideAnimations} from '@angular/platform-browser/animations';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {SharedModule} from './app/shared/shared.module';
import {DataService} from './app/app/services/data.service';
import {AuthService} from './app/app/services/auth.service';
import {APP_INITIALIZER, importProvidersFrom} from '@angular/core';
import {environment} from './environments/environment';
import Environment from "./environments/environment.interface";
import Auth from "./app/app/models/auth.model";

const init = (authService: AuthService, dataService: DataService) => {
    authService.refreshUser();
    dataService.init();
};


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(SharedModule, BrowserModule, AppRoutingModule, CharactersModule),
        {provide: Environment, useValue: environment},
        {provide: Auth, useValue: new Auth()},
        {provide: APP_INITIALIZER, useFactory: init, deps: [AuthService, DataService]},
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .catch(err => console.error(err));
