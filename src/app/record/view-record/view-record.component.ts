import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.css']
})
export class ViewRecordComponent implements OnInit {

  chart!: Chart;

  constructor() { }

  ngOnInit(): void {
     this.chart = new Chart("myChart", {
      // The type of chart we want to create
      type: 'bar',
  
      // The data for our dataset
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [{
              label: "My First dataset",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [0, 10, 5, 2, 20, 30, 45],
          }]
      },
  
      // Configuration options go here
      options: {}
  });
  }

}

