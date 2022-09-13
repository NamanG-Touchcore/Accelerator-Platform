import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormService } from '../services/form.service';
import { SubjectService } from '../services/subject.service';
import { DataStorage } from '../utility/storage';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private subjectService: SubjectService, private router: Router, private formService: FormService) { }
  subjectIds: any[] = []

  ngOnInit(): void {
    this.subjectIds = environment.subjectIds
  }

  onClick(subject: any): void {
    if (!this.subjectService.loggedInSubject || subject.id !== this.subjectService.loggedInSubject.subjectId) {
      DataStorage.clearLocalStorage()
    }
    this.subjectService.setLoggedInSubjectDetails();
    this.router.navigate(['surveys'])
  }

  onRegister(): void {
    this.formService.setRegistrationConfiguration().subscribe(configuration => {
      // Here the selected survey and section will be the same because we dont have survey and section responses in registration.
      this.formService.setSelectedSurvey(configuration)
      this.formService.setSelectedSurveySection(configuration)
      this.router.navigate(["form", "registration", "registration"])
    })
  }

}
