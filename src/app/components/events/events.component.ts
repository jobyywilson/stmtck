import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  
  constructor(private commonService : CommonService,private route: ActivatedRoute) { }



  eventList : any = [];
  postList : any = [];
  type : any ;

  ngOnInit(): void {
    let paramMap = this.route.snapshot.paramMap;
    this.type = paramMap.get("type")
    let header = document.getElementById('header');
    if(header){
      header.style.backgroundColor = '#0291d9';
    }
    this.loadData();
  }
  loadData(){
    this.commonService.getContent().then(events => {
      this.postList = this.type === "posts" ? events.posts : events.obituaries;
    }).catch((err:any) => console.error(err));
  }
}
