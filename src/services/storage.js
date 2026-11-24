// Local storage — persist users, session and favorites using AsyncStorage.
// All data survives app restarts (local storage persistence for the final project).
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@app_users';
const SESSION_KEY = '@app_session';
const FAVORITES_KEY = '@app_favorites';

export async function getUsers() {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveUsers(users) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function saveSession(username) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ username }));
}

export async function getSession() {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function getFavorites(username) {
  const raw = await AsyncStorage.getItem(`${FAVORITES_KEY}:${username}`);
  return raw ? JSON.parse(raw) : [];
}

export async function saveFavorites(username, favorites) {
  await AsyncStorage.setItem(`${FAVORITES_KEY}:${username}`, JSON.stringify(favorites));
}

export async function toggleFavorite(username, itemName) {
  const favorites = await getFavorites(username);
  const exists = favorites.find((f) => f.name === itemName);
  const next = exists
    ? favorites.filter((f) => f.name !== itemName)
    : [...favorites, { name: itemName, savedAt: new Date().toISOString() }];
  await saveFavorites(username, next);
  return next;
}
