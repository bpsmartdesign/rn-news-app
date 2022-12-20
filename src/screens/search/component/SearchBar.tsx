import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//
const SearchBar = ({inputTerm, setInputTerm, searchInputTerm}: any) => {
  return (
    <View style={styles.backgroundStyle}>
      <Ionicons name="search" style={styles.iconStyle} size={25} />
      <TextInput
        placeholder="Search"
        style={styles.inputStyles}
        value={inputTerm}
        onChangeText={setInputTerm}
        onEndEditing={searchInputTerm}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 8,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    // elevation: 10,
  },
  iconStyle: {
    alignSelf: 'center',
    marginHorizontal: 15,
    color: 'gray',
  },
  inputStyles: {
    flex: 1,
  },
});

export default SearchBar;
