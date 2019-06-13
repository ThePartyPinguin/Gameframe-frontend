import {Component, Input, OnInit} from '@angular/core';
import {BasicPostDto} from '../../../models/dto/posting/basic-post-dto.model';

@Component({
  selector: 'app-forum-post-summary',
  templateUrl: './forum-post-summary.component.html',
  styleUrls: ['./forum-post-summary.component.css']
})
export class ForumPostSummaryComponent implements OnInit {

  @Input()
  postDto : BasicPostDto;

  postDate : Date;

  constructor() { }

  ngOnInit() {
    console.log(this.postDto.tags[0].tagString);
    this.postDate = new Date(this.postDto.datePosted);
  }

}
