import { City } from "./City";

export class Booking {
    tripType :string;
    numberOfPassengers :number;
    tripClass :string;
    departCity :City;
    arrivalCity :City;
    date: Date;
  booking: any;

    constructor(
        tripType = '', 
        numberOfPassengers = 0, 
        tripClass = '', 
        departCity = new City(), 
        arrivalCity = new City(), 
        date = new Date()
    ) {
        this.tripType = tripType;
        this.numberOfPassengers = numberOfPassengers;
        this.tripClass = tripClass;
        this.departCity = departCity;
        this.arrivalCity = arrivalCity;
        this.date = date;
    }
}