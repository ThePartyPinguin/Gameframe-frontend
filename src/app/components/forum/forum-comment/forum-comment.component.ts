import {Component, Input, OnInit} from '@angular/core';
import {FullCommentDto} from '../../../models/dto/posting/full-comment-dto.model';

@Component({
  selector: 'app-forum-comment',
  templateUrl: './forum-comment.component.html',
  styleUrls: ['./forum-comment.component.css']
})
export class ForumCommentComponent implements OnInit {

  @Input()
  fullCommentDto : FullCommentDto;

  dateCommented : Date;

  commentLines : string[];


  constructor() { }

  ngOnInit() {
    console.log(this.fullCommentDto);
    this.dateCommented = new Date(this.fullCommentDto.comment.dateCreated)

    this.commentLines = this.fullCommentDto.comment.commentContent.split("<br>")
  }

}
