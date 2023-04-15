import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';

interface Props {
  timeSlot: string;
}

const TimeSlot = (props: Props) => {
  const { timeSlot } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{timeSlot}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#264CD1',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 5,
  },
  text: {
    color: '#fff',
  },
});

export default TimeSlot;
