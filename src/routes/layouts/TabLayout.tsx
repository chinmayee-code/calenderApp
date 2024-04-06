import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Fab, Icon, NativeBaseProvider, useColorMode} from 'native-base';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ICONS} from '~/assets';
import AddButton from '~/components/containers/AddButton';
import { useTabMenu } from '~/components/context/TabContext ';
import {AppIcon, Btn} from '~/components/core';
import {IconProps} from '~/components/core/AppIcon';
import {Private} from '~/screens';
import { Home } from '~/screens/private';
import { COLORS } from '~/styles';

const Tab = createBottomTabNavigator();
type BottomTabsTypes = {
  route: string;
  label: string;
  icon: IconProps;
  component: React.FC<any>;
};
const TabArr: BottomTabsTypes[] = [
  {
    route: 'Home',
    label: 'Home',
    icon: {
      AntDesignName: 'home',
    },
    component: Private.Home,
  },
  {
    route: 'Profile',
    label: 'Profile',
    icon: {
      AntDesignName: 'user',
    },
    component: Private.Profile,
  },
  
];

const TabArr1: BottomTabsTypes[] = [
  
  {
    route: 'Notifications',
    label: 'Notifications',
    icon: {
      MaterialIconsName:'notifications-none',
    },
    component: Private.Notifications,
  },
  {
    route: 'Support',
    label: 'Support',
    icon: {
      AntDesignName: 'user',
    },
    component: Private.Support,
  },
];

export default function TabLayout() {
  const {colorMode} = useColorMode();
  const {opened, toggleOpened} = useTabMenu();
  const getIconColor= (focused: any)=>({
    tintColor: focused? COLORS.primary: COLORS.dark
  })
  return (
    <NativeBaseProvider>
      <Tab.Navigator screenOptions={{headerShown: false,tabBarStyle: {
            
            position: 'absolute',
            bottom: 10,
            left: '3%',
            right: '3%',
            elevation: 2,
            backgroundColor: 'white',
            borderRadius: 15,
            height: 60,
            width: '94%',
          },
          tabBarActiveTintColor: COLORS.primary,
        }}>
        
        {TabArr.map((_, i) => {
          return (
            <Tab.Screen
              key={i}
              name={_.route}
              component={_.component}
              options={{
                tabBarIcon: ({color,focused, size}) => {
                  return <AppIcon {..._.icon} color={color} size={size} style={getIconColor(focused)} />;
                },
              
              }}
              
              
            />
            
          );
        })}
        <Tab.Screen
              name="menu"
              component={Home}
              options={{
                tabBarItemStyle: {
                  height: 0,
                },
                tabBarButton: () => (
                  <AddButton opened={opened} toggleOpened={toggleOpened} />
                ),
              }}
        />

        {TabArr1.map((_, i) => {
          return (
            <Tab.Screen
              key={i}
              name={_.route}
              component={_.component}
              options={{
                tabBarIcon: ({color,focused, size}) => {
                  return <AppIcon {..._.icon} color={color} size={size} style={getIconColor(focused)} />;
                },
              
              }}
              
              
            />
            
          );
        })}
      </Tab.Navigator>
    </NativeBaseProvider>
  );
}
// function useTabMenu(): { opened: any; toggleOpened: any; } {
//   throw new Error('Function not implemented.');
// }

