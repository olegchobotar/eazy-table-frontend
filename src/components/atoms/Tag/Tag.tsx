import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Tag } from '~/types';

interface Props {
  tag: Tag;
}

const TagComponent = (props: Props) => {
  const { tag } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{tag.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderColor: '#264CD1',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 5,
  },
  text: {},
});

export default TagComponent;
