import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-founders',
  templateUrl: './founders.component.html',
  styleUrls: ['./founders.component.css']
})
export class FoundersComponent implements OnInit {

 
  founders : any = [] ;
  
  constructor(private commonService : CommonService) { }

  ngOnInit(): void {
    let header = document.getElementById('header');
    if(header){
      header.style.backgroundColor = '#0291d9';
    }
    this.commonService.doGet("assets/foundingMembers.json").subscribe((data:any) =>{
      this.founders = data;
    });
  }
}
