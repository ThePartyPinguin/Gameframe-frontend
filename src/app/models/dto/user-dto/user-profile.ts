import {Profile} from './profile';
import {User} from './user';

export interface UserProfile {
  profile: Profile,
  userId : number,
  token : string,
  user: User
}
