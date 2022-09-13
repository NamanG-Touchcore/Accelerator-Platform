import { Component, OnInit } from '@angular/core';
declare const myTest: any;
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onClick() {
    myTest();
  }

}
