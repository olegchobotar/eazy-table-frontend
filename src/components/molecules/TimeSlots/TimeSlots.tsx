import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { TimeSlot } from '~/components/atoms/TimeSlot';

interface Props {
  timeSlots: string[];
}

const TimeSlots = (props: Props) => {
  const { timeSlots } = props;

  return (
    <ScrollView horizontal>
      <View style={styles.container} onStartShouldSetResponder={() => true}>
        {timeSlots.map((slot, index) => (
          <TimeSlot key={index} timeSlot={slot} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default TimeSlots;
