import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MyUser } from 'app/shared/model/my-user.model';
import { MyUserService } from './my-user.service';
import { MyUserComponent } from './my-user.component';
import { MyUserDetailComponent } from './my-user-detail.component';
import { MyUserUpdateComponent } from './my-user-update.component';
import { MyUserDeletePopupComponent } from './my-user-delete-dialog.component';
import { IMyUser } from 'app/shared/model/my-user.model';

@Injectable({ providedIn: 'root' })
export class MyUserResolve implements Resolve<IMyUser> {
    constructor(private service: MyUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMyUser> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MyUser>) => response.ok),
                map((myUser: HttpResponse<MyUser>) => myUser.body)
            );
        }
        return of(new MyUser());
    }
}

export const myUserRoute: Routes = [
    {
        path: '',
        component: MyUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'betaGatewayApp.myUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MyUserDetailComponent,
        resolve: {
            myUser: MyUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'betaGatewayApp.myUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MyUserUpdateComponent,
        resolve: {
            myUser: MyUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'betaGatewayApp.myUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MyUserUpdateComponent,
        resolve: {
            myUser: MyUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'betaGatewayApp.myUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const myUserPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MyUserDeletePopupComponent,
        resolve: {
            myUser: MyUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'betaGatewayApp.myUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
