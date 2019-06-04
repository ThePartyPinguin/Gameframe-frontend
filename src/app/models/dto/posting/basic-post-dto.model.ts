import {User} from '../user-dto/user';

export interface BasicPostDto {
  responseCode : string,
  responseMessage : string,
  postId : number,
  title : string,
  followerCount : number,
  creator : User,
  datePosted : Date,
  tags : [];
}
