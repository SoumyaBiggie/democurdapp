import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  $sessionData = new BehaviorSubject<any>('error');

  constructor() { }


  getData(d: any){
    this.$sessionData.next(d);
  }
}
