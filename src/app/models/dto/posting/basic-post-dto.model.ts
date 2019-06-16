import {User} from '../user-dto/user';
import {TagDto} from './tag.model';

export interface BasicPostDto {
  responseCode : string,
  responseMessage : string,
  postId : number,
  title : string,
  content : string,
  followerCount : number,
  creator : User,
  datePosted : Date,
  tags : TagDto[];
  _links : []
}
