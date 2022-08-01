import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Booking } from 'src/app/models/Booking';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bookingForm!: FormGroup;
  //date = new FormControl(moment());

  constructor(private formBuilder: FormBuilder, private flightService : FlightService) { }

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      tripType: ['',],
      numberOfPassengers: ['',],
      tripClass: ['',],
      departCity: ['', Validators.required],
      arrivalCity: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

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

  findFlight() {
    if (this.bookingForm.valid) {
      const booking = new Booking(
        this.selectedTripType, 
        this.selectedCount, 
        this.selectedClass,
        this.bookingForm.controls['departCity'].value,
        this.bookingForm.controls['arrivalCity'].value,
        Date.parse(this.bookingForm.controls['date'].value)
      );
      // booking.tripType = this.selectedTripType;
      // booking.numberOfPassengers = this.selectedCount;
      // booking.tripClass = this.selectedClass;
      // booking.departCity =  this.bookingForm.controls['departCity'].value;
      // booking.arrivalCity = this.bookingForm.controls['arrivalCity'].value;
      // booking.date = Date.parse(this.bookingForm.controls['date'].value);

      //console.log(booking);
      //console.log(JSON.stringify(this.bookingForm.controls['date'].value));

      this.flightService.getFlightByArrivalAndDepartCity(booking)
          .subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
              alert(err.message);
            }
          });
          console.log(booking);
    }
  }
}
