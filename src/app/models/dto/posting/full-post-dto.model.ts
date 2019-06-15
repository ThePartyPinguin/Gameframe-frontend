import {User} from '../user-dto/user';
import {TagDto} from './tag.model';
import {CommentDto} from './comment-dto.model';

export interface FullPostDto {
  responseCode : string,
  responseMessage : string,
  postId : number,
  title : string,
  content : string,
  followerCount : number,
  creator : User,
  datePosted : Date,
  tags : TagDto[];
  comments : CommentDto[];
}
