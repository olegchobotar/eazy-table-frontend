import React from 'react';
import { StyleSheet, View, Image, ViewProps } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { Tags } from '~/components/molecules/Tags';
import type { Restaurant } from '~/types';
import { TimeSlots } from '~/components/molecules/TimeSlots';

export interface CardInfoProps {
  item: Restaurant;
}

interface Props {
  cardInfo: CardInfoProps;
  onPress: (id: string) => void;
}

const RestaurantCard = (props: Props) => {
  const { cardInfo, onPress } = props;

  const renderItemHeader = (
    headerProps: ViewProps | undefined,
    info: CardInfoProps,
  ) => {
    return (
      <View style={styles.cardHeader}>
        <Text category="h6">{info.item.name}</Text>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View>
        <Image
          style={styles.image}
          // @ts-ignore
          source={cardInfo.item.photoUrl}
        />
        <Tags tags={cardInfo.item.tags} />
        <Text style={styles.description}>{cardInfo.item.description}</Text>
        <TimeSlots timeSlots={cardInfo.item.tables[0].timeSlots} />
      </View>
    );
  };

  const handleCardPress = () => {
    onPress(cardInfo.item.id);
  };

  return (
    <Card
      onPress={handleCardPress}
      style={styles.item}
      status="basic"
      header={(headerProps) => renderItemHeader(headerProps, cardInfo)}>
      {renderContent()}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {},
  cardHeader: {
    paddingHorizontal: 24,
    paddingVertical: 5,
  },
  image: {
    borderRadius: 10,
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
});

export default RestaurantCard;
