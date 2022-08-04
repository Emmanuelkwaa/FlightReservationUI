import { City } from "./City";

export class Airport {

    id? :number;
    name :String;
    code :String;
    city :City;
    

    constructor(
        id = 0,
        name = '',
        code = '',
        city = new City()
    )
    {
        this.id = id;
        this.name = name;
        this.code = code;
        this.city = city;
    }
}