import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-former-vicars',
  templateUrl: './former-vicars.component.html',
  styleUrls: ['./former-vicars.component.css']
})
export class FormerVicarsComponent implements OnInit {

  formerVicars : any = [];
  constructor(private commonService : CommonService) { }

  ngOnInit(): void {
    let header = document.getElementById('header');
    if(header){
      header.style.backgroundColor = '#0291d9';
    }
    this.commonService.doGet("assets/former-vicars.json").subscribe((data:any) =>{
      this.formerVicars = data.reverse();
    });
  }

}
