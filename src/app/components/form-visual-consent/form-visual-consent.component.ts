import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { SectionHTMLContent } from 'src/app/models/section-html-content.model';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { FormService } from 'src/app/services/form.service';


@Component({
  selector: 'app-form-visual-consent',
  templateUrl: './form-visual-consent.component.html',
  styleUrls: ['./form-visual-consent.component.scss']
})
export class FormVisualConsent implements OnInit, OnChanges {

  constructor(private formService: FormService, private formStepNavigatorService: FormStepNavigator) { }
  @Input() section: any;
  htmlContent: string = null
  allDocumentStepsHtmlContent: SectionHTMLContent[] = []
  hyperlinkClicked: boolean = false


  ngOnInit(): void {
    this.formService.sectionHtmlContentSubject.subscribe(result => {
      this.allDocumentStepsHtmlContent = result
      this.setHtmlContent()
    })
    this.formStepNavigatorService.hyperLinkClickedSubject.subscribe(isClicked => {
      this.hyperlinkClicked = isClicked
    })
  }

  ngOnChanges(): void {
    this.htmlContent = null
    this.setHtmlContent()
  }

  setHtmlContent(): void {
    let htmlContentResult = this.allDocumentStepsHtmlContent.filter(ob => ob.contentKey === this.section.sectionHtmlContentKey)
    if (htmlContentResult.length > 0) {
      this.htmlContent = htmlContentResult[0].contentValue
    }
  }

  onLinkClick(): void {
    this.formStepNavigatorService.hyperLinkClickedSubject.next(true)
    this.formStepNavigatorService.hyperLinkClickedStepSubject.next(this.section)
  }


}
