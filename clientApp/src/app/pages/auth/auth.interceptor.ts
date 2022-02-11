// this files serves as an interceptor to all http requests so as to verify users credentials
// sets header for all requests
// Checks Authentication, Authorization and roles

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';

import { AuthService } from '../../pages/auth/auth.service';
import { StorageService } from '../../service/storage.service';
import { NotificationService } from '../../components/notification/notification.service';



@Injectable()


export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private storageService: StorageService

    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {      
        const token = this.authService.getToken();
        const clonedToken = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            }
            // Below is authorization string from authservice
        });

        return next.handle(clonedToken);
    }
    //  to be injected into app module ts
}

