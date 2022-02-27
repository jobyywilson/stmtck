import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  
  constructor(private commonService : CommonService) { }


  eventList : any = [];
  postList : any = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    let combinedData = [this.commonService.getPostedInfo()]
        combineLatest(combinedData).subscribe(
          data => {
            this.commonService.mapPostedInfo(data[0]);
            this.eventList = this.commonService.eventsInfo;
            this.postList = this.commonService.postInfo;
            console.log(this.eventList)
          },
        (err:any) => console.error(err)
        );
    }

}
