// This file prevents non logged user from accessing some pages

import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { NavigationService } from '../service/navigation.service';
import { AuthService } from '../pages/auth/auth.service';

@Injectable()

export class AuthGuard implements CanLoad {
    constructor(
        private authService: AuthService,
        private navigationService: NavigationService,
    ) { }


    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        const isAuthenticated = this.authService.getIsAuthenticated();
        if (!isAuthenticated) {
            this.navigationService.goToLogin();
            return isAuthenticated;
        }
        return true;
    }

}
