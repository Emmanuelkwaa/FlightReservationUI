import { Flight } from "./Flight";
import { Seat } from "./Seat";
import { User } from "./User";

export class Ticket {

    id? :string;
    ticketType :string;
    flightId :number;
    user :User;
    dateOfPurchase :Date;
    seatId :number;
    from :string;
    to :string;
    price :number;

    constructor(
        id = '',
        ticketType = '',
        flightId = 0,
        user = new User,
        dateOfPurchase = new Date(),
        seatId = 0,
        from = '',
        to = '',
        price = 0

    ) {
        this.id = id;
        this.ticketType = ticketType;
        this.flightId = flightId;
        this.user = user;
        this.dateOfPurchase = dateOfPurchase;
        this.seatId = seatId;
        this.from = from;
        this.to = to;
        this.price = price;
    }

}