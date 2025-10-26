import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="adotar"
        options={{
          title: 'Adotar',
          tabBarIcon: ({ color }) => <TabBarIcon name="paw" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="doar"
        options={{
          title: 'Doações',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
