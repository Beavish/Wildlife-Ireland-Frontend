import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddImagePayload } from './create-image.payload';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  constructor(private http: HttpClient) { }

  // reed to pass the body and the record id
  addImage(file: File, record_id: string ):Observable<any>{
    const formData = new FormData();
    formData.append('record_id',record_id);
    formData.append('file', file);

    return this.http.post('http://localhost:8080/api/image/new', formData, )
    ;}


}
