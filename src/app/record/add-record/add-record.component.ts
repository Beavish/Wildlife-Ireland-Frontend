import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { RecordService } from 'src/app/shared/record.service';
import { AddRecordPayload } from './add-record.payload';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  addRecordForm!: FormGroup;
  addRecordPayload!: AddRecordPayload;

  

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
  }

  createPost() {
    this.addRecordPayload.name = this.addRecordForm.get('name')!.value;
    this.addRecordPayload.quantity = this.addRecordForm.get('quantity')!.value;
    this.addRecordPayload.create_date = Date.now();
    this.addRecordPayload.geo_location = '';
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