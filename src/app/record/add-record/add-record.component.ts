import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { RecordService } from 'src/app/shared/record.service';
import { AddRecordPayload } from './add-record.payload';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
// useful https://medium.com/front-end-weekly/angular-9-create-an-interactive-map-with-openlayers-part-i-1b7c30d37ceb


@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  addRecordForm!: FormGroup;
  addRecordPayload!: AddRecordPayload;
  map!: Map;

  

  constructor(private router: Router,private recordService: RecordService ) {
    this.addRecordPayload= {
      record_id: 0,
      create_date:0,
      plant: false,
      animal: false,
      name: '',
      quantity: 0,
      geo_location!: ''
    }
  }

  ngOnInit() {
    this.addRecordForm = new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      geo_location:new FormControl('', Validators.required),
      plant: new FormControl('', Validators.required),
      animal: new FormControl('', Validators.required),
    });

    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([-6.2364057,53.391747 ]),
        zoom: 20
        

      })
    });
  }

  createPost() {
    this.addRecordPayload.name = this.addRecordForm.get('name')!.value;
    this.addRecordPayload.quantity = this.addRecordForm.get('quantity')!.value;
    this.addRecordPayload.create_date = Date.now();
    this.addRecordPayload.geo_location = this.addRecordForm.get('geo_location')!.value
    //this.postPayload.user_id = this.authService.getUserId();

    this.recordService.addRecord(this.addRecordPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, (error: any) => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

  getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;

          const location = "Lat "+latitude + " Long "+longitude;
        
        this.addRecordForm.get('geo_location')?.setValue(location);
        
        });
    } else {
      (error: any) => {
        throwError(error);
      }
    }
  }
 
}