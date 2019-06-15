export interface CommentDto {
  id : number;
  userId : number;
  commentContent : string;
  dateCreated : Date;
  edited : boolean;
  dateEdited : Date;
}
