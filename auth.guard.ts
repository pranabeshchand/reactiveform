import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AdminService } from '../services/admin.service';

import { Router } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private admin: AdminService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {
        return this.checkLogin();
    }

    checkLogin(): Observable<any> {
        console.log('hit auth success')
        return this.admin.checkLogin().map((response) => {
            // console.log('response------------>', response)
            if (response.code === 200) {
                return true;
            } else {
                this.router.navigate(['/admin-login'])
                return true;
            }
        });
    }
}