import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-parish-vicar',
  templateUrl: './parish-vicar.component.html',
  styleUrls: ['./parish-vicar.component.css']
})
export class ParishVicarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let header = document.getElementById('header');
    if(header){
      header.style.backgroundColor = '#0291d9';
    }

  }

}
