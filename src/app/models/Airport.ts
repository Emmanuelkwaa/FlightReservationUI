import { City } from "./City";

export class Airport {

    id? :number;
    name :String;
    city :City;

    constructor(
        id = 0,
        name = '',
        city = new City()
    )
    {
        this.id = id;
        this.name = name;
        this.city = city;
    }
}