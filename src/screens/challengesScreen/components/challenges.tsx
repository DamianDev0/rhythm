import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ChallengeCard from './challengeCard';
import {fontBold} from '../../../styles/globalStyles';
import { challenges } from '../../../utils/data';


const ChallengesScreen: React.FC = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Challenges</Text>
      <FlatList
        data={challenges}
        renderItem={({item}) => (
          <TouchableOpacity>
            <ChallengeCard
              imageSource={item.imageSource}
              title={item.title}
              description={item.description}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 0.9,
    paddingHorizontal: 0,
    paddingTop: 7,
  },
  title: {
    fontSize: 13,
    fontFamily: fontBold,
    color: '#fff',
    paddingLeft: 20,
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default ChallengesScreen;
