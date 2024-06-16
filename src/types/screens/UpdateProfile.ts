import {Business} from '../Business';
import {Faculty} from '../Faculty';
import {Student} from '../Student';

export interface UpdateProfile {
  userData: Student | Faculty | Business;
}
