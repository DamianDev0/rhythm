import React from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';

import TabBarIcon from './tabBarIcon';
import ChallengesScreen from '../../screens/challengesScreen/challengesScreen';
import ChartScreen from '../../screens/chartScreen/ChartScreen';
import HabitScreen from '../../screens/habitScreen/habitScreen';
import HomeScreen from '../../screens/homeScreen/homeScreen';

const PrivateTabs = () => {
  const renderTabBarIcon = ({
    routeName,
    selectedTab,
  }: {
    routeName: string;
    selectedTab: string;
  }) => {
    const isSelected = routeName === selectedTab;
    return (
      <View style={isSelected ? styles.selectedIcon : styles.defaultIcon}>
        <TabBarIcon routeName={routeName} />
      </View>
    );
  };

  const renderTabBar = ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: (routeName: string) => void;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabBarItem}>
        {renderTabBarIcon({routeName, selectedTab})}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={55}
      circleWidth={60}
      bgColor="#000"
      initialRouteName="HomeTab"
      renderCircle={({navigate}: any) => (
        <TouchableOpacity
          style={styles.circleButtonContainer}
          onPress={() => navigate('HomeTab')}>
          <TabBarIcon routeName="HomeTab" />
        </TouchableOpacity>
      )}
      tabBar={renderTabBar}
      width={395}
      id="curvedBottomBar"
      borderColor="#000"
      borderWidth={1}
      backBehavior="none">
      <CurvedBottomBar.Screen
        name="Habits"
        position="LEFT"
        component={HabitScreen}
        options={{headerShown: false}}
      />
      <CurvedBottomBar.Screen
        name="HomeTab"
        position="CENTER"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <CurvedBottomBar.Screen
        name="Chart"
        position="RIGHT"
        component={ChartScreen}
        options={{headerShown: false}}
      />
      <CurvedBottomBar.Screen
        name="Challenges"
        position="LEFT"
        component={ChallengesScreen}
        options={{headerShown: false}}
      />
    </CurvedBottomBar.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#0000',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButtonContainer: {
    width: 60,
    height: 60,
    bottom: 28,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  circleButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrivateTabs;
