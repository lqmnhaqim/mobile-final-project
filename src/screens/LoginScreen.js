// Login screen — email + password with local-storage credential check.
// Wrong credentials produce the login_error evidence.
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { getUsers, saveSession } from '../services/storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    const users = await getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      setError('Invalid email or password. Please try again.');
      return;
    }
    await saveSession(user.username);
    setError('');
    navigation.replace('Home', { username: user.username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📱 Item Explorer</Text>
      <Text style={styles.title}>Welcome Back</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>New here? Sign up</Text>
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
