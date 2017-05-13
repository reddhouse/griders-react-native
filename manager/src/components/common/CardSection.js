import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    {/* When we pass an array for styles, the item with the highest index will
      overwrite the lower ones. Here we send our own custom style from CERTAIN
      parent components */}
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
