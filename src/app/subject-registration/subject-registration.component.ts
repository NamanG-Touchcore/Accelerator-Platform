import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-subject-registration',
  templateUrl: './subject-registration.component.html',
  styleUrls: ['./subject-registration.component.scss']
})
export class SubjectRegistrationComponent implements OnInit {

  constructor(private formService: FormService, private router: Router) { }

  ngOnInit(): void {
    this.formService.setRegistrationConfiguration().subscribe(configuration => {
      // Here the selected survey and section will be the same because we dont have survey and section responses in registration.
      this.formService.setSelectedSurvey(configuration)
      this.formService.setSelectedSurveySection(configuration)
      this.router.navigate(["form", "registration", "registration"])
    })
  }

}
