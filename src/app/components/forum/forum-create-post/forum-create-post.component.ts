import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostingService} from '../../../services/posting/posting.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {Router} from '@angular/router';
import {BasicPostDto} from '../../../models/dto/posting/basic-post-dto.model';

@Component({
  selector: 'app-forum-create-post',
  templateUrl: './forum-create-post.component.html',
  styleUrls: ['./forum-create-post.component.css']
})
export class ForumCreatePostComponent implements OnInit {


  postFormGroup : FormGroup;
  postFormInvalid : boolean;

  checkFormGroup : FormGroup;
  checkFormInvalid : boolean;

  submitted : boolean;

  constructor( private postingService : PostingService, private router : Router) {
    this.postFormGroup = new FormGroup({
      postTitleInput: new FormControl('',
        {validators : [Validators.required]}),

      postContentInput: new FormControl('',
        {validators: [Validators.required]}),

      postTagsInput: new FormControl('',
        {validators: [Validators.required]})
    });

    this.checkFormGroup = new FormGroup({
      contextCheck: new FormControl('',
        {validators: [Validators.requiredTrue]}),

      toolsCheck: new FormControl('',
        {validators: [Validators.requiredTrue]}),

      triedCheck: new FormControl('',
        {validators: [Validators.requiredTrue]}),

      errorMessages: new FormControl('',
        {validators: [Validators.requiredTrue]}),
    });
  }

  ngOnInit() {
  }

  get formControls(){
    return this.postFormGroup.controls;
  }

  createNewPost(){
    this.submitted = true;
    if(!this.checkFormGroup.valid){
      console.log(this.checkFormGroup.controls);
      this.checkFormInvalid = true;
      this.submitted = false;
      return;
    }

    this.checkFormInvalid = false;

    if(!this.postFormGroup.valid){
      this.postFormInvalid = true;
      this.submitted = false;
      return;
    }
    let title = this.formControls.postTitleInput.value;
    let content : string = this.formControls.postContentInput.value;
    let tags = this.formControls.postTagsInput.value;

    let splitContent = content.split('\n');

    let newContent : string = "";

    for (let line of splitContent){
      newContent += line;
      newContent += "<br>";
    }

    console.log(newContent);

    this.postingService.createNewPost(title, newContent, tags).subscribe(
      (response) =>{
        this.submitted = false;
        this.router.navigateByUrl('/forum/post/' + response.postId);
      }
    )
  }
}
