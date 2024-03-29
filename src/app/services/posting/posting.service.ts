import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostDto} from '../../models/dto/posting/post-dto.model';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {BasicPostDto} from '../../models/dto/posting/basic-post-dto.model';
import {FullCommentDto} from '../../models/dto/posting/full-comment-dto.model';
import {FullPostDto} from '../../models/dto/posting/full-post-dto.model';
import {BareResponse} from '../../models/dto/bare-response.model';
import {PostListDto} from '../../models/dto/posting/post-list-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  constructor(private http : HttpClient, private router : Router) { }

  createNewPost(title : string, content : string, tags : string){

    let userId = localStorage.getItem(environment.user_id);

    let postDto : PostDto = new class implements PostDto {
      postContent: string;
      postTitle: string;
      tagLine: string;
      userId: number;
    };

    postDto.userId = Number.parseInt(userId);
    postDto.postContent = content;
    postDto.postTitle = title;
    postDto.tagLine = tags;

    return this.http.post<FullPostDto>(environment.apiUrl + "/post/private/new", postDto)
  }

  getPostsPage(postsPerPage : number, pageNumber : number){
    return this.http.get<PostListDto>(environment.apiUrl + "/post/public/basic?page="+pageNumber+"&perPageCount=" + postsPerPage)
  }

  getPostById(id : number){
    return this.http.get<FullPostDto>(environment.apiUrl + "/post/public?postId=" + id)
  }

  addCommentToPost(postId : number, commentContent : string){

    let userId = localStorage.getItem(environment.user_id);

    return this.http.post<FullCommentDto>(environment.apiUrl + '/post/private/comment', {commenterId : Number.parseInt(userId), postId : postId, commentContent : commentContent})
  }

  followPost(postId: number){
    return this.http.post<BareResponse>(environment.apiUrl + '/post/private/follow?postId=' + postId, {})
  }

  stopFollowingPost(postId : number){
    return this.http.put<BareResponse>(environment.apiUrl + '/post/private/follow/stop?postId=' + postId, {})
  }

  isFollowingPost(postId : number){
    return this.http.get<BareResponse>(environment.apiUrl + '/post/private/follow/ami?postId=' + postId);
  }
}
