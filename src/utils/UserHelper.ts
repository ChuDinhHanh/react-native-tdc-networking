import {Variable} from '../constants/Variables';
import {Business} from '../types/Business';
import {Faculty} from '../types/Faculty';
import {Student} from '../types/Student';
import {User} from '../types/User';

export function isStudent(user?: any): user is Student {
  try {
    return (
      user !== undefined &&
      user instanceof Object &&
      user !== null &&
      (user as User).roleCodes!.includes(Variable.TYPE_POST_STUDENT)
    );
  } catch (error) {
    return false;
  }
}

export function isBusiness(user?: any): user is Business {
  try {
    return (
      user !== undefined &&
      user instanceof Object &&
      user !== null &&
      (user as User).roleCodes!.includes(Variable.TYPE_POST_BUSINESS)
    );
  } catch (error) {
    return false;
  }
}

export function isFaculty(user?: any): user is Faculty {
  try {
    return (
      user !== undefined &&
      user instanceof Object &&
      user !== null &&
      (user as User).roleCodes!.includes(Variable.TYPE_POST_FACULTY)
    );
  } catch (error) {
    return false;
  }
}
