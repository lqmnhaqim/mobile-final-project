// Favorites/profile screen — reads items saved in local storage
// (AsyncStorage) and shows the raw stored JSON as persistence evidence.
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFavorites } from '../services/storage';

export default function FavoritesScreen({ username }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites(username).then(setFavorites);
  }, [username]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites ({username})</Text>
      <Text style={styles.subtitle}>Loaded from local storage (AsyncStorage)</Text>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorites saved yet. Open an item and tap Save.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(f) => f.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>★ {item.name}</Text>
              <Text style={styles.date}>Saved: {new Date(item.savedAt).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
      {/* Raw local-storage JSON — persistence evidence */}
      <View style={styles.rawBox}>
        <Text style={styles.rawTitle}>Raw local storage content:</Text>
        <Text style={styles.rawJson}>{JSON.stringify(favorites, null, 2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa', padding: 16, paddingTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1a2333' },
  subtitle: { fontSize: 13, color: '#5b6b7f', marginBottom: 14 },
  empty: { color: '#5b6b7f', marginTop: 10 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  name: { fontSize: 16, fontWeight: '600', textTransform: 'capitalize', color: '#1a2333' },
  date: { fontSize: 12, color: '#5b6b7f', marginTop: 4 },
  rawBox: {
    marginTop: 14, backgroundColor: '#0f172a', borderRadius: 12, padding: 12,
  },
  rawTitle: { color: '#7dd3fc', fontSize: 12, fontWeight: '700', marginBottom: 6 },
  rawJson: { color: '#a5f3fc', fontFamily: 'monospace', fontSize: 11 },
});
