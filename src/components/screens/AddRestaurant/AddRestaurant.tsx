import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Input, Layout, Text, Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import Tags from 'react-native-tags';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tag from '~/components/atoms/Tag/Tag';
import TablesScheme, { Table } from '~/components/molecules/TablesScheme';

const { width, height } = Dimensions.get('window');

const AddRestaurant = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const { t } = useTranslation();

  const handleCreation = () => {};

  return (
    <Layout>
      <ScrollView style={styles.formContainer}>
        <View style={styles.imageUploaderContainer}>
          <Ionicons name="ios-add-circle-outline" size={40} />
        </View>
        <KeyboardAvoidingView>
          <View>
            <Text style={styles.formText}>
              {t('addRestaurant.namePlaceholder')}
            </Text>
            <Input
              placeholder={t('addRestaurant.textPlaceholder')}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.formText}>
              {t('addRestaurant.description')}
            </Text>
            <Input
              placeholder={t('addRestaurant.textPlaceholder')}
              value={description}
              onChangeText={setDescription}
            />
            <Text style={styles.formText}>
              {t('addRestaurant.tags')}
            </Text>
            <Tags
              initialText=""
              textInputProps={{
                placeholder: t('addRestaurant.textPlaceholder'),
              }}
              initialTags={tags}
              onChangeTags={setTags}
              containerStyle={{ justifyContent: 'center' }}
              inputStyle={{ backgroundColor: 'white' }}
              renderTag={({ tag, index, onPress }) => (
                <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                  <Tag tag={{ name: tag }} key={index} />
                </TouchableOpacity>
              )}
            />
            <Text style={styles.formText}>{t('addRestaurant.workingHours')}</Text>
            <View style={styles.workingHoursWrapper}>
              <Input
                placeholder={t('addRestaurant.openingTime')}
                value={description}
                onChangeText={setDescription}
              />
              <Text style={styles.workingHoursDivider}>-</Text>
              <Input
                placeholder={t('addRestaurant.closeTime')}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <Text style={styles.formText}>{t('addRestaurant.tablesScheme')}</Text>
        <TablesScheme tables={tables} setTables={setTables} />
        <Button onPress={handleCreation} style={styles.button}>
          {t('addRestaurant.createButton')}
        </Button>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 15,
  },
  formText: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  workingHoursWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  workingHoursDivider: {
    marginHorizontal: 10,
  },
  imageUploaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.2,
    borderWidth: 1,
    borderColor: '#e5e3e3',
  },
  button: {
    marginBottom: 10,
  },
});

export default AddRestaurant;
