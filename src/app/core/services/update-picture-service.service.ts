// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatePictureService {
  private headerRefreshSource = new Subject<void>();

  headerRefresh$ = this.headerRefreshSource.asObservable();

  triggerHeaderRefresh(): void {
    console.log('sd');
    
    this.headerRefreshSource.next();
  }
}
