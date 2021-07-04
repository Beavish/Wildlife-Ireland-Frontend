import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { throwError } from 'rxjs';
import Map from 'ol/Map';
import Geolocation from 'ol/Geolocation';
import { WildlifeCrimePayload } from './wildlife-crime.payload';
import { WildlifeCrimeService } from '../shared/wildlife-crime.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wildlife-crime',
  templateUrl: './wildlife-crime.component.html',
  styleUrls: ['./wildlife-crime.component.css']
})
export class WildlifeCrimeComponent implements OnInit {
  reportCrimeForm!: FormGroup;
  wildLifeCrimePayload!: WildlifeCrimePayload;
  map!: Map;
  geolocation?: Geolocation;
  ipAddress!:string;  



  constructor(private router: Router, private wildlifeCrimeService: WildlifeCrimeService, private http: HttpClient) {
    this.wildLifeCrimePayload = {
      crime_id: 0,
      create_date: 0,
      description!: "",
      reporter_email!: "",
      reporter_ip!:"",
      geo_location!: ''
    }
  }

  ngOnInit() {
    this.reportCrimeForm = new FormGroup({
      email: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      geo_location: new FormControl('', Validators.required),
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [-7.962320112632559, 53.529225191630864],
        zoom: 6,
      }),

    });

    this.findMapLocation();
    this.getIP();  


  }


  addCrime() {
    this.wildLifeCrimePayload.reporter_email = this.reportCrimeForm.get('email')!.value;
    this.wildLifeCrimePayload.description = this.reportCrimeForm.get('description')!.value;
    this.wildLifeCrimePayload.create_date = Date.now();
    this.wildLifeCrimePayload.geo_location = JSON.stringify(this.reportCrimeForm.get('geo_location')!.value);
    this.wildLifeCrimePayload.reporter_ip = this.ipAddress;

    

    this.wildlifeCrimeService.addCrime(this.wildLifeCrimePayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, (error: any) => {
      throwError(error);
    })
  }

  disgardCrime() {
    this.router.navigateByUrl('/');
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        const location = longitude + "," + latitude;
        this.reportCrimeForm.get('geo_location')?.setValue(location);
      });
    } else {
      (error: any) => {
        throwError(error);
      }
    }
  }

  findMapLocation() {
    this.map.on('click', (e) => {
      this.reportCrimeForm.get('geo_location')?.setValue(e.coordinate);
    })
  }
   getIPAddress()  
  {  
    return this.http.get("http://api.ipify.org/?format=json"); 
  }

  getIP()  
  {  
    this.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
      console.log(res.ip);
    });  
  } 

}