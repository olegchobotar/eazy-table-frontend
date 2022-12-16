import React, { useMemo, useRef, useState } from 'react';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import { RootStackParamList, Restaurant } from '~/types';
import { restaurants } from '~/components/screens/Home';
import { Image, StyleSheet, View } from 'react-native';
import { Tags } from '~/components/molecules/Tags';
import { ReservationSelect } from '~/components/molecules/ReservationSelect';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GuestsSelect } from '~/components/atoms/GuestsSelect';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'Restaurant'> {
  restaurant: Restaurant;
}

const RestaurantComponent: React.FC<Props> = (props: Props) => {
  const { restaurant } = props;
  const [date, setDate] = useState<Date>(new Date());
  const [comment, setComment] = useState<string>('');
  const [guestsNumber, setGuestsNumber] = useState<number>(1);

  const [preGuestsNumber, setPreGuestsNumber] = useState<number>(guestsNumber);
  const [preDate, setPreDate] = useState<Date>(date);

  const { t } = useTranslation();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  const handleConfirm = () => {
    setGuestsNumber(preGuestsNumber);
    setDate(preDate);
    bottomSheetModalRef.current?.close();
  };

  const handleReservation = () => {};

  return (
    <Layout style={styles.container}>
      <Image
        style={styles.image}
        // @ts-ignore
        source={restaurant.photoUrl}
      />
      <View style={styles.subHeader}>
        <View style={styles.establishmentWrapper}>
          <Text>{t('restaurant.establishment')}: </Text>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
        </View>
        <Text>{restaurant.address}</Text>
      </View>
      <View style={styles.content}>
        <Tags tags={restaurant.tags} />
        <Text style={styles.description}>{restaurant.description}</Text>
        <Text style={styles.fillInTitle}>{t('restaurant.fillInTitle')}</Text>
        <ReservationSelect
          guestsNumber={guestsNumber}
          setGuestsNumber={setGuestsNumber}
          reservationDateTime={date}
          setReservationDateTime={setDate}
          onPress={() => bottomSheetModalRef.current?.expand()}
        />
        <Text style={styles.comment}>{t('restaurant.commentTitle')}</Text>
        <Input style={styles.commentInput} onChangeText={setComment} />
        <Button onPress={handleReservation}>{t('restaurant.reserve')}</Button>

      </View>
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetModalRef}
        index={-1}
        snapPoints={snapPoints}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalLabel}>
            {t('restaurant.bottomModal.numberOfGuests')}
          </Text>
          <GuestsSelect guestsCount={preGuestsNumber} onChange={setPreGuestsNumber} />
          <Text style={[styles.modalLabel, styles.timeDate]}>{t('restaurant.bottomModal.bookingTimeDate')}</Text>
          <DatePicker
            date={preDate}
            is24hourSource="locale"
            minimumDate={new Date()}
            onDateChange={setPreDate}
            minuteInterval={15}
            mode="datetime"
          />
          <Button onPress={handleConfirm}>{t('common.confirm')}</Button>
        </View>
      </BottomSheet>
    </Layout>
  );
};

const mapStateToProps = (state, ownProps: Props) => {
  const { restaurantId } = ownProps.route.params;

  return {
    restaurant: restaurants.find(
      (restaurant) => restaurant.id === restaurantId,
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  content: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  establishmentWrapper: {
    flexDirection: 'row',
  },
  fillInTitle: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  restaurantName: {
    fontWeight: 'bold',
  },
  subHeader: {
    marginHorizontal: 30,
    borderRadius: 10,
    marginTop: '-10%',
    backgroundColor: '#ebeff5',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  imageWrapper: {},
  cardHeader: {
    paddingHorizontal: 24,
    paddingVertical: 5,
  },
  image: {
    marginBottom: 10,
    backgroundColor: 'silver',
    resizeMode: 'cover',
    width: '100%',
    height: undefined,
    aspectRatio: 2,
  },
  description: {
    marginVertical: 6,
  },
  item: {},

  modalContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  modalLabel: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  timeDate: {
    marginTop: 10,
  },
  comment: {
    fontWeight: 'bold',
  },
  commentInput: {
    marginBottom: 15,
  },
});

export default connect(mapStateToProps)(RestaurantComponent);
