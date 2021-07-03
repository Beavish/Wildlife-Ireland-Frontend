import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddRecordPayload } from '../record/add-record/add-record.payload';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  
  

  constructor(private http: HttpClient) { }

  addRecord(addRecordPayload: AddRecordPayload):Observable<any>{
    return this.http.post('http://localhost:8080/api/post/new', addRecordPayload);


  }
  
}

