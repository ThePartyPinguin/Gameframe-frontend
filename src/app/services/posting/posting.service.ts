import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostDto} from '../../models/dto/posting/post-dto.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  constructor(private http : HttpClient) { }

  postNewQuestion(postDto : PostDto){
    return this.http.post<PostDto>(environment.apiUrl + "/posting/private/new", postDto);
  }
}
