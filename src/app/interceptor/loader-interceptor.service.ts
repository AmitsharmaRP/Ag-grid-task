import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppService } from "../services/app.service";

@Injectable()

export class LoaderInterceptorService implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(private appService: AppService) { }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        // this.appService.isLoading.next(this.requests.length > 0);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req);
        this.appService.isLoading.next(true);

        return new Observable(observer => {
            const subscription = next.handle(req).subscribe({
                next: (event) => {
                    if (event instanceof HttpResponse) {
                        this.removeRequest(req);
                        observer.next(event);
                    }
                },
                error: (err) => {
                    this.removeRequest(req);
                    observer.error(err);
                },
                complete: () => {
                    this.removeRequest(req);
                    observer.complete();
                }
            });
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            }
        })
    }
}