import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

interface Props {
  onPress: () => void;
  guestsNumber: number;
  reservationDateTime: Date;
}

const ReservationSelect = (props: Props) => {
  const {
    onPress,
    guestsNumber,
    reservationDateTime,
  } = props;
  const theme = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.column}>
        <Ionicons
          name="people"
          size={32}
          color={theme['color-primary-default']}
        />
        <Text>{guestsNumber}</Text>
      </View>
      <View style={[styles.column, styles.middleColumn]}>
        <Ionicons
          name="calendar-outline"
          size={32}
          color={theme['color-primary-default']}
        />
        <Text>{moment(reservationDateTime).format('DD/MM')}</Text>
      </View>
      <View style={styles.column}>
        <Ionicons
          name="time-outline"
          size={32}
          color={theme['color-primary-default']}
        />
        <Text>{moment(reservationDateTime).format('HH:mm')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 2,
    minHeight: 100,
    borderColor: '#f1eeee',
    marginBottom: 10,
  },
  middleColumn: {
    marginVertical: 20,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'silver',
    borderStyle: 'dashed',
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

});

export default ReservationSelect;
