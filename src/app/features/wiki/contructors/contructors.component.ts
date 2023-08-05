import { Component, OnInit } from '@angular/core';
import { IConstructors } from 'src/app/core/interfaces/constructors';
import { IDriver } from 'src/app/core/interfaces/driver';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-contructors',
  templateUrl: './contructors.component.html',
  styleUrls: ['./contructors.component.css']
})
export class ContructorsComponent implements OnInit {

  constructors: IConstructors[];
  constructor(private fs: FirestoreService) {

  }

  ngOnInit(): void {
    this.fs.getF1Constructors().subscribe(contructors=>{
      this.constructors = contructors as IConstructors[];
      console.log(this.constructors);
      
    })
  }
}