import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMyUser } from 'app/shared/model/my-user.model';

@Component({
    selector: 'jhi-my-user-detail',
    templateUrl: './my-user-detail.component.html'
})
export class MyUserDetailComponent implements OnInit {
    myUser: IMyUser;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ myUser }) => {
            this.myUser = myUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
