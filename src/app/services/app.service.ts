import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, delay } from 'rxjs';

interface TableData {
  isToggled: boolean;
  date: string;
  isNew: boolean;
  firstName: string;
  lastName: string;
  sex: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public isLoading = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient
  ) { }

  getJsonData(): Observable<TableData[]> {
    return this.http.get('assets/json/data.json').pipe(delay(3000), map((res: TableData[]) => {
      this.isLoading.next(false);
      return res;
    }));
  }
}
