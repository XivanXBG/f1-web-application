import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.css']
})
export class ScheduleCardComponent implements OnInit {
  @Input() round!:any;
  ngOnInit(): void {
      console.log(this.round);
  }
}
