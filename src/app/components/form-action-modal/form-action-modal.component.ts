import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
declare const sendMessageToFlutter: any;

@Component({
  selector: 'app-form-action-modal',
  templateUrl: './form-action-modal.component.html',
  styleUrls: ['./form-action-modal.component.scss']
})
export class FormActionModal implements OnInit {

  @Output() onContinue = new EventEmitter<boolean>(false);
  @Output() onCancel = new EventEmitter<boolean>(false);

  @Input() continueButtonText: string
  @Input() cancelButtonText: string
  @Input() messageBody: string
  @Input() messageTitle: string

 
  constructor() {
  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.onCancel.next(true)
  }

  onContinueClick(): void {
    this.onContinue.next(true)
  }

  
}