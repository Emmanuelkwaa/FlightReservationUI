import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticketUrl = "/tickets";

  constructor(private http: HttpClient) { }

  createTicket(ticket :Ticket) :Observable<Ticket[]> {
    return this.http.post<Ticket[]>(`${environment.baseUrl}${this.ticketUrl}`, ticket);
  }

  getTicket(id :number) :Observable<Ticket> {
    return this.http.get<Ticket>(`${environment.baseUrl}${this.ticketUrl}/${id}`)
  }

  // getTicketAsArray(id :number) :Observable<Ticket[]> {
  //   return this.http.get<Ticket[]>(`${environment.baseUrl}${this.ticketUrl}/${id}`)
  // }

  public updateTicket(ticket :Ticket) :Observable<Ticket[]> {
    return this.http.put<Ticket[]>(`${environment.baseUrl}${this.ticketUrl}/${ticket.id}`, ticket);
  }

  deleteTicket(id :number) :Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseUrl}${this.ticketUrl}/${id}`);
  }
}
