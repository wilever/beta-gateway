/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BetaGatewayTestModule } from '../../../test.module';
import { MyUserDetailComponent } from 'app/entities/my-user/my-user-detail.component';
import { MyUser } from 'app/shared/model/my-user.model';

describe('Component Tests', () => {
    describe('MyUser Management Detail Component', () => {
        let comp: MyUserDetailComponent;
        let fixture: ComponentFixture<MyUserDetailComponent>;
        const route = ({ data: of({ myUser: new MyUser(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BetaGatewayTestModule],
                declarations: [MyUserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MyUserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MyUserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.myUser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
