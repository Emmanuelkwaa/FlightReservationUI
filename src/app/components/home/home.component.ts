import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Booking } from 'src/app/models/Booking';
import { City } from 'src/app/models/City';
import { FlightService } from 'src/app/services/flight.service';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
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

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

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

  selectedFood = this.foods[1].value
  selectedClass = this.tripClass[0].value
  selectedCount = this.numberOfPassengers[0].value
  selectedTripType = this.tripTypes[0].value

  findFlight() {
    if (this.bookingForm.valid) {
      let booking = new Booking();
      booking.tripType = this.selectedTripType;
      booking.numberOfPassengers = this.selectedCount;
      booking.tripClass = this.selectedClass;
      booking.departCity =  this.bookingForm.controls['departCity'].value;
      booking.arrivalCity = this.bookingForm.controls['arrivalCity'].value;
      booking.date = this.bookingForm.controls['date'].value;

      console.log(booking);

      this.flightService.getFlightByArrivalAndDepartCity(booking)
          .subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
              alert(err.message);
            }
          });
    }
  }

  

}
