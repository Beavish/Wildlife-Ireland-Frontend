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

  this.postService.getAllPosts().subscribe(data => {
  //  this.data.forEach(i =>this.names.push(i.name));
   
  });
  
}

ngOnInit(): void {

}

}