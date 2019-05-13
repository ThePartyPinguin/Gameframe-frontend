import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostingService} from '../../../services/posting/posting.service';

@Component({
  selector: 'app-forum-create-post',
  templateUrl: './forum-create-post.component.html',
  styleUrls: ['./forum-create-post.component.css']
})
export class ForumCreatePostComponent implements OnInit {

  formGroup : FormGroup;

  constructor(private postingService : PostingService) {
    this.formGroup = new FormGroup({

      titleInput : new FormControl('',{
        validators : [ Validators.required ]
      }),

      contentInput : new FormControl('',{
        validators : [ Validators.required ]
      }),

      tagInput : new FormControl('',{
        validators : [ Validators.required ]
      })
    })
  }

  ngOnInit() {
  }

  get formControls(){
    return this.formGroup.controls;
  }

  createNewPost(){

    let title = this.formControls.titleInput.value;
    let content = this.formControls.contentInput.value;
    let tags = this.formControls.tagInput.value;

    this.postingService.createNewPost(title, content, tags).subscribe(
      (response) =>{
        console.log(response);
      }
    )
  }

}
