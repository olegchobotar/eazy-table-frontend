import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { Tag } from '~/types';
import TagComponent from '~/components/atoms/Tag/Tag';

interface Props {
  tags: Tag[];
}

const Tags = (props: Props) => {
  const { tags } = props;

  return (
    <View style={styles.container}>
      {tags.map((tag, index) => (
        <TagComponent key={index} tag={tag} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Tags;
