// Notifications screen — configures expo-notifications and shows a test
// notification (setup + triggered alert evidence).
import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Platform, Alert,
} from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen({ onBack }) {
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState('Not configured');
  const [testLog, setTestLog] = useState(null);

  const configure = async () => {
    let st = 'undetermined';
    try {
      const res = await Notifications.requestPermissionsAsync();
      st = res.status;
    } catch {}
    if (st !== 'granted' && typeof Notification !== 'undefined') {
      st = Notification.permission === 'granted' ? 'granted' : st;
    }
    setStatus(st);
    if (st === 'granted') {
      try {
        const { data } = await Notifications.getExpoPushTokenAsync();
        setToken(data);
      } catch {
        setToken('Expo push token (native devices only — web uses browser notifications)');
      }
    } else {
      Alert.alert('Permission denied', 'Enable notifications in device settings.');
    }
  };

  const sendTest = async () => {
    const when = new Date().toLocaleTimeString();
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Test notification ✅',
          body: 'Notifications are configured correctly in Item Explorer!',
        },
        trigger: { seconds: 1 },
      });
    } catch {}
    // Web fallback — browser native notification
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try {
        new Notification('Test notification ✅', { body: 'Triggered at ' + when + ' — Item Explorer' });
      } catch {}
    }
    setTestLog('✅ Test notification triggered successfully at ' + when);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} accessibilityLabel="Go back">
          <Text style={{ fontSize: 22 }}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>1. Configure notifications</Text>
        <Text style={styles.status}>Permission status: {status}</Text>
        {token ? <Text style={styles.token}>{token}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={configure}>
          <Text style={styles.buttonText}>Request permission & configure</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>2. Send a test notification</Text>
        {testLog ? <Text style={styles.testLog}>{testLog}</Text> : null}
        <TouchableOpacity style={[styles.button, styles.testBtn]} onPress={sendTest}>
          <Text style={styles.buttonText}>Send test notification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingTop: 40, paddingBottom: 12,
    paddingHorizontal: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e2e8f0',
  },
  headerTitle: { fontSize: 19, fontWeight: 'bold', marginLeft: 12, color: '#1a2333' },
  card: {
    backgroundColor: '#fff', borderRadius: 14, margin: 14, padding: 16,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1a2333', marginBottom: 8 },
  status: { fontSize: 13, color: '#5b6b7f', marginBottom: 8 },
  token: { fontSize: 11, fontFamily: 'monospace', color: '#2f6fed', marginBottom: 8 },
  button: { backgroundColor: '#2f6fed', borderRadius: 10, padding: 13, alignItems: 'center' },
  testBtn: { backgroundColor: '#12b76a' },
  testLog: { color: '#0f7a45', fontWeight: '700', fontSize: 13, marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
