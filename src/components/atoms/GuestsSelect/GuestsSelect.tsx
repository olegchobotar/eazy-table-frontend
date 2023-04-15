import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

interface Props {
  to: number;
  guestsCount: number;
  onChange: (value: number) => void;
}

const GuestsSelect = (props: Props) => {
  const { to, guestsCount, onChange } = props;
  const numbers = Array.from({ length: to }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      <BottomSheetScrollView horizontal>
        {numbers.map((number) => (
          <TouchableOpacity
            key={number}
            onPress={() => onChange(number)}
            style={[styles.numberContainer, number === guestsCount && styles.selected]}
          >
            <Text style={number === guestsCount && styles.selectedItemText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </BottomSheetScrollView>
    </View>
  );
};

GuestsSelect.defaultProps = {
  to: 20,
};

const styles = StyleSheet.create({
  container: {
    height: 55,
  },
  numberContainer: {
    marginRight: 10,
    flexGrow: 1,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#264CD1',
  },
  selected: {
    backgroundColor: '#264CD1',
  },
  selectedItemText: {
    color: '#fff',
  },
});

export default GuestsSelect;
