/* eslint-disable import/no-duplicates */
import theme from '../../resources/theme';
import { CometChatContextProvider } from '../../utils/CometChatContext';
import { heightRatio } from '../../utils/consts';
import { CometChatConversationListWithMessages } from '../Chats';
import { CometChatGroupListWithMessages } from '../Groups';
import { CometChatUserProfile } from '../UserProfile';
import { CometChatUserListWithMessages } from '../Users';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function CometChatUI() {
  const [tabs, setTabs] = useState(null);
  const contextRef = useRef(null);

  useEffect(() => {
    checkRestrictions();
  }, []);
  const checkRestrictions = async () => {
    if (!contextRef.current.state) {
      return;
    }

    let isChatEnabled =
      await contextRef.current.state.FeatureRestriction.isRecentChatListEnabled();
    let isGroupListEnabled =
      await contextRef.current.state.FeatureRestriction.isGroupListEnabled();
    let isUserSettingsEnabled =
      await contextRef.current.state.FeatureRestriction.isUserSettingsEnabled();
    let isUserListEnabled =
      await contextRef.current.state.FeatureRestriction.isUserListEnabled();
    let isCallListEnabled =
      await contextRef.current.state.FeatureRestriction.isCallListEnabled();
    setTabs({
      isChatEnabled,
      isGroupListEnabled,
      isUserSettingsEnabled,
      isUserListEnabled,
      isCallListEnabled,
    });
  };
  return (
    <CometChatContextProvider ref={contextRef}>
      {tabs ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;

              if (route.name === 'Chats') {
                return (
                  <MCIIcons name="chat" size={25 * heightRatio} color={color} />
                );
              }
              if (route.name === 'More') {
                return (
                  <MaterialIcons
                    name="more-horiz"
                    size={25 * heightRatio}
                    color={color}
                  />
                );
              }
              if (route.name === 'Users') {
                iconName = 'ios-person-circle-sharp';
              } else if (route.name === 'Groups') {
                iconName = 'people';
              }

              // You can return any component that you like here!
              return (
                <Ionicons
                  name={iconName}
                  size={24 * heightRatio}
                  color={color}
                />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: theme.color.blue,
            inactiveTintColor: 'rgba(0,0,0,0.5)',
            activeBackgroundColor: theme.color.white,
            inactiveBackgroundColor: theme.color.white,
            labelStyle: { fontSize: 12 },
          }}>
          {tabs.isChatEnabled && (
            <Tab.Screen
              name="Chats"
              component={CometChatConversationListWithMessages}
            />
          )}
          {tabs.isUserListEnabled && (
            <Tab.Screen
              name="Users"
              component={CometChatUserListWithMessages}
            />
          )}
          {tabs.isGroupListEnabled && (
            <Tab.Screen
              name="Groups"
              component={CometChatGroupListWithMessages}
            />
          )}
          {tabs.isUserSettingsEnabled && (
            <Tab.Screen name="More" component={CometChatUserProfile} />
          )}
        </Tab.Navigator>
      ) : null}
    </CometChatContextProvider>
  );
}

export default CometChatUI;
