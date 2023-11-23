import { Injectable } from '@angular/core';
import { AppConfig } from '@core/index';
import { Observable } from 'rxjs';
import { HttpService } from '../helpers';
import { IReservations } from '@shared/index';

@Injectable({
    providedIn: 'root'
})

export class ReservationsService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    getAllReservations(): Observable<IReservations[]> {
        return this.httpService.get(AppConfig.endPoints.reservations.getAllReservation);
    }
}
