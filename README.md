# capacitor-widgetsbridge-plugin-extented

A Capacitor plugin to interact with WidgetKit (iOS) and App Widgets (Android).
Allows your Capacitor app to store data in shared user defaults (iOS) or shared preferences (Android),
and update timeline widgets on both platforms.

## Demo

![Alt Text](iosdemo.gif)

## Install

```bash
npm install capacitor-widgetsbridge-plugin-extented
npx cap sync
```

## Platform Setup

### iOS

1. Enable App Groups in your Xcode project.
2. Add your App Group ID (e.g., `group.your.bundle.id`) to `UserDefaultsOptions.group`.
3. Create a Widget Extension using SwiftUI and define your widgets.
4. Use `UserDefaults(suiteName:)` with your group ID in the widget.
5. Call `WidgetsBridgePlugin.reloadAllTimelines()` or `reloadTimelines(...)` after saving data.

### Android

1. Create one or more `AppWidgetProvider` classes (i.e., your widgets).
2. Declare them in your `AndroidManifest.xml` with `<receiver ... />`.
3. In your app’s JS code, register the widget classes:
   ```ts
   if (Capacitor.getPlatform() === 'android') {
     WidgetsBridgePlugin.setRegisteredWidgets({
       widgets: ['com.example.plugin.MyWidget'],
     });
   }
   ```
4. Call `WidgetsBridgePlugin.setItem(...)` and then `reloadAllTimelines()` or `reloadTimelines(...)` to trigger updates.
5. Use `SharedPreferences` in your widget code to read the data, using the same key/group as in JS.

## API

<docgen-index>

- [capacitor-widgetsbridge-plugin-extented](#capacitor-widgetsbridge-plugin-extented)
  - [Demo](#demo)
  - [Install](#install)
  - [Platform Setup](#platform-setup)
    - [iOS](#ios)
    - [Android](#android)
  - [API](#api)
    - [getItem(...)](#getitem)
    - [setItem(...)](#setitem)
    - [removeItem(...)](#removeitem)
    - [reloadAllTimelines()](#reloadalltimelines)
    - [reloadTimelines(...)](#reloadtimelines)
    - [setRegisteredWidgets(...)](#setregisteredwidgets)
    - [getCurrentConfigurations()](#getcurrentconfigurations)
    - [Interfaces](#interfaces)
      - [DataResults](#dataresults)
      - [UserDefaultsOptions](#userdefaultsoptions)
      - [TimelinesOptions](#timelinesoptions)
      - [RegisteredWidgetsOptions](#registeredwidgetsoptions)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getItem(...)

```typescript
getItem(options: UserDefaultsOptions) => Promise<DataResults<any>>
```

Returns the value from the user’s defaults/shared preferences associated with the specified key.

- iOS: Uses UserDefaults with app group support.
- Android: Uses SharedPreferences with private app storage.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#userdefaultsoptions">UserDefaultsOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#dataresults">DataResults</a>&lt;any&gt;&gt;</code>

**Since:** 0.0.1 (iOS), 0.3.0 (Android)

---

### setItem(...)

```typescript
setItem(options: UserDefaultsOptions) => Promise<DataResults<boolean>>
```

Sets the value to the user’s defaults/shared preferences associated with the specified key.

- iOS: Uses UserDefaults with app group support.
- Android: Uses SharedPreferences with private app storage.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#userdefaultsoptions">UserDefaultsOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#dataresults">DataResults</a>&lt;boolean&gt;&gt;</code>

**Since:** 0.0.1 (iOS), 0.3.0 (Android)

---

### removeItem(...)

```typescript
removeItem(options: UserDefaultsOptions) => Promise<DataResults<boolean>>
```

Removes the value from the user’s defaults/shared preferences associated with the specified key.

- iOS: Uses UserDefaults.
- Android: Uses SharedPreferences.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#userdefaultsoptions">UserDefaultsOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#dataresults">DataResults</a>&lt;boolean&gt;&gt;</code>

**Since:** 0.0.1 (iOS), 0.3.0 (Android)

---

### reloadAllTimelines()

```typescript
reloadAllTimelines() => Promise<DataResults<boolean>>
```

Reloads timelines for all configured widgets in the app.

- iOS: Triggers WidgetCenter reload.
- Android: No-op (not applicable).

**Returns:** <code>Promise&lt;<a href="#dataresults">DataResults</a>&lt;boolean&gt;&gt;</code>

**Since:** 0.0.1 (iOS), 0.3.0 (Android – no effect)

---

### reloadTimelines(...)

```typescript
reloadTimelines(options: TimelinesOptions) => Promise<DataResults<boolean>>
```

Reloads timelines for all widgets of a specified kind.

- iOS: Triggers reload of specific widget kind.
- Android: No-op (not applicable).

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#timelinesoptions">TimelinesOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#dataresults">DataResults</a>&lt;boolean&gt;&gt;</code>

**Since:** 0.0.1 (iOS), 0.3.0 (Android – no effect)

---

### setRegisteredWidgets(...)

```typescript
setRegisteredWidgets(options: RegisteredWidgetsOptions) => Promise<DataResults<boolean>>
```

Registers widget provider class names for dynamic timeline updates on Android.

- iOS: No-op.
- Android: Used to register widget classes for reloadAllTimelines.

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#registeredwidgetsoptions">RegisteredWidgetsOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#dataresults">DataResults</a>&lt;boolean&gt;&gt;</code>

**Since:** 0.3.0 (Android only)

---

### getCurrentConfigurations()

```typescript
getCurrentConfigurations() => Promise<DataResults<any>>
```

Retrieves current widget configurations.

- iOS: Returns active widget info via WidgetCenter.
- Android: Not supported (returns empty or dummy data).

**Returns:** <code>Promise&lt;<a href="#dataresults">DataResults</a>&lt;any&gt;&gt;</code>

**Since:** 0.0.1 (iOS), 0.3.0 (Android – limited)

---

### Interfaces

#### DataResults

| Prop          | Type           | Description                             | Since |
| ------------- | -------------- | --------------------------------------- | ----- |
| **`results`** | <code>T</code> | Holds response results from native code | 0.0.1 |

#### UserDefaultsOptions

| Prop        | Type                | Description                                                           | Since |
| ----------- | ------------------- | --------------------------------------------------------------------- | ----- |
| **`key`**   | <code>string</code> | The key whose value to retrieve from storage.                         | 0.0.1 |
| **`group`** | <code>string</code> | User defaults database name which holds and organizes key/value pairs | 0.0.1 |
| **`value`** | <code>string</code> | The value to set in storage with the associated key                   | 0.0.1 |

#### TimelinesOptions

| Prop         | Type                | Description                                                                                                    | Since |
| ------------ | ------------------- | -------------------------------------------------------------------------------------------------------------- | ----- |
| **`ofKind`** | <code>string</code> | A string that identifies the widget and matches the value you used when you created the widget’s configuration | 0.0.1 |

#### RegisteredWidgetsOptions

| Prop          | Type                  | Description                                                     | Since |
| ------------- | --------------------- | --------------------------------------------------------------- | ----- |
| **`widgets`** | <code>string[]</code> | Fully qualified class names of widgets to register for updates. | 0.3.0 |

</docgen-api>
