import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from './customer.service';
import { IMyUser } from 'app/shared/model/my-user.model';
import { MyUserService } from 'app/entities/my-user';

@Component({
    selector: 'jhi-customer-update',
    templateUrl: './customer-update.component.html'
})
export class CustomerUpdateComponent implements OnInit {
    customer: ICustomer;
    isSaving: boolean;

    users: IMyUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected customerService: CustomerService,
        protected myUserService: MyUserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customer }) => {
            this.customer = customer;
        });
        this.myUserService
            .query({ filter: 'customer-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IMyUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMyUser[]>) => response.body)
            )
            .subscribe(
                (res: IMyUser[]) => {
                    if (!this.customer.user || !this.customer.user.id) {
                        this.users = res;
                    } else {
                        this.myUserService
                            .find(this.customer.user.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IMyUser>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IMyUser>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IMyUser) => (this.users = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(this.customerService.create(this.customer));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>) {
        result.subscribe((res: HttpResponse<ICustomer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMyUserById(index: number, item: IMyUser) {
        return item.id;
    }
}
