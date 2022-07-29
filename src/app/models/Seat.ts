import { Airplane } from "./Airplane";

export class Seat {
    id? :number;
    seatNumber :string;
    isTaken :boolean;
    airplane :Airplane;

    constructor(
        id = 0,
        seatNumber = '',
        isTaken = false,
        airplane = new Airplane
    ) {
        this.id = id;
        this.seatNumber = seatNumber;
        this.isTaken = isTaken;
        this.airplane = airplane;
    }
}