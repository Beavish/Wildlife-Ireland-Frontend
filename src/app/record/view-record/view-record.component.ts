import { getLocaleNumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { throwError } from 'rxjs';
import { RecordModel } from 'src/app/shared/record-model';
import { RecordService } from 'src/app/shared/record.service';
Chart.register(...registerables);


@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.css']
})
export class ViewRecordComponent implements OnInit {

  chart!: Chart;
  records!: RecordModel[];
  names : string[] = [];
  quantity : number[] = [];

 

  constructor(private router: Router, private recordService: RecordService) {

  }


  ngOnInit(): void {

    // load records before getting chart.
    this.getData();
    //sample chart test data

  }


  createChart(){

    console.log(this.names.values())

    this.chart = new Chart("myChart", {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: this.names,
        datasets: [{
          label: "Animals in Database",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.quantity,
        }]
      },

      // Configuration options go here
      options: {}
    });

  }

 getData(){
  this.recordService.getData().subscribe((data) => {
    this.records = data;


    this.records.forEach(i =>this.names.push(i.name));
    this.records.forEach(i =>this.quantity.push(i.quantity));
    console.log(this.quantity)

    this.createChart();
  }, (error: any) => {
    throwError(error);
  })
 }



}

