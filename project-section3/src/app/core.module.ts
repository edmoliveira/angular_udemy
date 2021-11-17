import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthInterceptorService } from "./shared/auth-interceptor.service";

@NgModule({
    providers: [
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
})
export class CoreModule {}