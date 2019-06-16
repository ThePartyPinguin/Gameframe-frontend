import {BasicPostResponseList} from './basic-post-response-list.model';

export interface PostListDto {
  _embedded : BasicPostResponseList;
  _links : [{self : [{href : string}]}]
}
