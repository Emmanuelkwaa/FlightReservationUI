import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Flight } from 'src/app/models/Flight';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result :Flight[] = [];  

  displayedColumns: string[] = ['flightNumber', 'departAirport.city.name', 'arrivalAirport.city.name', 'departDateTime', 'arrivalDateTime', 'action'];
  dataSource!: MatTableDataSource<Flight>;

  constructor() { }

  ngOnChanges( changes :SimpleChange) {
    this.dataSource = new MatTableDataSource(this.result);
  }

  ngOnInit(): void {
  }

  bookFlight(flight :Flight) {
    console.log(flight);
  }
}
