import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-forum-full-post',
  templateUrl: './forum-full-post.component.html',
  styleUrls: ['./forum-full-post.component.css']
})
export class ForumFullPostComponent implements OnInit {

  postId : string;

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get("postId");
  }

}
