import { Component, Inject, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flight } from 'src/app/models/Flight';
import { Seat } from 'src/app/models/Seat';
import { Ticket } from 'src/app/models/Ticket';
import { User } from 'src/app/models/User';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  confirmationForm! :FormGroup;
  
  constructor(
    private ticketService :TicketService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Flight
  ) { }

  ngOnInit(): void {
    this.confirmationForm = this.formBuilder.group({
      tripType: ['',Validators.required],
      numberOfPassengers: ['',Validators.required],
      tripClass: ['',Validators.required],
      departCity: ['', Validators.required],
      arrivalCity: ['', Validators.required],
      date: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      seat: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    console.log(this.editData)

    if(this.editData) {
      this.confirmationForm.controls['tripType'].setValue(this.selectedTripType);
      this.confirmationForm.controls['tripType'].disable();
      this.confirmationForm.controls['numberOfPassengers'].setValue(this.selectedCount);
      this.confirmationForm.controls['tripClass'].setValue(this.selectedClass);
      this.confirmationForm.controls['departCity'].setValue(this.editData.departAirport.city.name);
      this.confirmationForm.controls['arrivalCity'].setValue(this.editData.arrivalAirport.city.name);
      this.confirmationForm.controls['date'].setValue(this.editData.departDateTime);
    }

    if(this.editData && this.editData.airplane.currentCapacity < this.editData.airplane.maxCapacity) {
      this.editData.airplane.seats.forEach((seat) => {
        if(!seat.isTaken)
        this.seats.push(seat)
      });
    }
  }

  seats: Seat[] = [];

  numberOfPassengers: any[] = [
    {value: 1, viewValue: '+1'},
    {value: 2, viewValue: '+2'},
    {value: 3, viewValue: '+3'},
    {value: 4, viewValue: '+4'},
    {value: 5, viewValue: '+5'},
    {value: 6, viewValue: '+6'},
    {value: 7, viewValue: '+7'},
    {value: 8, viewValue: '+8'},
    {value: 9, viewValue: '+9'},
    {value: 10, viewValue: '+10'},
  ]

  tripClass: any[] = [
    {value: 'economy', viewValue: 'Economy'},
    {value: 'business', viewValue: 'Business'},
  ];
  
  tripTypes: any[] = [
    {value: 'one way', viewValue: 'One way'},
    {value: 'round trip', viewValue: 'Round trip'},
  ];

  selectedClass = this.tripClass[0].value
  selectedCount = this.numberOfPassengers[0].value
  selectedTripType = this.tripTypes[0].value

  bookFlight() {
    if(this.confirmationForm.valid) {
      let price = 0;
      if(this.selectedClass == 'economy') {
        price = this.editData.economyPrice
      } else {
        price = this.editData.businessPrice;
      }

      const ticket = new Ticket(
        '',
        this.confirmationForm.controls['tripType'].value,
        this.editData,
        new User(
          0, 
          this.confirmationForm.controls['firstName'].value, 
          this.confirmationForm.controls['lastName'].value,
          this.confirmationForm.controls['phoneNumber'].value,
          this.confirmationForm.controls['email'].value
        ),
        new Date(Date.now()),
        this.confirmationForm.controls['seat'].value,
        this.confirmationForm.controls['departCity'].value,
        this.confirmationForm.controls['arrivalCity'].value,
        price,
        this.confirmationForm.controls['numberOfPassengers'].value,
      )

      console.log(ticket);

      this.ticketService.createTicket(ticket)
          .subscribe({
            next: (res) => {
              alert(`Your ticket number is: ${res.id}. Look it up for more information`);
              this.confirmationForm.reset();
              this.dialogRef.close('created');
            },
            error: (err) => {
              alert(err.message);
            }
          });
    }
  }

}
