import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDevice } from 'app/shared/model/device.model';
import { DeviceService } from './device.service';

@Component({
    selector: 'jhi-device-delete-dialog',
    templateUrl: './device-delete-dialog.component.html'
})
export class DeviceDeleteDialogComponent {
    device: IDevice;

    constructor(protected deviceService: DeviceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deviceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deviceListModification',
                content: 'Deleted an device'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-device-delete-popup',
    template: ''
})
export class DeviceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ device }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeviceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.device = device;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/device', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/device', { outlets: { popup: null } }]);
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
