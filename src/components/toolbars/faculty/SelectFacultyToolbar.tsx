import {View, Text, StyleSheet} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useGetFacultyQuery} from '../../../redux/Service';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import vi from '../../../languages/vi.json';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import SessionComponent from '../../session/SessionComponent';
import {Colors} from '../../../constants/Colors';
import {globalStyles} from '../../../styles/GlobalStyles';
import {SERVER_ADDRESS} from '../../../constants/SystemConstant';
import axios from 'axios';
import Loading from '../../loading/Loading';
import {ActivityIndicator} from 'react-native-paper';
import RowComponent from '../../row/RowComponent';
import styles from './SelectFacultyToolbar.style';

interface DataItem {
  id: number;
  facultyGroupCode: number;
  oldName: string;
  name: string;
}

interface Props {
  onSelectFacultyEvent: (code: string) => void;
}

setTranslations({vi, jp, en});
setDefaultLanguage('jp');

const SelectFacultyToolbar = (props: Props) => {
  console.log('===============SelectFacultyToolbar=====================');
  const t = useTranslation();
  const {data, error, isLoading} = useGetFacultyQuery();

  return (
    <SessionComponent backgroundColor={'transparent'}>
      <RowComponent>
        <Dropdown
          style={[
            styles.dropdown,
            {backgroundColor: isLoading ? Colors.GREY4 : Colors.WHITE},
            (data?.data.length ?? 0) === 0 && styles.dropdownUnHaveValues,
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data?.data ?? []}
          search
          labelField={'name'}
          valueField="id"
          placeholder={t('SelectFaculty.selectFacultyPlaceholder')}
          searchPlaceholder={t('SelectFaculty.selectFacultyTextSearch')}
          onChange={(item: any) => {
            props.onSelectFacultyEvent(item.facultyGroupCode);
          }}
        />
        {isLoading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size={30}
            color={Colors.COLOR_BTN_BLUE_PRIMARY}
          />
        )}
      </RowComponent>
    </SessionComponent>
  );
};

export default memo(SelectFacultyToolbar);
