import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostingService} from '../../../services/posting/posting.service';
import {PostDto} from '../../../models/dto/posting/post-dto.model';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-forum-create-post',
  templateUrl: './forum-create-post.component.html',
  styleUrls: ['./forum-create-post.component.css']
})
export class ForumCreatePostComponent implements OnInit {

  formGroup : FormGroup;
  submitted : boolean;


  constructor( private postService : PostingService, private userService : UserService) {
    this.formGroup = new FormGroup({
      postTitleInput: new FormControl('',
        {validators : [Validators.required]}),

      postContentInput: new FormControl('',
        {validators: [Validators.required]}),

      postTagsInput: new FormControl('',
        {validators: [Validators.required]})
    })


  }

  ngOnInit() {
  }

  submitPostForm(){
    this.submitted = true;

    if(!this.formGroup.valid){
      return;
    }

    // let postDto : PostDto = {
    //   userId: this.userService.getUserId();
    //
    // }

    // this.postService.postNewQuestion()
  }
}
