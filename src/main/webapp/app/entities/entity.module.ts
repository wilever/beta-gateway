import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'customer',
                loadChildren: './customer/customer.module#BetaGatewayCustomerModule'
            },
            {
                path: 'my-user',
                loadChildren: './my-user/my-user.module#BetaGatewayMyUserModule'
            },
            {
                path: 'device',
                loadChildren: './device/device.module#BetaGatewayDeviceModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BetaGatewayEntityModule {}
