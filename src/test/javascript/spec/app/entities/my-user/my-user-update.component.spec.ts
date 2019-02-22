/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BetaGatewayTestModule } from '../../../test.module';
import { MyUserUpdateComponent } from 'app/entities/my-user/my-user-update.component';
import { MyUserService } from 'app/entities/my-user/my-user.service';
import { MyUser } from 'app/shared/model/my-user.model';

describe('Component Tests', () => {
    describe('MyUser Management Update Component', () => {
        let comp: MyUserUpdateComponent;
        let fixture: ComponentFixture<MyUserUpdateComponent>;
        let service: MyUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BetaGatewayTestModule],
                declarations: [MyUserUpdateComponent]
            })
                .overrideTemplate(MyUserUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MyUserUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MyUserService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MyUser(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.myUser = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MyUser();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.myUser = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
