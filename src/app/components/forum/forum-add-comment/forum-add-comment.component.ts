import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FullPostDto} from '../../../models/dto/posting/full-post-dto.model';
import {PostingService} from '../../../services/posting/posting.service';
import {FullCommentDto} from '../../../models/dto/posting/full-comment-dto.model';

@Component({
  selector: 'app-forum-add-comment',
  templateUrl: './forum-add-comment.component.html',
  styleUrls: ['./forum-add-comment.component.css']
})
export class ForumAddCommentComponent implements OnInit {

  @Input()
  post : FullPostDto;

  @Output()
  commentAddedCallback = new EventEmitter<FullCommentDto>();

  commentForm : FormGroup;
  formInValid : boolean;
  minCharsAnswer : number = 100;

  constructor(private postingService : PostingService) {
    this.commentForm = new FormGroup({
      answerControl : new FormControl('', {
        validators : [Validators.required, Validators.minLength(this.minCharsAnswer)]
      })
    })
  }

  ngOnInit() {
  }

  get commentFormControls(){
    return this.commentForm.controls;
  }

  get answerLength(){
    return this.commentFormControls.answerControl.value.toString().length
  }

  submitAnswer() {

    if (this.commentForm.invalid) {
      this.formInValid = true;
      return;
    }

    let answer = this.commentFormControls.answerControl.value.toString();

    let splitContent = answer.split('\n');

    let newContent : string = "";

    for (let line of splitContent){
      newContent += line;
      newContent += "<br>";
    }

    this.postingService.addCommentToPost(this.post.postId, newContent).subscribe(response => {
      this.commentAddedCallback.emit(response);
    });
  }



}
