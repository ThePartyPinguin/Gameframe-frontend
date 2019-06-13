import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/authentication.guards';
import {LoginService} from '../../../services/auth/login.service';
import {PostingService} from '../../../services/posting/posting.service';
import {PostDto} from '../../../models/dto/posting/post-dto.model';
import {BasicPostDto} from '../../../models/dto/posting/basic-post-dto.model';

@Component({
  selector: 'app-forum-main',
  templateUrl: './forum-main.component.html',
  styleUrls: ['./forum-main.component.css']
})
export class ForumMainComponent implements OnInit {

  currentPagePosts : BasicPostDto[];

  constructor(private loginService : LoginService, private postService : PostingService) { }

  ngOnInit() {
    this.postService.getPostsPage(10, 0).subscribe(response => {
      console.log(response);
      this.currentPagePosts = response;
    })
  }

  get authenticated(){
    return this.loginService.isAuthenticated();
  }



}
