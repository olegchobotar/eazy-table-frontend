import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Layout, Text } from '@ui-kitten/components';
import type { Restaurant } from '~/types';
import { connect } from 'react-redux';
import { RestaurantCard } from '~/components/molecules/RestaurantCard';

interface Props {
  restaurants: Restaurant[];
}

const HomeScreen = (props: Props) => {
  const { restaurants } = props;

  const renderItem = (info: object) => <RestaurantCard cardInfo={info} />;

  return (
    <Layout style={styles.container}>
      <List
        contentContainerStyle={styles.contentContainer}
        data={restaurants}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const tags = [
  { name: 'Fun' },
  { name: 'Asia' },
  { name: 'Pizza' },
  { name: 'Pasta' },
];

const timeSlots = [
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
];
const tables = [
  {
    tableNumber: 1,
    seatsCount: 2,
    timeSlots,
  },
];

const restaurants: Restaurant[] = [
  {
    name: 'Don Gustavo',
    photoUrl: require('../../../assets/images/don-gustavo.jpeg'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid esse et exercitationem expedita explicabo harum illo labore mollitia odio omnis quam quibusdam quidem repudiandae similique, soluta totam ut velit voluptas.',
    tags,
    tables,
  },
  {
    name: 'Bacara',
    photoUrl: require('../../../assets/images/bacara.jpeg'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid esse et exercitationem expedita explicabo harum illo labore mollitia odio omnis quam quibusdam quidem repudiandae similique, soluta totam ut velit voluptas.',
    tags: [
      { name: 'Coffee' },
      { name: 'Tea' },
      { name: 'Croissants' },
      { name: 'Atmosphere' },
    ],
    tables,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
  },
});

const mapStateToProps = (state) => ({
  restaurants,
});

export default connect(mapStateToProps)(HomeScreen);
