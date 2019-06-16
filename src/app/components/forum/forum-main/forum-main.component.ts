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
  currentPage : number;
  pageSize : number;

  loadingPage : boolean;

  overRuleNextPage : boolean;

  constructor(private loginService : LoginService, private postService : PostingService) { }

  ngOnInit() {
    this.pageSize = 7;
    this.currentPage = 0;
    this.loadCurrentPage();
  }

  get authenticated(){
    return LoginService.isAuthenticated();
  }

  getNextPage(){

    if(this.overRuleNextPage)
      return;

    this.currentPage++;
    this.loadCurrentPage();
  }

  getPreviousPage(){
    this.currentPage--;

    if(this.overRuleNextPage)
      this.overRuleNextPage = false;

    this.loadCurrentPage();
  }

  loadCurrentPage(){
    this.loadingPage = true;
    this.postService.getPostsPage(this.pageSize, this.currentPage).subscribe(response => {
      try{
        this.currentPagePosts = response._embedded.basicPostResponseList;
      }
      catch (e) {
        this.currentPage--;
        this.overRuleNextPage = true;
        this.loadCurrentPage();
      }


      this.loadingPage = false;
    })
  }



}
