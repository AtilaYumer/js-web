import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/interfaces/post.interface';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  posts!: IPost[];

  constructor(private postService: PostsService) { }

  getLastPosts(): void {
    this.postService.loadLastPosts().subscribe(posts => this.posts = posts);
  }

  ngOnInit(): void {
    this.getLastPosts();
  }

}
