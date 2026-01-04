import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}

  submitEmployee(data: any): Observable<any> {
    console.log('Submitted Data:', data);
    return of({ success: true }).pipe(delay(1500));
  }
}
