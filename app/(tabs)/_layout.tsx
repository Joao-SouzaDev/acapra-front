import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Colors from '@/constants/Colors';

// Ícone responsivo com animação suave
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
}) {
  return (
    <FontAwesome 
      size={props.focused ? 24 : 20} 
      style={{ 
        marginBottom: Platform.OS === 'ios' ? -2 : 0,
        transform: [{ scale: props.focused ? 1.1 : 1 }],
        opacity: props.focused ? 1 : 0.65,
      }} 
      name={props.name}
      color={props.color}
    />
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        // Design fluido e responsivo
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.primaryLight,
        tabBarStyle: {
          backgroundColor: Colors.primary,
          borderTopWidth: 0,
          // Altura responsiva que respeita safe areas
          height: Platform.select({
            ios: 60 + insets.bottom,
            android: 65,
            web: 60,
          }),
          paddingBottom: Platform.select({
            ios: insets.bottom > 0 ? insets.bottom - 5 : 8,
            android: 8,
            web: 8,
          }),
          paddingTop: 8,
          paddingHorizontal: 12,
          // Sombra suave para efeito flutuante
          elevation: Platform.select({
            android: 15,
            default: 0,
          }),
          shadowColor: Colors.black,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          // Bordas arredondadas suaves
          borderTopLeftRadius: Platform.select({
            ios: 20,
            android: 16,
            web: 12,
          }),
          borderTopRightRadius: Platform.select({
            ios: 20,
            android: 16,
            web: 12,
          }),
        },
        tabBarLabelStyle: {
          fontSize: Platform.select({
            ios: 10,
            android: 11,
            web: 12,
          }),
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="home" color={color} focused={focused} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="adotar"
        options={{
          title: 'Adotar',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="paw" color={color} focused={focused} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="doar"
        options={{
          title: 'Doações',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="heart" color={color} focused={focused} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
