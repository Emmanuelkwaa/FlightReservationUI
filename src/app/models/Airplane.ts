import { Seat } from "./Seat";
import { Airline } from "./Airline";

export class Airplane {

    id? :string;
    currentCapacity :number;
    maxCapacity :number;
    model :string;
    seat :Seat;
    airline :Airline;

    constructor(
        id = '',
        currentCapacity = 0,
        maxCapacity = 0,
        model = '',
        seat = new Seat,
        airline = new Airline
    ) {
        this.id = id;
        this.currentCapacity = currentCapacity;
        this.maxCapacity = maxCapacity;
        this.model = model;
        this.seat = seat;
        this.airline = airline;
    }

}