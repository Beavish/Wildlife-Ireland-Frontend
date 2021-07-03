import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post!: PostModel;
  loggedInUser?: number;
  userCreator: boolean = false;
  userId!: {};


  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private router: Router, private authService: AuthService,private toastr: ToastrService) {
    this.postId = this.activateRoute.snapshot.params.id;

  }

  ngOnInit(): void {
    this.getPostById();

  }



  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
      this.loggedInUser = this.authService.getUserId();
      this.displayOptions();

    }

      , error => {
        throwError(error);
      });
  }

  private displayOptions() {

    console.log(this.loggedInUser);
    console.log(this.post.userId);
    console.log(this.userCreator);
    if (this.post.userId === this.loggedInUser) {
      this.userCreator = true;
      console.log(this.userCreator);

    }

  }

  private deletePost() {
    this.postService.deletePost(this.postId).subscribe(data => {
      this.post = data;
      this.router.navigateByUrl('/');
      this.toastr.success('Post Deleted Successfully');

    }

      , error => {
        throwError(error);
      });
  }



}
