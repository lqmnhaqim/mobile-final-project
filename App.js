// App root — manages simple screen routing (no react-navigation dependency),
// wires all screens together: Login/Signup -> Home -> Detail/Favorites/Settings/Notifications.
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import { SettingsMenuScreen, SettingsScreen } from './src/screens/SettingsScreens';
import { getSession, clearSession } from './src/services/storage';

export default function App() {
  const [route, setRoute] = useState({ name: 'Login' });
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession().then((s) => {
      if (s) {
        setSession(s.username);
        setRoute({ name: 'Home' });
      }
    });
  }, []);

  const username = session || route.params?.username || 'guest';

  const logout = async () => {
    await clearSession();
    setSession(null);
    setRoute({ name: 'Login' });
  };

  const loginNav = {
    navigate: (name) => setRoute({ name }),
    replace: (name, params) => {
      setSession(params?.username || username);
      setRoute({ name });
    },
  };

  switch (route.name) {
    case 'Signup':
      return (
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <SignupScreen navigation={{ navigate: (name) => setRoute({ name }) }} />
        </View>
      );
    case 'Home':
      return (
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <HomeScreen
            username={username}
            onOpenDetail={(item) => setRoute({ name: 'Detail', params: { itemId: item.id } })}
            onOpenMenu={() => setRoute({ name: 'SettingsMenu' })}
          />
        </View>
      );
    case 'Detail':
      return (
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <DetailScreen
            itemId={route.params.itemId}
            username={username}
            onBack={() => setRoute({ name: 'Home' })}
          />
        </View>
      );
    case 'Favorites':
      return (
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <FavoritesScreen username={username} />
          <BackBar onBack={() => setRoute({ name: 'Home' })} />
        </View>
      );
    case 'SettingsMenu':
      return (
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <SettingsMenuScreen
            username={username}
            onOpenSettings={() => setRoute({ name: 'Settings' })}
            onOpenNotifications={() => setRoute({ name: 'Notifications' })}
            onOpenFavorites={() => setRoute({ name: 'Favorites' })}
            onLogout={logout}
          />
        </View>
      );
    case 'Settings':
      return (
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <SettingsScreen onBack={() => setRoute({ name: 'SettingsMenu' })} />
        </View>
      );
    case 'Notifications':
      return (
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <NotificationsScreen onBack={() => setRoute({ name: 'SettingsMenu' })} />
        </View>
      );
    default:
      return (
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <LoginScreen navigation={loginNav} />
        </View>
      );
  }
}

function BackBar({ onBack }) {
  return (
    <View style={{ padding: 12, backgroundColor: '#f5f7fa' }}>
      <TouchableOpacity onPress={onBack} style={{ alignItems: 'center' }}>
        <Text style={{ color: '#2f6fed', fontSize: 15 }}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
