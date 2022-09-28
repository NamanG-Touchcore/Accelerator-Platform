import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormInstructionComponent } from './components/form-instruction/form-instruction.component';
import { FormCompletionComponent } from './components/form-completion/form-completion.component';
import { FormTextboxComponent } from './components/form-textbox/form-textbox.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormDateComponent } from './components/form-date/form-date.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTextchoiceComponent } from './components/form-textchoice/form-textchoice.component';
import { ListSurveyComponent } from './list-survey/list-survey.component';
import { ListSurveySectionComponent } from './list-survey-section/list-survey-section.component';
import { FormRenderer } from './form-renderer/form-renderer.component';
import { FormQuestionComponent } from './components/form-question/form-question.component';
import { FormQuestionRendererComponent } from './components/form-question-renderer/form-question-renderer.component';
import { FormVisualConsent } from './components/form-visual-consent/form-visual-consent.component';
import { LegalStatementComponent } from './legal-statement/legal-statement.component';
import { StaticComponentRendererComponent } from './static-component-renderer/static-component-renderer.component';
import { CheckboxComponent } from './static-component/checkbox/checkbox.component';
import { RadioComponent } from './static-component/radio/radio.component';
import { SelectComponent } from './static-component/select/select.component';
import { CompletionComponent } from './static-component/completion/completion.component';
import { CustomSectionComponent } from './static-component/custom-section/custom-section.component';
import { DateComponent } from './static-component/date/date.component';
import { InstructionComponent } from './static-component/instruction/instruction.component';
import { TextareaComponent } from './static-component/textarea/textarea.component';
import { TextboxComponent } from './static-component/textbox/textbox.component';
import { TextchoiceComponent } from './static-component/textchoice/textchoice.component';
import { QuestionRendererComponent } from './static-component/question-renderer/question-renderer.component';
import { HeaderComponent } from './static-component/header/header.component';
import { MultivaluepickerComponent } from './static-component/multivaluepicker/multivaluepicker.component';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { FormFooterComponent } from './components/form-footer/form-footer.component';
import { FormProgressBarComponent } from './components/form-progress-bar/form-progress-bar.component';
import { TextchoiceSingleComponent } from './static-component/textchoice-single/textchoice-single.component';
import { TimeofthedayComponent } from './static-component/timeoftheday/timeoftheday.component';
import { EmailComponent } from './static-component/email/email.component';
import { NumberComponent } from './static-component/number/number.component';
import { FormConsentReviewComponent } from './components/form-consent-review/form-consent-review.component';
import { BooleanComponent } from './static-component/boolean/boolean.component';
import { LocationComponent } from './static-component/location/location.component';
import { ImageSelectionComponent } from './static-component/image-selection/image-selection.component';
import { ValidatedtextComponent } from './static-component/validatedtext/validatedtext.component';
import { TextscaleComponent } from './static-component/textscale/textscale.component';
import { FileUploadComponent } from './static-component/file-upload/file-upload.component';
import { ImageSelectionVerticalComponent } from './static-component/image-selection-vertical/image-selection-vertical.component';
import { FormActionModal } from './components/form-action-modal/form-action-modal.component';
import { FormStaticModalComponent } from './components/form-static-modal/form-static-modal.component';
import { HttpInterceptor } from './services/http-interceptor.service';
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './static-component/loading/loading.component';
import { FormLoaderModalComponent } from './components/form-loader-modal/form-loader-modal.component';
import { ProgressBarLineComponent } from './static-component/progress-bar-line/progress-bar-line.component';
import { FormLoaderComponent } from './components/form-loader/form-loader.component';
import { FormLineProgressBarComponent } from './components/form-line-progress-bar/form-line-progress-bar.component';
import { FormLineProgressBarWithNoPercentComponent } from './components/form-line-progress-bar-with-no-percent/form-line-progress-bar-with-no-percent.component';
import { FormMultipleValuePickerComponent } from './components/form-multiple-value-picker/form-multiple-value-picker.component';
import { CookieService } from 'ngx-cookie-service';
import { SubjectRegistrationComponent } from './subject-registration/subject-registration.component';
import { FormBadgeComponent } from './components/form-badge/form-badge.component';
import { GlobalErrorHandler } from './services/error-handler.service';
import { FormTextscaleComponent } from './components/form-textscale/form-textscale.component';
import { SubjectProfileComponent } from './subject-profile/subject-profile.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { SettingsService } from './services/settings-service';
import es from '@angular/common/locales/es';
import de from '@angular/common/locales/de';
import en from '@angular/common/locales/en';
import pt from '@angular/common/locales/pt';
import fr from '@angular/common/locales/fr';
import it from '@angular/common/locales/it';
import ko from '@angular/common/locales/ko';
import pl from '@angular/common/locales/pl';
import ru from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { FormEsignatureComponentComponent } from './components/form-esignature-component/form-esignature-component.component';
import { FormShowEsignatureInfoComponent } from './components/form-show-esignature-info/form-show-esignature-info.component';
import { AppConfig } from './services/app-config.service';
import { FormFileUploadComponent } from './components/form-file-upload/form-file-upload.component';
import { FormRendererContainerComponent } from './form-renderer-container/form-renderer-container.component';
import { IFrameComponent } from './i-frame/i-frame.component';
import { FormRendererIframeComponent } from './form-renderer-iframe/form-renderer-iframe.component';
registerLocaleData(es);
registerLocaleData(de);
registerLocaleData(en);
registerLocaleData(pt);
registerLocaleData(fr);
registerLocaleData(it);
registerLocaleData(ko);
registerLocaleData(pl);
registerLocaleData(ru);


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/global-resource/', '.json');
}

const configFactory = (configService: AppConfig) => {
  return () => configService.loadAppConfig();
};

@NgModule({
  declarations: [
    AppComponent,
    FormInstructionComponent,
    FormCompletionComponent,
    FormTextboxComponent,
    FormSelectComponent,
    FormRadioComponent,
    FormCheckboxComponent,
    FormDateComponent,
    FormTextareaComponent,
    FormTextchoiceComponent,
    ListSurveyComponent,
    ListSurveySectionComponent,
    FormRenderer,
    FormQuestionComponent,
    FormQuestionRendererComponent,
    FormVisualConsent,
    LegalStatementComponent,
    StaticComponentRendererComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    CompletionComponent,
    CustomSectionComponent,
    DateComponent,
    InstructionComponent,
    TextareaComponent,
    TextboxComponent,
    TextchoiceComponent,
    QuestionRendererComponent,
    HeaderComponent,
    MultivaluepickerComponent,
    FormHeaderComponent,
    FormFooterComponent,
    FormProgressBarComponent,
    FormConsentReviewComponent,
    BooleanComponent,
    LocationComponent,
    ImageSelectionComponent,
    TextchoiceSingleComponent,
    TimeofthedayComponent,
    EmailComponent,
    NumberComponent,
    FormConsentReviewComponent,
    ValidatedtextComponent,
    TextscaleComponent,
    FileUploadComponent,
    ImageSelectionVerticalComponent,
    FormActionModal,
    FormStaticModalComponent,
    LoginComponent,
    LoadingComponent,
    FormLoaderModalComponent,
    ProgressBarLineComponent,
    FormLoaderComponent,
    FormLineProgressBarComponent,
    FormLineProgressBarWithNoPercentComponent,
    FormMultipleValuePickerComponent,
    SubjectRegistrationComponent,
    FormBadgeComponent,
    FormTextscaleComponent,
    SubjectProfileComponent,
    FormEsignatureComponentComponent,
    FormShowEsignatureInfoComponent,
    FormFileUploadComponent,
    FormRendererContainerComponent,
    IFrameComponent,
    FormRendererIframeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [AppConfig],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService: any) => settingsService.getLanguage()
    },
    CookieService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
