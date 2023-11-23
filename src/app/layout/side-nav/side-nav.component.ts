import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '@core/config';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
    
    constructor(
        private readonly router: Router,
    ) {

    }

    goToDashboard() {
        this.router.navigate([AppConfig.routes.modules.dashboard]);
    }

    goToCustomers() {
        this.router.navigate([AppConfig.routes.modules.customers]);
    }
}
