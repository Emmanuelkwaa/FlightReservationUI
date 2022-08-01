import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Booking } from 'src/app/models/Booking';
import { Flight } from 'src/app/models/Flight';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bookingForm! :FormGroup;
  searchResult! :Flight[];
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
        this.bookingForm.controls['date'].value
      );

      this.flightService.getFlightByArrivalAndDepartCity(booking)
          .subscribe({
            next: (result) => {
              this.searchResult = result;
              console.log(this.searchResult);
            },
            error: (err) => {
              alert(err.message);
            }
          });
          console.log(booking);
    }
  }
}
