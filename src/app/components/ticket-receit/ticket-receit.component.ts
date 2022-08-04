import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from 'src/app/models/Ticket';

@Component({
  selector: 'app-ticket-receit',
  templateUrl: './ticket-receit.component.html',
  styleUrls: ['./ticket-receit.component.css']
})
export class TicketReceitComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TicketReceitComponent>,
    @Inject(MAT_DIALOG_DATA) public tickets: Ticket[],
  ) { }

  ngOnInit(): void {
    console.log(this.tickets)
  }

  daysLeft(depDay: Date) {
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const today = Date.now();
    const departDate: any = depDay;
    const differenceMs = Math.abs(today - departDate);
    return Math.round(differenceMs / ONE_DAY);
  }

}
