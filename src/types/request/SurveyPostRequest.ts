import {Question} from '../response/QuestionResponse';

export interface SurveyPostRequest {
  postId?: number;
  groupId?: number;
  type: string;
  title: string;
  description: string;
  userId?: number;
  questions: Question[];
}
