import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-instruction',
  templateUrl: './form-instruction.component.html',
  styleUrls: ['./form-instruction.component.scss']
})
export class FormInstructionComponent implements OnInit {

  @Input() question: any;

  constructor() { }

  ngOnInit(): void {
  }

}
