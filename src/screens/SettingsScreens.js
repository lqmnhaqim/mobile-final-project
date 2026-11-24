// Settings menu (from header ☰ icon) and Settings screen.
// Menu lists entries; Settings screen has working toggles.
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';

export function SettingsMenuScreen({ username, onOpenSettings, onOpenNotifications, onOpenFavorites, onLogout }) {
  const items = [
    { icon: '⚙️', label: 'Settings', action: onOpenSettings },
    { icon: '🔔', label: 'Notifications', action: onOpenNotifications },
    { icon: '★', label: 'Favorites / Profile', action: onOpenFavorites },
    { icon: '🚪', label: 'Log out', action: onLogout },
  ];
  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>Menu</Text>
      <Text style={styles.menuUser}>Logged in as {username}</Text>
      {items.map((it) => (
        <TouchableOpacity key={it.label} style={styles.menuItem} onPress={it.action}>
          <Text style={styles.menuIcon}>{it.icon}</Text>
          <Text style={styles.menuLabel}>{it.label}</Text>
          <Text style={styles.menuChevron}>›</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export function SettingsScreen({ onBack }) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack} accessibilityLabel="Go back">
          <Text style={{ fontSize: 22 }}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Settings</Text>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>Preferences</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Push notifications</Text>
          <Switch value={pushEnabled} onValueChange={setPushEnabled} />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Dark mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Automatic updates</Text>
          <Switch value={autoUpdate} onValueChange={setAutoUpdate} />
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>About</Text>
        <Text style={styles.aboutText}>Item Explorer v1.0.0</Text>
        <Text style={styles.aboutText}>Final Project — Mobile App Development</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuContainer: { flex: 1, backgroundColor: '#f5f7fa', paddingTop: 60, paddingHorizontal: 20 },
  menuTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a2333' },
  menuUser: { fontSize: 13, color: '#5b6b7f', marginBottom: 20 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12,
    padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0',
  },
  menuIcon: { fontSize: 18, marginRight: 12 },
  menuLabel: { fontSize: 16, color: '#1a2333', flex: 1 },
  menuChevron: { fontSize: 20, color: '#9aa7b5' },
  screenContainer: { flex: 1, backgroundColor: '#f5f7fa' },
  screenHeader: {
    flexDirection: 'row', alignItems: 'center', paddingTop: 40, paddingBottom: 12,
    paddingHorizontal: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e2e8f0',
  },
  screenTitle: { fontSize: 19, fontWeight: 'bold', marginLeft: 12, color: '#1a2333' },
  group: {
    backgroundColor: '#fff', borderRadius: 12, margin: 14, padding: 16,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  groupTitle: { fontSize: 13, fontWeight: '700', color: '#5b6b7f', marginBottom: 10, textTransform: 'uppercase' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  rowLabel: { fontSize: 16, color: '#1a2333' },
  aboutText: { fontSize: 14, color: '#5b6b7f', marginBottom: 6 },
});
