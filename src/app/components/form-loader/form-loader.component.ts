import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-loader',
  templateUrl: './form-loader.component.html',
  styleUrls: ['./form-loader.component.scss']
})
export class FormLoaderComponent implements OnInit {

  constructor(private loaderService: LoaderService) { }

  loader: any = {}

  ngOnInit(): void {
    this.loaderService.showLoader.subscribe(loader => {
      this.loader = loader
    })
  }



}
