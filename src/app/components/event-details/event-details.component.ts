import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
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
  postList : any =[];
  ngOnInit(): void {
    let header = document.getElementById('header');
    if(header){
      header.style.backgroundColor = '#0291d9';
    }
    let paramMap = this.route.snapshot.paramMap;
    this.type = paramMap.get("type");
    this.id = paramMap.get("id");
    this.loadPostInfo();
    this.loadData();
    
  }

  async loadData(){
    let fileName = "src/assets/content/"+this.type+"/"+this.id;
    let rawData = await this.commonService.doGet("assets/content/"+this.type+"/"+this.id).toPromise();
    this.data = this.type === "obituaries"
      ? this.commonService.mapObituaries(rawData,fileName)
      : this.commonService.mapPost(rawData,fileName)
  }

  loadPostInfo(){
    this.commonService.getContent().then(events => {
      this.postList = this.type === "posts" ? events.posts : events.obituaries;
    }).catch((err:any) => console.error(err));
  }

}
