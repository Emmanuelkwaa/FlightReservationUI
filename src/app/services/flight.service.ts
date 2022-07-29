import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../models/Flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flightToAdd: Flight = new Flight();

  flightUrl = "/flights"

  constructor(private http :HttpClient) { }

   getAllFlights (): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.flightUrl);
    
  }

  addFlight(flight: Flight){
    return this.http.post<Flight>(this.flightUrl, flight);
    
  }

  update(flight: Flight){
    return this.http.put<Flight>(this.flightUrl, Flight);
    
  }

  // TO DO
  // Probably needs to be changed
  delete(id: number): any{
    return this.http.delete<any>(this.flightUrl, {"body":{"id": id}});
    
  }
}
