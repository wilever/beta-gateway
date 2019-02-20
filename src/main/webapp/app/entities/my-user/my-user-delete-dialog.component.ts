import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMyUser } from 'app/shared/model/my-user.model';
import { MyUserService } from './my-user.service';

@Component({
    selector: 'jhi-my-user-delete-dialog',
    templateUrl: './my-user-delete-dialog.component.html'
})
export class MyUserDeleteDialogComponent {
    myUser: IMyUser;

    constructor(protected myUserService: MyUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.myUserService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'myUserListModification',
                content: 'Deleted an myUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-my-user-delete-popup',
    template: ''
})
export class MyUserDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ myUser }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MyUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.myUser = myUser;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/my-user', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/my-user', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
