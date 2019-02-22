/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BetaGatewayTestModule } from '../../../test.module';
import { MyUserDeleteDialogComponent } from 'app/entities/my-user/my-user-delete-dialog.component';
import { MyUserService } from 'app/entities/my-user/my-user.service';

describe('Component Tests', () => {
    describe('MyUser Management Delete Component', () => {
        let comp: MyUserDeleteDialogComponent;
        let fixture: ComponentFixture<MyUserDeleteDialogComponent>;
        let service: MyUserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BetaGatewayTestModule],
                declarations: [MyUserDeleteDialogComponent]
            })
                .overrideTemplate(MyUserDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MyUserDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MyUserService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
