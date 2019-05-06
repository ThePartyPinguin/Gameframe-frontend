import {Profile} from './profile';
import {User} from './user';

export interface UserProfile {
  profile: Profile,
  responseCode: number,
  responseMessage: string,
  user: User
}
