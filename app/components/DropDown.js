import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors,FontSizes } from '../helper/theme';
import SelectDropdown from 'react-native-select-dropdown';

const App = ({data, lable, type, selected,setSelected}) => {
  return (
    <View style={styles.container}>
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          setSelected(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        defaultButtonText={lable}
        buttonStyle={{...styles.dropdown,
          backgroundColor:type ? Colors.primary3 : null}}
        buttonTextStyle={styles.textStyle}
        rowStyle={{...styles.dropdown,borderWidth:0,borderRadius:0}}
        rowTextStyle={styles.textStyle}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    alignItems:'center',
    paddingTop:20,
  },
  dropdown: {
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    height:60,
    width:'100%',
  },
  textStyle: {
    fontSize: FontSizes.p3,
    alignSelf:'center',
    fontFamily:'OpenSans-SemiBold',
    color:Colors.grey8C,
  },
});
