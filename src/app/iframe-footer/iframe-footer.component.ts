import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iframe-footer',
  templateUrl: './iframe-footer.component.html',
  styleUrls: ['./iframe-footer.component.scss']
})
export class IframeFooterComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      console.log(params["actionUrl"])
    })
  }

}
