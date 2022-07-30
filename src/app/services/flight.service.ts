import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Flight } from '../models/Flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  flightUrl = "/flights"

  constructor(private http: HttpClient) { }

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${environment.baseUrl}${this.flightUrl}`);
  }

  addFlight(flight: Flight) {
    return this.http.post<Flight>(`${environment.baseUrl}${this.flightUrl}`, flight);
  }

  update(flight: Flight) {
    return this.http.put<Flight>(`${environment.baseUrl}${this.flightUrl}`, flight);
  }

  delete(id: number): Observable<Flight> {
    return this.http.delete<Flight>(`${environment.baseUrl}${this.flightUrl}/${id}`);
  }
}
