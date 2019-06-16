import {BasicPostDto} from './basic-post-dto.model';

export interface UserFollowedPostsDto {
  responseCode : number;
  responseMessage : string;
  posts : BasicPostDto[];
}
