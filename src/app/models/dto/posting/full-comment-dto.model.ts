import {CommentDto} from './comment-dto.model';
import {User} from '../user-dto/user';

export interface FullCommentDto {
  comment : CommentDto;
  user : User;
}
