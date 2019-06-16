import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostingService} from '../../../services/posting/posting.service';
import {FullPostDto} from '../../../models/dto/posting/full-post-dto.model';
import {FullCommentDto} from '../../../models/dto/posting/full-comment-dto.model';
import {LoginService} from '../../../services/auth/login.service';

@Component({
  selector: 'app-forum-full-post',
  templateUrl: './forum-full-post.component.html',
  styleUrls: ['./forum-full-post.component.css']
})
export class ForumFullPostComponent implements OnInit {

  postId : string;
  post : FullPostDto;
  postLoaded : boolean;
  postContent : string[];
  datePosted : Date;
  followSubmit : boolean;
  isFollowing : boolean;

  constructor(private route: ActivatedRoute, private postService : PostingService) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get("postId");
    this.postLoaded = false;
    this.postService.getPostById(+this.postId).subscribe((response) => {
      this.post = response;

      this.datePosted = new Date(this.post.datePosted);
      this.postContent = this.post.content.split("<br>");

      if(this.isAuthenticated()){
        this.checkIsFollowing();
      }

    })
  }

  commentAdded(comment : FullCommentDto){
    this.post.comments.push(comment);
  }

  isAuthenticated(){
    return LoginService.isAuthenticated();
  }

  followPost(){
    this.followSubmit = true;
    this.postService.followPost(this.post.postId).subscribe((response) => {
      this.checkIsFollowing();
      this.followSubmit = false;
    });
  }

  stopFollowingPost(){
    this.followSubmit = true;
    this.postService.stopFollowingPost(this.post.postId).subscribe((response) => {
      this.checkIsFollowing();
      this.followSubmit = false;
    });
  }

  checkIsFollowing(){
    this.postService.isFollowingPost(this.post.postId).subscribe((response) => {

      this.isFollowing = response.responseMessage === 'true';
      this.postLoaded = true;
    });
  }

}
