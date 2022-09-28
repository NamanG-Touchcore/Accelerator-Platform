import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRenderer } from './form-renderer/form-renderer.component';
import { ListSurveySectionComponent } from './list-survey-section/list-survey-section.component';
import { ListSurveyComponent } from './list-survey/list-survey.component';
import { LegalStatementComponent } from './legal-statement/legal-statement.component';
import { LoginComponent } from './login/login.component';
import { StaticComponentRendererComponent } from './static-component-renderer/static-component-renderer.component';
import { SubjectRegistrationComponent } from './subject-registration/subject-registration.component';
import { SubjectProfileComponent } from './subject-profile/subject-profile.component';
import { FormRendererContainerComponent } from './form-renderer-container/form-renderer-container.component';
import { IFrameComponent } from './i-frame/i-frame.component';
import { FormRendererIframeComponent } from './form-renderer-iframe/form-renderer-iframe.component';
const routes: Routes = [{
  path: 'legalStatement', component: LegalStatementComponent
}, {
  path: 'surveys', component: ListSurveyComponent
},
{
 path: 'iframe', component: IFrameComponent
},
{
  path: 'sections/:surveyInternalId', component: ListSurveySectionComponent
},
 {
  path: 'form/:surveyInternalId/:sectionInternalId', component: FormRendererContainerComponent
},
 {
  path: 'form-iframe/:surveyInternalId/:sectionInternalId', component: FormRendererIframeComponent
},
{
  path: 'static', component: StaticComponentRendererComponent
}, {
  path: 'subjectRegistration', component: SubjectRegistrationComponent
}, {
  path: 'subjectProfile', component: SubjectProfileComponent
},
{
  path: '', redirectTo: '/surveys', pathMatch: "prefix"
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
