import { City } from "./City";
import { Airplane } from "./Airplane";
import { Airport } from "./Airport";

export class Flight {
    
    id? :number;
    flightNumber :string;
    departAirport :Airport;
    arrivalAirport :Airport;
    departDateTime :Date;
    arrivalDateTime :Date;
    economyPrice :number;
    businessPrice :number;
    airplane :Airplane;

    constructor(
        id = 0, 
        flightNumber = '', 
        departAirport = new Airport(), 
        arrivalAirport = new Airport(),
        departDateTime = new Date(),
        arrivalDateTime = new Date(),
        economyPrice = 0,
        businessPrice = 0,
        airplane = new Airplane
    ) {
        this.id = id;
        this.flightNumber = flightNumber;
        this.departAirport = departAirport;
        this.arrivalAirport = arrivalAirport;
        this.departDateTime = departDateTime;
        this.arrivalDateTime = arrivalDateTime;
        this.economyPrice = economyPrice;
        this.businessPrice = businessPrice;
        this.airplane = airplane;
    }
    
}