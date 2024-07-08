import React, { useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Text, TextInput, View } from 'react-native';
import { SERVER_ADDRESS } from '../../constants/SystemConstant';
import { Variable } from '../../constants/Variables';
import { useAppSelector } from '../../redux/Hook';
import styles from './SearchScreen.style';
import { Dropdown } from 'react-native-element-dropdown';

const SearchScreen = () => {
  const t = useTranslation();
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [subjects, setSubjects] = useState('user');
  const [qty, setQty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(t('SearchComponent.user'));
  const [label2, setLabel2] = useState(`- - ${t('SearchComponent.student')} - -`);
  const [type, setType] = useState(Variable.TYPE_POST_STUDENT);
  let URL = `${SERVER_ADDRESS}api/find/post`;
  const [items, setItems] = useState([
    {
      label: t('SearchComponent.user'),
      value: 'user',
      children: [
        { label: `- - ${t('SearchComponent.student')} - -`, value: Variable.TYPE_POST_STUDENT },
        { label: `- - ${t('SearchComponent.business')} - -`, value: Variable.TYPE_POST_BUSINESS },
        { label: `- - ${t('SearchComponent.faculty')} - -`, value: Variable.TYPE_POST_FACULTY }
      ]
    }, {
      label: t('SearchComponent.post'),
      value: 'post',
      children: [
        { label: `- - ${t('SearchComponent.normal')} - -`, value: Variable.TYPE_NORMAL_POST },
        { label: `- - ${t('SearchComponent.survey')} - -`, value: Variable.TYPE_SURVEY_POST },
        { label: `- - ${t('SearchComponent.recruitment')} - -`, value: Variable.TYPE_RECRUITMENT_POST }
      ]
    }
  ]);

  return (
    <View style={styles.searchScreen}>
      <View style={styles.operation}>
        <TextInput
          style={styles.search}
          placeholder={t('SearchComponent.search')}
          placeholderTextColor='#000000'
          value={search}
          onChangeText={(txt) => setSearch(txt)}
        />
        <View style={styles.select}>
          <View style={styles.drop}>
            <Dropdown
              style={styles.dropDown}
              data={items}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={label}
              value={value}
              onChange={item => {
                setMasterData([])
                setQty(0)
                setLabel(item.label)
                setSubjects(item.value) 
                setType(item.label === t('SearchComponent.post') ? items[1].children[0].value  : items[0].children[0].value)
                setLabel2(item.label === t('SearchComponent.post') ? items[1].children[0].label : items[0].children[0].label)
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;
