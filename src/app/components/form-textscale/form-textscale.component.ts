import { Component, Input, OnChanges, OnInit, HostListener } from '@angular/core';
import { FormInput } from 'src/app/models/form-input.model';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form-textscale',
  templateUrl: './form-textscale.component.html',
  styleUrls: ['./form-textscale.component.scss']
})
export class FormTextscaleComponent implements OnInit, OnChanges {

  constructor(private formService: FormService, private formStepNavigatorService: FormStepNavigator) { }
  @Input() formInput: FormInput;
  questionId: string = null
  disabled: boolean = false
  sliderEnabled = 'block'
  ngOnInit(): void {
  }

  ngOnChanges(): void {
    let logLineRepeatKey = this.formService.getFinalLoglineRepeatKey(this.formInput.question, this.formInput.parentQuestion)
    this.questionId = `${this.formInput.question.identifier}@${logLineRepeatKey}`
    this.disabled = this.formService.isSurveyReadOnlyMode()
  }

  onChange(event: any) {
    this.formInput.form.patchValue({
      [this.questionId]: event.target.value
    })
    this.formStepNavigatorService.saveIndividualResponse(this.questionId, event.target.value, this.formInput.question, this.formInput.parentQuestion)
  }


  isOptionalQuestion(): boolean {
    return this.formStepNavigatorService.isOptionalQuestion(this.formInput)
  }
  
  isQuestionTextEmpty(): boolean {
    return (this.formInput.question.text == ''|| !this.formInput.question.text) && !this.formInput.question.isOptional
  }
  
  enableSlide(): void{
    this.sliderEnabled = 'none';
  }

  @HostListener('window:scroll', ['$event']) 
    scrollHandler() {
      this.sliderEnabled = 'block';
    }
}
