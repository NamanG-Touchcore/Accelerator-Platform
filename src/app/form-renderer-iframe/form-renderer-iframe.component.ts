import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-form-renderer-iframe',
  templateUrl: './form-renderer-iframe.component.html',
  styleUrls: ['./form-renderer-iframe.component.scss']
})
export class FormRendererIframeComponent implements OnInit {

  constructor(public formService:FormService,private route: ActivatedRoute, private deviceService: DeviceDetectorService,    private router: Router,
    ) { }
  sectionsData:Array<any> = null;
  sectionId:Array<any> = null;
  surveyId:Array<any> = null;

  ngOnInit(): void {
    this.sectionsData = this.formService.getSections()
    console.log(this.formService.selectedSection)
    this.route.params.subscribe((params) => {
      this.sectionId = params['sectionInternalId'];
      this.surveyId = params['surveyInternalId'];
      // console.log(sectionInternalId)

    });
  }
  navigate(section:any):any{
    // console.log(section)
    if (this.deviceService.isMobile() && this.deviceService.isTablet()) {
      this.router.navigate(
        ['/form-iframe', this.surveyId, section.section.internalIdentifier],
        { queryParams: { m: 2 } }
      );
    } else if (this.deviceService.isDesktop()) {
      this.router.navigate(
        ['/form-iframe', this.surveyId, section.section.internalIdentifier],
        { queryParams: { m: 1 } }
      );
    } else {
      this.router.navigate(
        ['/form-iframe', this.surveyId, section.section.internalIdentifier],
        { queryParams: { m: 2 } }
      );
    }
  }

}
