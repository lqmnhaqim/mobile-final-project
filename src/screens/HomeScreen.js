// Home screen — app header with logo, fetches items from API (external API
// integration) and shows a navigation icon to open each item's detail screen.
import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert,
} from 'react-native';
import { fetchItems } from '../services/api';

export default function HomeScreen({ username, onOpenDetail, onOpenMenu }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems(20)
      .then(setItems)
      .catch((e) => Alert.alert('API Error', String(e.message || e)))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity style={styles.item} onPress={() => onOpenDetail(item)}>
        <Image source={{ uri: item.image }} style={styles.thumb} />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      {/* Navigation icon to the detail screen */}
      <TouchableOpacity
        style={styles.navIcon}
        onPress={() => onOpenDetail(item)}
        accessibilityLabel="Open detail"
      >
        <Text style={{ fontSize: 20 }}>➡️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/icon.png')} style={styles.headerLogo} />
        <Text style={styles.headerTitle}>Item Explorer</Text>
        <Text style={styles.headerUser}>Hi, {username}</Text>
        {/* Settings menu icon in the header */}
        <TouchableOpacity onPress={onOpenMenu} accessibilityLabel="Open settings menu">
          <Text style={{ fontSize: 22 }}>☰</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Popular items (from API)</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#2f6fed" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => String(i.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingTop: 40, paddingBottom: 12,
    paddingHorizontal: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e2e8f0',
  },
  headerLogo: { width: 34, height: 34, borderRadius: 8, marginRight: 10 },
  headerTitle: { fontSize: 19, fontWeight: 'bold', color: '#1a2333', flex: 1 },
  headerUser: { fontSize: 13, color: '#5b6b7f', marginRight: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#5b6b7f', margin: 14 },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12,
    marginHorizontal: 14, marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#e2e8f0',
  },
  item: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  thumb: { width: 52, height: 52, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '600', textTransform: 'capitalize', color: '#1a2333' },
  navIcon: { padding: 8 },
});
