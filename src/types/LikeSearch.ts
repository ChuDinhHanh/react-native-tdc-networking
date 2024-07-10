import {LikeAction} from './LikeAction';

export interface LikeSearch extends LikeAction {
  type: string;
  search: string;
}
