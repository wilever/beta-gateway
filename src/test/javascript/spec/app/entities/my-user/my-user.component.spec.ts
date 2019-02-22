/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BetaGatewayTestModule } from '../../../test.module';
import { MyUserComponent } from 'app/entities/my-user/my-user.component';
import { MyUserService } from 'app/entities/my-user/my-user.service';
import { MyUser } from 'app/shared/model/my-user.model';

describe('Component Tests', () => {
    describe('MyUser Management Component', () => {
        let comp: MyUserComponent;
        let fixture: ComponentFixture<MyUserComponent>;
        let service: MyUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BetaGatewayTestModule],
                declarations: [MyUserComponent],
                providers: []
            })
                .overrideTemplate(MyUserComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MyUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MyUserService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MyUser(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.myUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
