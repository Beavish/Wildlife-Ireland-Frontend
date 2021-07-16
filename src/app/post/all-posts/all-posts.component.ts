import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
    posts?: PostModel[];


  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
   ) {

    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
     
    });
    
  }

  ngOnInit(): void {
  }

}