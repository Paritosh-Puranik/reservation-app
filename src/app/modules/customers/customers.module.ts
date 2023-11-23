import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        CustomersRoutingModule,
    ]
})
export class CustomersModule { }
