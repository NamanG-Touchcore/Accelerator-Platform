import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SectionHTMLContent } from '../../models/section-html-content.model';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-consent-review',
  templateUrl: './form-consent-review.component.html',
  styleUrls: ['./form-consent-review.component.scss']
})
export class FormConsentReviewComponent implements OnInit {

  constructor(private formService: FormService) { }
  @Input() sections: any
  allSectionsHtmlContent: SectionHTMLContent[] = []

  ngOnInit(): void {
    this.formService.sectionHtmlContentSubject.subscribe(result => {
      this.allSectionsHtmlContent = result
      this.setHtmlContent()
    })
  }


  setHtmlContent(): void {
    this.sections = JSON.parse(JSON.stringify(this.sections)) // Creating a deep copy so that the existing object is not modified.
    for (let section of this.sections) {
      let htmlContent = this.allSectionsHtmlContent.filter(ob => ob.contentKey === section.sectionHtmlContentKey)
      if (htmlContent.length > 0) {
        section.htmlContentValue = htmlContent[0].contentValue
      }
    }
  }
}
