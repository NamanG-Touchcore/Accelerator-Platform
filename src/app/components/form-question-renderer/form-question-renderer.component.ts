import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormInput } from 'src/app/models/form-input.model';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form-question-renderer',
  templateUrl: './form-question-renderer.component.html',
  styleUrls: ['./form-question-renderer.component.scss']
})
export class FormQuestionRendererComponent implements OnInit {

  constructor(private formService: FormService) { }

  @Input() formInput: FormInput;

  ngOnInit(): void {
  }



}
