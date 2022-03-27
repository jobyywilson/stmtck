import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private commonService: CommonService) { }

  type : any = "";
  id : any = "";
  data : any = {};
  ngOnInit(): void {
    let header = document.getElementById('header');
    if(header){
      header.style.backgroundColor = '#0291d9';
    }
    let paramMap = this.route.snapshot.paramMap;
    this.type = paramMap.get("type");
    this.id = paramMap.get("id");
    this.loadData();
  }

  async loadData(){
    let fileName = "src/assets/content/posts/"+this.type;
    let rawData = await this.commonService.doGet("assets/content/"+this.type+"/"+this.id).toPromise();
    this.data = this.commonService.mapPost(rawData,fileName)
  }

}
