import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Base } from '@core/index';
import { NgbdSortableHeader } from '@shared/directives/sortable-headers.directive';
import { GetUserListTableEnum, IReservations, ReservationsService } from '@shared/index';
import { takeUntil } from 'rxjs';

export type SortColumn = keyof IReservations | '';
export type SortDirection = 'asc' | 'desc' | '';

export interface ISortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends Base implements OnInit {
    
    reservationArray!: IReservations[];
    originalReservationArray!: IReservations[];
    page = GetUserListTableEnum.pageNumber;
	pageSize = GetUserListTableEnum.pageSize;
	collectionSize: number = 0;
    total: number = 0;
    pagesSizeArray: number[] = [10, 20, 30, 40, 50, 60, 70];
    filter = new FormControl('', { nonNullable: true });

    @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

    constructor(
        private readonly reservationService: ReservationsService
    ) {
        super();
	}

    ngOnInit(): void {
        this.getAllReservations();
    }

    // TODO: Add Sorting
    onSort({ column, direction }: ISortEvent | any) {
		this.headers.forEach((header) => {  
			if (header.sortable !== column) {
				header.direction = '';
			}
		});
	}

    applyFilter(filterEvent: Event) {
        let filterValue = (filterEvent.target as HTMLInputElement)?.value ?? '';
        if(filterValue && filterValue.length > 2) {
            filterValue = filterValue.trim();
            filterValue = filterValue.toLowerCase();
            let data = this.originalReservationArray ?? [];
            this.reservationArray = data.filter((item: any) => {
                return JSON.stringify(item)
                    .toLowerCase()
                    .includes(filterValue.toLowerCase());
            });
        }
       
    }

	refreshCountries() {
		this.reservationArray = this.originalReservationArray.map((reservation, i) => ({ ...reservation })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

    getAllReservations() {
        this.reservationService.getAllReservations()
        .pipe(takeUntil(this.destroy$)).subscribe({
            next: (user: IReservations[]) => {
                this.originalReservationArray = user;
                this.reservationArray = user;
                this.total = this.reservationArray?.length;
                this.collectionSize = this.reservationArray?.length;
                this.refreshCountries();
            }
        })
    }

}
