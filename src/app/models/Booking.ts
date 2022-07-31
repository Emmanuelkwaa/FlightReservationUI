import { City } from "./City";

export class Booking {
    tripType :string;
    numberOfPassengers :number;
    tripClass :string;
    departCity :string;
    arrivalCity :string;
    date: Date;

    constructor(
        tripType = '', 
        numberOfPassengers = 0, 
        tripClass = '', 
        departCity = '', 
        arrivalCity = '', 
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