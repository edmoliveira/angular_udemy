import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticantionService } from "./authenticaton.service";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { throwError } from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authenticantionService: AuthenticantionService, private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let token = '';

        if(req.url.indexOf('https://localhost:44370') > -1){
          token = this.authenticantionService.getTokenHub();
        }
        else {
          token = this.authenticantionService.getToken();
        }

        const modifiedRequest = req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + token)
        });

        return next.handle(modifiedRequest).pipe(catchError(err => {
                if (this.router.url !== '/auth' && err instanceof HttpErrorResponse) {

                    if (err.status === 401 || err.status === 403) {
                        this.authenticantionService.deleteToken();
                    }
                }

                return throwError(() => err);
            })
        );
    }
}
