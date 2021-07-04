import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WildlifeCrimePayload } from '../wildlife-crime/wildlife-crime.payload';

@Injectable({
  providedIn: 'root'
})
export class WildlifeCrimeService {
    constructor(private http: HttpClient) { }

  addCrime(wildlifeCrimePaypload: WildlifeCrimePayload):Observable<any>{
    return this.http.post('http://localhost:8080/api/crime/new', wildlifeCrimePaypload);


  }
}
