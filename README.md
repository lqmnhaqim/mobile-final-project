# Item Explorer — Mobile App Final Project

A React Native (Expo) mobile application built for the course final project.
Users register, log in, browse items fetched from an external API, view item
details, save favorites to local storage, and manage settings and notifications.

## Features

- **Signup / Login** — form validation, inline errors, credentials persisted locally (AsyncStorage)
- **Home screen** — app logo header, settings menu icon, list of items fetched from the external API (PokeAPI)
- **Detail screen** — full item info (image, height, weight, types, abilities) + save-to-favorites
- **Local storage** — users, session and favorites persisted with AsyncStorage; favorites screen shows the raw stored JSON
- **Settings menu & screen** — menu entries (Settings, Notifications, Favorites, Log out) and working preference toggles
- **Notifications** — permission configuration via expo-notifications + triggered test notification

## Project structure

```
App.js                        # screen routing (all screens wired together)
user-stories.md               # all nine user stories
src/
├── services/
│   ├── api.js                # external API integration (PokeAPI REST)
│   └── storage.js            # local storage (AsyncStorage) — users/session/favorites
└── screens/
    ├── LoginScreen.js        # login implementation
    ├── SignupScreen.js       # signup implementation
    ├── HomeScreen.js         # home screen implementation
    ├── DetailScreen.js       # detail screen implementation
    ├── FavoritesScreen.js    # local storage display (favorites/profile)
    ├── NotificationsScreen.js# notifications implementation
    └── SettingsScreens.js    # settings menu + settings screen implementation
screenshots/                  # all evidence screenshots (figma-evidence1/2, signup/login/home/detail/persistence/api/settings/menu/notifications)
```

## Run locally

```bash
npm install
npx expo start --web   # web preview
# or scan the QR code with Expo Go for a native device
```

## Tech stack

- React Native + Expo (managed workflow)
- AsyncStorage (local storage persistence)
- expo-notifications (notification configuration & test alerts)
- PokeAPI (external REST API integration)

_© Final Project — Mobile App Development_
