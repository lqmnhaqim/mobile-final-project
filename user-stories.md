# User Stories — Item Explorer (Final Project)

All nine user stories for the mobile application, following the standard format:
**As a [user], I want [goal], so that [reason].**

---

## User Story 1 — Registration
**As a** new user,
**I want** to create an account with a username, email, and password,
**so that** I can save my preferences and access the app across sessions.

**Acceptance criteria**
- The signup screen contains three fields: username, email, and password.
- Submitting with empty or invalid fields shows a clear error message.
- Successfully registered users are stored and can log in afterwards.

---

## User Story 2 — Login
**As a** registered user,
**I want** to log in with my email and password,
**so that** I can access my personalized content securely.

**Acceptance criteria**
- The login screen contains two fields: email and password.
- Invalid credentials display an error message instead of logging in.
- Valid credentials open the Home screen with my session remembered.

---

## User Story 3 — Browse items (Home)
**As a** logged-in user,
**I want** to see a list of popular items on the Home screen,
**so that** I can quickly discover content to explore.

**Acceptance criteria**
- The Home screen shows the app logo in the header and a list of items.
- Items are fetched from an external API at runtime.
- Each item row is tappable and shows a navigation icon to its detail screen.

---

## User Story 4 — Item details
**As a** user,
**I want** to open a detail screen with full information about an item,
**so that** I can learn more about it before saving it.

**Acceptance criteria**
- Tapping the navigation icon on the Home screen opens the detail screen.
- The detail screen displays the item image, height, weight, types, and abilities.
- A back control returns me to the Home screen.

---

## User Story 5 — Save favorites (local storage)
**As a** user,
**I want** to save items to my favorites,
**so that** my saved items persist even after I close the app.

**Acceptance criteria**
- A save button on the detail screen stores the item in local storage.
- The Favorites screen lists all saved items read from local storage.
- The raw local-storage content is visible as proof of persistence.

---

## User Story 6 — Fetch live data (external API)
**As a** user,
**I want** the app to load live data from an external API,
**so that** the content I browse is real and up to date.

**Acceptance criteria**
- The app calls a public REST API on the Home screen.
- Fetched data (names and images) is rendered in the app UI.
- API failures show a friendly error instead of crashing.

---

## User Story 7 — Settings menu
**As a** user,
**I want** a settings menu reachable from the app header,
**so that** I can quickly reach Settings, Notifications, and Favorites.

**Acceptance criteria**
- The Home header shows a menu icon.
- The menu lists Settings, Notifications, Favorites/Profile, and Log out.
- Each entry navigates to its corresponding screen.

---

## User Story 8 — Settings preferences
**As a** user,
**I want** a settings screen with toggleable preferences,
**so that** I can configure the app to my liking.

**Acceptance criteria**
- The settings screen shows toggles for push notifications, dark mode, and automatic updates.
- Toggling a switch updates its state immediately.
- A back control returns to the menu.

---

## User Story 9 — Notifications
**As a** user,
**I want** to configure notifications and receive a test notification,
**so that** I know alerts from the app will reach me.

**Acceptance criteria**
- The notifications screen requests notification permission and shows its status.
- A test notification can be triggered on demand.
- A success message confirms the notification was triggered.
