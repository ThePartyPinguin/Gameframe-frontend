import {Profile} from './profile';
import {User} from './user';

export interface UserProfile {
  responseCode: number,
  responseMessage: string,
  profile: Profile,
  userId : number,
  token : string,
  user: User
}
