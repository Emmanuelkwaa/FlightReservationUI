import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Flight } from 'src/app/models/Flight';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result :Flight[] = [];
  width :string = '';

  displayedColumns: string[] = ['flightNumber', 'departAirport.city.name', 'arrivalAirport.city.name', 'departDateTime', 'arrivalDateTime', 'action'];
  dataSource!: MatTableDataSource<Flight>;

  constructor(private dialog :MatDialog) { }

  ngOnChanges( changes :SimpleChange) {
    this.dataSource = new MatTableDataSource(this.result);
  }

  ngOnInit(): void {
    if (this.detectMob()) {
      this.width = '100%';
    } else {
      this.width = '30%';
    }
  }

  openDialog(flight :Flight) {
    this.dialog.open(ConfirmModalComponent, {
      width: this.width,
      data: flight
    }).afterClosed().subscribe(val => {
      if(val==="created") {
        
      }
    })
  }

  detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
}
