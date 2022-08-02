import { Ticket } from "./Ticket";

export class User {

    id? :number;
    firstName :string;
    lastName :string;
    phoneNumber :string;
    email :string;

    constructor(
        id = 0,
        firstName = '',
        lastName = '',
        phoneNumber = '',
        email = ''

    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}