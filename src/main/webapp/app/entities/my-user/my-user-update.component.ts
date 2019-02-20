import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMyUser } from 'app/shared/model/my-user.model';
import { MyUserService } from './my-user.service';

@Component({
    selector: 'jhi-my-user-update',
    templateUrl: './my-user-update.component.html'
})
export class MyUserUpdateComponent implements OnInit {
    myUser: IMyUser;
    isSaving: boolean;

    constructor(protected myUserService: MyUserService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ myUser }) => {
            this.myUser = myUser;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.myUser.id !== undefined) {
            this.subscribeToSaveResponse(this.myUserService.update(this.myUser));
        } else {
            this.subscribeToSaveResponse(this.myUserService.create(this.myUser));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMyUser>>) {
        result.subscribe((res: HttpResponse<IMyUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
