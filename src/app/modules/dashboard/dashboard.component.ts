import { Component, OnInit } from '@angular/core';
import { Base } from '@core/index';
import { IReservations, ReservationsService } from '@shared/index';
import Chart from 'chart.js/auto';
import { ChartDataset, ChartOptions } from 'chart.js';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends Base implements OnInit {

    reservationArray!: IReservations[];

    constructor( 
        private readonly reservationService: ReservationsService
    ) {
        super();
    }

    ngOnInit(): void {
       this.getAllReservations();
    }

    getAllReservations() {
        this.reservationService.getAllReservations()
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (user: IReservations[]) => {
                this.reservationArray = user;
                this.getStatus();
                this.getModeOfReservation();
                this.getMonthlyReservation();
            }
        })
    }

    getStatus() {
        let statusCanceledArray: number = 0;
        let statusConfirmedArray: number = 0;
        let statusFinishedArray: number = 0;
        this.reservationArray?.map((item) => {
            if(item?.status === 'canceled') {
                statusCanceledArray++
            } else {
                if(item?.status === 'finished') {
                    statusFinishedArray++
                } else {
                    if(item?.status === 'confirmed') {
                        statusConfirmedArray++
                    }
                }
            }
        })
        this.statusChart(statusCanceledArray, statusConfirmedArray, statusFinishedArray);
    }

    statusChart(statusCanceledArray: number, statusConfirmedArray: number, statusFinishedArray: number) {
        const chart = new Chart('status', {
            type: 'pie',
            data: {
                labels: [
                  'Canceled',
                  'Confirmed',
                  'Finished'
                ],
                datasets: [{
                  label: 'Reservation Status',
                  data: [statusCanceledArray, statusConfirmedArray, statusFinishedArray],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }]
              },
            options: {
                responsive: true,
                
            }
        })

    }

    getModeOfReservation() {
        let sourceManualArray: number = 0;
        let sourceOnlineArray: number = 0;
        this.reservationArray?.map((item) => {
            if(item?.source === 'manual') {
                sourceManualArray++
            } else if(item?.source === 'online') {
                sourceOnlineArray++
            }
        })
        this.sourceChart(sourceManualArray, sourceOnlineArray);
    }

    sourceChart(sourceManualArray: number, sourceOnlineArray: number) {
        const reservation = new Chart('reservation', {
            type: 'doughnut',
            data: {
                labels: [
                  'Manual',
                  'Online',
                ],
                datasets: [{
                  label: 'Mode of reservation',
                  data: [sourceManualArray, sourceOnlineArray],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }]
              },
            options: {
                responsive: true,
                
            }
        });
    }

    getMonthlyReservation() {
        let monthReservation: any = {};
        this.reservationArray?.map((item) => {
            if(monthReservation.hasOwnProperty(new Date(item?.reservedFor).getMonth())) {
                monthReservation[new Date(item?.reservedFor).getMonth()]+= 1;
                
            } else {
                monthReservation[new Date(item?.reservedFor).getMonth()] = 1;
            }
        })
        this.monthlyReservationChart(monthReservation);
    }

    monthlyReservationChart(monthReservation: any) {
        const types = new Chart('types', {
            type: 'bar',
            data: {
                labels: [
                    'January', 
                    'February', 
                    'March', 
                    'April', 
                    'May', 
                    'June', 
                    'July', 
                    'August', 
                    'September', 
                    'October', 
                    'November',
                    'December'
                ],
                datasets: [{
                  label: 'Monthly Reservation',
                  data: Object.values(monthReservation),
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                }]
              },
            options: {
                responsive: true,
                scales: {
                    y: {
                      beginAtZero: true
                    }
                }
            }
        });
    }
}
