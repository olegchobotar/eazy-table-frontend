import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Layout, Input, Button } from '@ui-kitten/components';
import type { Restaurant, RootStackParamList } from '~/types';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CardInfoProps, RestaurantCard } from '~/components/molecules/RestaurantCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useTranslation } from 'react-i18next';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Home'> {
  restaurants: Restaurant[];
}

const HomeScreen = (props: Props) => {
  const { restaurants } = props;
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>('');
  const navigation = useNavigation<Props['navigation']>();

  const handleCardPress = (id: string) => {
    navigation.navigate('Restaurant', { restaurantId: id });
  };

  const renderItem = (info: CardInfoProps) => (
    <RestaurantCard cardInfo={info} onPress={handleCardPress} />
  );

  const handleSearch = () => {

  };

  return (
    <Layout style={styles.container}>
      <View style={styles.searchContainer}>
        <Input style={styles.searchInput} onChange={setSearch} />
        <Button style={styles.searchButton}>
          <Ionicons name="search-outline" size={32} />
        </Button>
      </View>
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

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Don Gustavo',
    address: 'Соборна площа, 4',
    photoUrl: require('../../../assets/images/don-gustavo.jpeg'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid esse et exercitationem expedita explicabo harum illo labore mollitia odio omnis quam quibusdam quidem repudiandae similique, soluta totam ut velit voluptas.',
    tags,
    tables,
  },
  {
    id: '2',
    name: 'Bacara',
    address: 'Театральна, 25',
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
  {
    id: '3',
    name: 'Don Gustavo',
    address: 'Соборна площа, 4',
    photoUrl: require('../../../assets/images/don-gustavo.jpeg'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid esse et exercitationem expedita explicabo harum illo labore mollitia odio omnis quam quibusdam quidem repudiandae similique, soluta totam ut velit voluptas.',
    tags,
    tables,
  },
  {
    id: '4',
    name: 'Bacara',
    address: 'Театральна, 25',
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
  searchContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 15,
  },
  searchButton: {
    flex: 1,
  },
  contentContainer: {
  },
});

const mapStateToProps = (state) => ({
  restaurants,
});

export default connect(mapStateToProps)(HomeScreen);
