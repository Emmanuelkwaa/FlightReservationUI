import { City } from "./City";
import { Airplane } from "./Airplane";

export class Flight {
    
    id? :number;
    flightNumber :string;
    departCity :City;
    arrivalCity :City;
    departDateTime :Date;
    arrivalDateTime :Date;
    economyPrice :number;
    businessPrice :number;
    airplane :Airplane;

    constructor(
        id = 0, 
        flightNumber = '', 
        departCity = new City(), 
        arrivalCity = new City(),
        departDateTime = new Date(),
        arrivalDateTime = new Date(),
        economyPrice = 0,
        businessPrice = 0,
        airplane = new Airplane
    ) {
        this.id = id;
        this.flightNumber = flightNumber;
        this.departCity = departCity;
        this.arrivalCity = arrivalCity;
        this.departDateTime = departDateTime;
        this.arrivalDateTime = arrivalDateTime;
        this.economyPrice = economyPrice;
        this.businessPrice = businessPrice;
        this.airplane = airplane;
    }
    
}