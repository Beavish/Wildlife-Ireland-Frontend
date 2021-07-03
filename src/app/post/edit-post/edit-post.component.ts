import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { CreatePostPayload } from '../create-post/create-post.payload';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postId: number;
  post!: PostModel;
  loggedInUser?: number;
  userCreator: boolean = false;
  userId!: {};
  editPostForm!: FormGroup;
  postPayload: CreatePostPayload;


  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private router: Router, private authService: AuthService) {
    this.postId = this.activateRoute.snapshot.params.id;
    this.postPayload = {

      title: '',
      content: '',
      create_date: Date.now(),
      username: this.authService.getUserName(),
      userId: this.authService.getUserId(),
      post_id:this.postId
    }

  }


  ngOnInit(): void {
    this.getPostById();

  }



  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
      this.loggedInUser = this.authService.getUserId();
      this.editPostForm = new FormGroup({
        title: new FormControl(data.title, Validators.required),
        content: new FormControl(data.content, Validators.required),
      });


    }


      , error => {
        throwError(error);
      });
  }

  updatePost() {
    this.postPayload.title = this.editPostForm.get('title')!.value;
    this.postPayload.content = this.editPostForm.get('content')!.value;
    this.postPayload.create_date = Date.now();
    

    this.postService.updatePost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }




}
