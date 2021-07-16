import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from './create-post.payload';
import { AuthService } from 'src/app/auth/shared/auth.service'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;
  postPayload: CreatePostPayload;

  constructor(private router: Router, private postService: PostService,private authService: AuthService ) {
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
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}