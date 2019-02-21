import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BetaGatewaySharedModule } from 'app/shared';
import {
    MyUserComponent,
    MyUserDetailComponent,
    MyUserUpdateComponent,
    MyUserDeletePopupComponent,
    MyUserDeleteDialogComponent,
    myUserRoute,
    myUserPopupRoute
} from './';

const ENTITY_STATES = [...myUserRoute, ...myUserPopupRoute];

@NgModule({
    imports: [BetaGatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MyUserComponent, MyUserDetailComponent, MyUserUpdateComponent, MyUserDeleteDialogComponent, MyUserDeletePopupComponent],
    entryComponents: [MyUserComponent, MyUserUpdateComponent, MyUserDeleteDialogComponent, MyUserDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BetaGatewayMyUserModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
