// Detail screen — shows item information fetched from the API and lets the
// user save the item to local storage (favorites persistence).
import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert,
} from 'react-native';
import { fetchItemDetail } from '../services/api';
import { getFavorites, toggleFavorite } from '../services/storage';

export default function DetailScreen({ itemId, username, onBack }) {
  const [detail, setDetail] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadFavoriteState = async () => {
    const favs = await getFavorites(username);
    setIsFav(favs.some((f) => f.name === detail?.name));
  };

  useEffect(() => {
    fetchItemDetail(itemId)
      .then(setDetail)
      .catch((e) => Alert.alert('API Error', String(e.message || e)))
      .finally(() => setLoading(false));
  }, [itemId]);

  useEffect(() => {
    if (detail) loadFavoriteState();
  }, [detail]);

  const handleToggleFavorite = async () => {
    const next = await toggleFavorite(username, detail.name);
    setIsFav(next.some((f) => f.name === detail.name));
  };

  if (loading) return <ActivityIndicator size="large" color="#2f6fed" style={{ marginTop: 60 }} />;
  if (!detail) return <Text style={{ margin: 20 }}>Item not found.</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} accessibilityLabel="Go back">
          <Text style={{ fontSize: 22 }}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{detail.name}</Text>
      </View>
      <Image source={{ uri: detail.image }} style={styles.hero} />
      <View style={styles.card}>
        <Text style={styles.name}>{detail.name}</Text>
        <Text style={styles.meta}>Height: {detail.height} | Weight: {detail.weight}</Text>
        <Text style={styles.meta}>Types: {detail.types.join(', ')}</Text>
        <Text style={styles.meta}>Abilities: {detail.abilities.join(', ')}</Text>
        <TouchableOpacity
          style={[styles.favBtn, isFav && styles.favBtnActive]}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.favBtnText}>{isFav ? '★ Saved to favorites' : '☆ Save to favorites'}</Text>
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
  headerTitle: { fontSize: 19, fontWeight: 'bold', textTransform: 'capitalize', marginLeft: 12, color: '#1a2333' },
  hero: { width: 200, height: 200, alignSelf: 'center', marginTop: 20 },
  card: {
    backgroundColor: '#fff', borderRadius: 14, margin: 16, padding: 18,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  name: { fontSize: 22, fontWeight: 'bold', textTransform: 'capitalize', marginBottom: 8, color: '#1a2333' },
  meta: { fontSize: 14, color: '#5b6b7f', marginBottom: 4 },
  favBtn: {
    marginTop: 14, backgroundColor: '#2f6fed', borderRadius: 10, padding: 13, alignItems: 'center',
  },
  favBtnActive: { backgroundColor: '#f5a623' },
  favBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
