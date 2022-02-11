import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { NotificationService } from '../components/notification/notification.service';


@Injectable()


export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notificationService: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status > 399 && error.status < 500) {
                    this.notificationService.notify(error.error.message, 'warn');
                } else if (error.status > 499 && error.status < 600) {
                    this.notificationService.notify(error.error.message, 'error');
                } else {
                    this.notificationService.notify(error.statusText, 'error');
                }

                
                // if (error.error.statusCode > 399 && error.error.statusCode < 500) {
                //     this.notificationService.notify(error.error.message, 'warn');
                // }
                // if (error.error.statusCode > 499 && error.error.statusCode < 600) {
                //     this.notificationService.notify(error.error.message, 'error');
                // }
                return throwError(error);
            })
        );
    }
    //  to be injected in app module ts
}

