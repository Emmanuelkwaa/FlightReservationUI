import { Flight } from "./Flight";
import { Seat } from "./Seat";
import { User } from "./User";

export class Ticket {

    id? :string;
    ticketType :string;
    flight :Flight;
    user :User;
    dateOfPurchase :Date;
    seatId :number;
    from :string;
    to :string;
    price :number;
    numberOfPassenger :number;

    constructor(
        id = '',
        ticketType = '',
        flight = new Flight(),
        user = new User,
        dateOfPurchase = new Date(),
        seatId = 0,
        from = '',
        to = '',
        price = 0,
        numberOfPassenger = 0

    ) {
        this.id = id;
        this.ticketType = ticketType;
        this.flight = flight;
        this.user = user;
        this.dateOfPurchase = dateOfPurchase;
        this.seatId = seatId;
        this.from = from;
        this.to = to;
        this.price = price;
        this.numberOfPassenger = numberOfPassenger;
    }

}