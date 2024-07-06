import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProjectsService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  addJob(job: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/postItem`, job);
  }
}
