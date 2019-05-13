import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {CreatePostDto} from '../../models/dto/create-post/createPostDto.model';

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  postDto : CreatePostDto;

  constructor(private http : HttpClient, private router : Router) { }

  createNewPost(title : string, content : string, tags : string){

    let userId = localStorage.getItem(environment.user_id);

    this.postDto = new class implements CreatePostDto {
      postContent: string;
      postTitle: string;
      tagLine: string;
      userId: number;
    }

    this.postDto.userId = Number.parseInt(userId);
    this.postDto.postContent = content;
    this.postDto.postTitle = title;
    this.postDto.tagLine = tags;


    return this.http.post(environment.apiUrl + "/post/private/new", this.postDto, {observe : 'response', headers : {'Content-Type' : 'application/json'}})
  }


}
