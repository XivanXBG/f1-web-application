import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICurcuit } from 'src/app/core/interfaces/circuit';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-circuit-details',
  templateUrl: './circuit-details.component.html',
  styleUrls: ['./circuit-details.component.css']
})
export class CircuitDetailsComponent {
  circuit: ICurcuit
  constructor(private route: ActivatedRoute, private f1Service: FirestoreService) {

  }
  ngOnInit(): void {

    const circuitId = this.route.snapshot.paramMap.get('id');

    this.f1Service.getF1CircuitDataById(circuitId).subscribe(circuit => {
      this.circuit = circuit as ICurcuit


    });

  }

}
