import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from 'src/app/models/Ticket';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from 'src/app/services/ticket.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-ticket-receit',
  templateUrl: './ticket-receit.component.html',
  styleUrls: ['./ticket-receit.component.css']
})
export class TicketReceitComponent implements OnInit {
  width: string = '';

  constructor(
    private ticketService: TicketService,
    private dialogRef: MatDialogRef<TicketReceitComponent>,
    @Inject(MAT_DIALOG_DATA) public tickets: Ticket[],
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.detectMob()) {
      this.width = '100%';
    } else {
      this.width = '60%';
    }
    console.log(this.tickets)
  }

  daysLeft(depDay: Date) {
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const today = Date.parse(JSON.stringify(Date.now()));
    const departDate = Date.parse(JSON.stringify(depDay));
    const differenceMs = Math.abs(today - departDate);
    console.log(Math.abs(today - departDate));
    console.log(Math.abs((today - departDate))/ONE_DAY);
    return Math.round(differenceMs / ONE_DAY);
  }


  deleteTicket(ticket: Ticket) {
    this.ticketService.deleteTicket(ticket.id)
      .subscribe({
        next: (res) => {
          if(res == false) {
            alert('Ticket cancelled successfully')
            const ticketToDelete = this.tickets.indexOf(ticket);
            if (ticketToDelete > -1) {
              this.tickets.splice(ticketToDelete, 1)
            }
            if (this.tickets.length <= 0) {
              this.dialogRef.close('deleted');
            }
          } else {
            alert('Flight not canceled')
          }
          // this.dialogRef.close('deleted');
          // this.dialog.closeAll();
        },
        error: (err) => {
          alert("Something went wrong");
        }
      });
  }

  editTicket(ticket :Ticket) {
    this.dialogRef.close('edit')
    this.openDialog(ticket);
  }

  openDialog(ticket: Ticket) {
    this.dialog.open(EditTicketComponent, {
      width: this.width,
      data: ticket
    }).afterClosed().subscribe(val => {
      if (val === "created") {

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
