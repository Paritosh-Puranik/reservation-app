import { environment } from 'src/environments/environment';

interface AppConfig {
    endPoints: any;
    routes: any;
    baseUrl: string;
}

export const AppConfig: AppConfig = {
    endPoints: {
        reservations: {
            getAllReservation: 'all-betrieb'
        },
    },
    routes: {
        modules: {
            dashboard: 'dashboard',
            customers: 'customers'
        }
    },
    baseUrl: environment.apiUrl,
};
