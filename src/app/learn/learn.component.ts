import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})

export class LearnComponent implements OnInit {
  posts?: PostModel[];


constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
 ) {

  this.postService.getEducationalPosts().subscribe(data => {
  this.posts = data;
   
  });
  
}

ngOnInit(): void {

}

}