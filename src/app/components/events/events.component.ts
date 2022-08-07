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
    this.commonService.getPostedInfo().subscribe(
           async data => {
            let events = await this.commonService.mapPostedInfo(data)
            let type  = this.type.toString()
            if(type === "posts"){
              this.postList = events["posts"]
            }
            else if(type === "obituaries"){
              this.postList = events["obituaries"]
            }
          },
        (err:any) => console.error(err)
        );
    }
}
