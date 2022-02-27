import { Component, HostListener, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
declare var Swiper: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carouselSize : number =0;
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

  

    @HostListener("window:resize", []) update() {
      // lg (for laptops and desktops - screens equal to or greater than 1200px wide)
      // md (for small laptops - screens equal to or greater than 992px wide)
      // sm (for tablets - screens equal to or greater than 768px wide)
      // xs (for phones - screens less than 768px wide)
    
      if (window.innerWidth >= 1200) {
        this.carouselSize = 3; // lg
      } else if (window.innerWidth >= 992) {
        this.carouselSize = 3;//md
      } else if (window.innerWidth  >= 768) {
        this.carouselSize = 3;//sm
      } else if (window.innerWidth < 768) {
        this.carouselSize = 3;//xs
      }
      else if (window.innerWidth < 400) {
        this.carouselSize = 1;//xs
      }
      
    }

}
