import { Airport } from "./Airport";

export class City {

    id? :number;
    name :string;
    country :string;
    airport :Airport;

    constructor(
        id = 0,
        name = '',
        country = '',
        airport = new Airport
    ) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.airport = airport;
    }
}
