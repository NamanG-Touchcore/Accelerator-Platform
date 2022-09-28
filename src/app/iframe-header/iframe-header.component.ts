import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormService } from '../services/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iframe-header',
  templateUrl: './iframe-header.component.html',
  styleUrls: ['./iframe-header.component.scss']
})
export class IframeHeaderComponent implements OnInit {

  constructor(public formService:FormService, private route: ActivatedRoute) { }
  @Input() sectionsData:any = null;
  @Output() section = new EventEmitter<any>();
  sectionId:any = null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.sectionId = params['sectionInternalId'];
    });
  }
  navigate(section:any):any{
    this.section.emit(section)
  }
}
