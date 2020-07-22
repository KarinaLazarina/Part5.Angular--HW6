import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {CommentService} from '../../services/comment.service';
import {Comment} from '../../models/comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: Post[];
  postById: Post;
  form: FormGroup;
  post: FormControl = new FormControl('');

  formComments: FormGroup;
  comment: FormControl = new FormControl('');
  comments: Comment[];
  commentById: Comment;

  constructor(private postService: PostService, private commentService: CommentService) {
    postService.getPosts().subscribe(value => this.posts = value);
    this.form = new FormGroup({
      post: this.post
    });

    commentService.getComments().subscribe(value => this.comments = value);
    this.formComments = new FormGroup({
      comment: this.comment
    });
  }

  find(form: FormGroup): void{
    this.postService.getOnePost(form.value.post).subscribe(value => this.postById = value);
  }

  findComment(form: FormGroup): void{
    console.log(form);
    this.commentService.getOneComment(form.value.comment).subscribe(value => this.commentById = value);
  }
}
