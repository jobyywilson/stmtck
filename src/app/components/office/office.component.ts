import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {

  officeMembers : any = [];
  auditors : any = [];
  sextons : any = [];
  constructor(private commonService : CommonService) { }

  ngOnInit(): void {
    let header = document.getElementById('header');
    if(header){
      header.style.backgroundColor = '#0291d9';
    }
    this.commonService.doGet("assets/office.json").subscribe((data:any) =>{
      this.officeMembers = data;
    });
    this.commonService.doGet("assets/sexton.json").subscribe((data:any) =>{
      this.sextons = data;
    });
    this.commonService.doGet("assets/auditors.json").subscribe((data:any) =>{
      this.auditors = data;
    });
  }
}
