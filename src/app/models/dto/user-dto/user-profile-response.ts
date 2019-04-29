import {Profile} from './profile';
import {User} from './user';

export interface UserProfileResponse {
  profile: Profile,
  userId : number,
  token : string,
  user: User
}
