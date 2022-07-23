import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  data : any = {}
  officeMembers : any = [];
  auditors : any = [];
  sextons : any = [];
  kaisthanasamithy: any = [];
  selectedOffice : any = null
  years : any = []
  constructor(private commonService : CommonService) {
    this.loadAllOfficeBearers();
   }

  loadAllOfficeBearers(){
    let date = new Date();
    let isFound = true;
    while(isFound){
      let fyYear = this.getCurrentFinancialYear(date)
      this.data[fyYear] = {}
      console.log(fyYear)
      this.commonService.doGet(`assets/content/officeBearers/${fyYear}.json`).subscribe(
        (data:any) =>{
          if(!this.selectedOffice){
            let currentFY = this.getCurrentFinancialYear(new Date())
            this.selectedOffice = this.data[currentFY]
          }
          this.data[fyYear]['officeMembers']=  this.commonService.mapOfficers(data);
          console.log(this.data[fyYear]['officeMembers'])
        },
          (error:any) => {
            isFound = false;
            console.log("officeMembers not found for "+fyYear);
        });
      // this.commonService.doGet(`assets/content/sexton/${fyYear}.json`).subscribe((data:any) =>{
      //   this.data[fyYear]['sextons'] = this.commonService.mapOfficers(data);
      // },
      // (error:any) => {
      //   console.log("Sexton not found for "+fyYear);
      // });
      // this.commonService.doGet(`assets/content/auditors/${fyYear}.json`).subscribe((data:any) =>{
      //   this.data[fyYear]['auditors'] = this.commonService.mapOfficers(data);
      // },
      //   (error:any) => {
      //     console.log("Auditors not found for "+fyYear);
      //   });
  
      // this.commonService.doGet(`assets/content/kaisthanasamithy/${fyYear}.json`).subscribe((data:any) =>{
      //   this.data[fyYear]['kaisthanasamithy'] = this.commonService.mapOfficers(data);
        
      // },
      //   (error:any) => {
      //     console.log("Kaisthanasamithy not found for "+fyYear);
      //   });
        date.setFullYear( date.getFullYear() - 1);
        if(fyYear == '2000-2001'){
          isFound = false;
        }

    }
    this.years = Object.keys(this.data)

  }

  onYearchange(fYear:any){
    let year = fYear.value
    this.selectedOffice = this.data[year]
    console.log(fYear)
  }
  getCurrentFinancialYear(date : Date) {
    let fiscalyear = "";
    let today = date;
    if ((today.getMonth() + 1) <= 3) {
      fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
    } else {
      fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
    }
    return fiscalyear
  }

  ngOnInit(): void {
    let header = document.getElementById('header');
    if(header){
      header.style.backgroundColor = '#0291d9';
    }
  }
}
