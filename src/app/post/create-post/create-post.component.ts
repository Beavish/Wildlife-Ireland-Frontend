import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from './create-post.payload';
import { AuthService } from 'src/app/auth/shared/auth.service'
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;
  postPayload: CreatePostPayload;
  myfile!: File;
  imagePath: any;
  imgURL: any;
  message!: string


  constructor(private router: Router, private postService: PostService,private authService: AuthService , private imageService: ImageService) {
    this.postPayload = {
      title: '',
      content: '',
      create_date: Date.now(),
      username: this.authService.getUserName(),
      userId: this.authService.getUserId(),
      educational: false,
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      checkbox: new FormControl('',Validators.required),
    });
  }

  createPost() {
    this.postPayload.title = this.createPostForm.get('title')!.value;
    this.postPayload.content = this.createPostForm.get('content')!.value;
    this.postPayload.create_date = Date.now();
    this.postPayload.educational = this.createPostForm.get('checkbox')?.value;
    //this.postPayload.user_id = this.authService.getUserId();

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.createImage(data.post_id);
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

  preview(files: string | any[]) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    this.myfile =files[0];
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  createImage(record_id : number){

      this.imageService.addPostImage(this.myfile!,JSON.stringify(record_id)).subscribe((data) => {
        console.log(data);
      //this.router.navigateByUrl('/');
           }, (error: any) => {
        throwError(error);
      });
  }

}