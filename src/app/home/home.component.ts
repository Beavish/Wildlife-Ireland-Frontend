import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  posts?: PostModel[];
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    ) { }

  ngOnInit(): void {
    this.getPosts();
  }
  private getPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
      console.log(data.length);
      
    }, error => {
      throwError(error);
    });
  }

}
