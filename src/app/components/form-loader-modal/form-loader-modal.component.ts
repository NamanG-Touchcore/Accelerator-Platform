import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-loader-modal',
  templateUrl: './form-loader-modal.component.html',
  styleUrls: ['./form-loader-modal.component.scss']
})
export class FormLoaderModalComponent implements OnInit {

  constructor() { }

  @Input() message: string = ""

  ngOnInit(): void {
  }

}
