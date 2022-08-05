import { Component, Inject, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from 'src/app/models/Ticket';
import { User } from 'src/app/models/User';
import { TicketService } from 'src/app/services/ticket.service';
import { TicketReceitComponent } from '../ticket-receit/ticket-receit.component';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  editForm! :FormGroup;
  width : string = '';

  constructor(
    private ticketService: TicketService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditTicketComponent>,
    private dialog :MatDialog,
    @Inject(MAT_DIALOG_DATA) public ticket: Ticket
  ) { }

  ngOnInit(): void {
    if (this.detectMob()) {
      this.width = '100%';
    } else {
      this.width = '60%';
    }

    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    if (this.ticket) {
      this.editForm.controls['firstName'].setValue(this.ticket.user.firstName);
      this.editForm.controls['lastName'].setValue(this.ticket.user.lastName);
      this.editForm.controls['email'].setValue(this.ticket.user.email);
      this.editForm.controls['phoneNumber'].setValue(this.ticket.user.phoneNumber);
    }
  }

  update(ticket :Ticket) {
    this.ticketService.updateTicket(ticket)
      .subscribe({
        next: (res) => {
          this.dialogRef.close('updated');
          this.openDialog(res)
        },
        error: (err) => {
          alert(err.message);
        }
      })
  }

  openDialog(tickets :Ticket[]) {
    this.dialog.open(TicketReceitComponent, {
      width: this.width,
      data: tickets
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
