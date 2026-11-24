// Signup screen — username + email + password registration with validation.
// Errors shown inline (signup_error evidence). Data persisted to local storage.
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { getUsers, saveUsers } from '../services/storage';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const users = await getUsers();
    if (users.find((u) => u.username === username)) {
      setError('Username already exists. Please choose another one.');
      return;
    }
    if (users.find((u) => u.email === email)) {
      setError('Email already registered. Please log in instead.');
      return;
    }
    users.push({ username, email, password });
    await saveUsers(users);
    setError('');
    Alert.alert('Success', 'Account created! Please log in.');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📱 Item Explorer</Text>
      <Text style={styles.title}>Create Account</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f5f7fa' },
  logo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#2f6fed' },
  title: { fontSize: 20, textAlign: 'center', marginBottom: 20, color: '#333' },
  error: { color: '#d32f2f', textAlign: 'center', marginBottom: 12, fontWeight: '600' },
  input: {
    backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: '#dde3ea', fontSize: 16,
  },
  button: { backgroundColor: '#2f6fed', borderRadius: 10, padding: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#2f6fed', textAlign: 'center', marginTop: 16, fontSize: 15 },
});
