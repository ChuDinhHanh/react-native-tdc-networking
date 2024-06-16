import {Comment} from './Comment';

export interface ModalComments {
  id: number;
  userCreatedPostId: number;
  group: string;
  comments: Comment[] | [];
}
