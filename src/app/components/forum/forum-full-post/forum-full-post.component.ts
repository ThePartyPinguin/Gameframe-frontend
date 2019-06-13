import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostingService} from '../../../services/posting/posting.service';
import {BasicPostDto} from '../../../models/dto/posting/basic-post-dto.model';

@Component({
  selector: 'app-forum-full-post',
  templateUrl: './forum-full-post.component.html',
  styleUrls: ['./forum-full-post.component.css']
})
export class ForumFullPostComponent implements OnInit {

  postId : string;
  post : BasicPostDto;
  postLoaded : boolean;

  constructor(private route: ActivatedRoute, private postService : PostingService) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get("postId");
    this.postLoaded = false;
    this.postService.getPostById(+this.postId).subscribe((response) => {
      this.post = response;
      this.postLoaded = true;
    })
  }

}