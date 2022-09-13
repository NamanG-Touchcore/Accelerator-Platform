import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-static-modal',
  templateUrl: './form-static-modal.component.html',
  styleUrls: ['./form-static-modal.component.scss']
})
export class FormStaticModalComponent implements OnInit {

  @Output() done = new EventEmitter<boolean>(false);
  @Input() message: string = "";
  @Input() title: string = "";
  @Input() footer: string = ""

  constructor() { }

  ngOnInit(): void {
  }

  onDone(): void {
    this.done.next(true)
  }

}
