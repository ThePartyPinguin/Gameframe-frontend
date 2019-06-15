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

  constructor(private route: ActivatedRoute, private postService : PostingService) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get("postId");
    this.postLoaded = false;
    this.postService.getPostById(+this.postId).subscribe((response) => {
      this.post = response;
      console.log(response);
      this.postLoaded = true;
      this.datePosted = new Date(this.post.datePosted);
      this.postContent = this.post.content.split("<br>")

    })
  }

  commentAdded(comment : FullCommentDto){
    this.post.comments.push(comment);
  }

  isAuthenticated(){
    return LoginService.isAuthenticated();
  }

}
