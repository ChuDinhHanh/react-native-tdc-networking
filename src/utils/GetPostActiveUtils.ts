import {View, Text} from 'react-native';
import React from 'react';
import {Variable} from '../constants/Variables';

export const GetPostActive = (active: number) => {
  let flag = false;
  if (active === Variable.NUMBER_POST_ACTIVE) {
    flag = true;
  }
  return flag;
};
