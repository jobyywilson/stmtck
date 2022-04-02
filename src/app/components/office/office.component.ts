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
  kaisthanasamithy: any = [];
  constructor(private commonService : CommonService) { }

  ngOnInit(): void {
    let header = document.getElementById('header');
    if(header){
      header.style.backgroundColor = '#0291d9';
    }
    this.commonService.doGet("assets/content/officeBearers/Office Bearers.json").subscribe((data:any) =>{
      this.officeMembers = this.commonService.mapOfficers(data);
    });
    this.commonService.doGet("assets/content/sexton/Sexton.json").subscribe((data:any) =>{
      this.sextons = this.commonService.mapOfficers(data);
    });
    this.commonService.doGet("assets/content/auditors/Auditors.json").subscribe((data:any) =>{
      this.auditors = this.commonService.mapOfficers(data);
    });

    this.commonService.doGet("assets/content/kaisthanasamithy/Kaisthanasamithy.json").subscribe((data:any) =>{
      this.kaisthanasamithy = this.commonService.mapOfficers(data);
    });

    
  }
}
