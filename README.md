# capacitor-widget-bridge

A Capacitor plugin to interact with WidgetKit (iOS) and App Widgets (Android).
Allows your Capacitor app to store data in shared user defaults (iOS) or shared preferences (Android),
and update timeline widgets on both platforms.

## Demo

<div style="display: flex; gap: 20px; align-items: center; justify-content: center;">
  <img src="iosdemo.gif" alt="iOS Example Demo" width="25%" />
  <img src="androiddemo.gif" alt="Android Example Demo" width="25%" />
</div>

## Install

```bash
npm install capacitor-widget-bridge
npx cap sync
```

## Credits

Inspired by [0xn33t](https://github.com/0xn33t/capacitor-widgetsbridge-plugin), who created the original iOS WidgetKit bridge.  
This plugin extends it with Android support and multi-platform improvements. Thank you for the groundwork!

## Platform Setup

### iOS

1. Enable App Groups in your Xcode project.
2. Add your App Group ID (e.g., `group.your.bundle.id`) to `UserDefaultsOptions.group`.
3. Create a Widget Extension using SwiftUI and define your widgets.
4. Use `UserDefaults(suiteName:)` with your group ID in the widget.
5. Call `WidgetBridgePlugin.reloadAllTimelines()` or `reloadTimelines(...)` after saving data.

### Android

1. Create one or more `AppWidgetProvider` classes (i.e., your widgets).
2. Declare them in your `AndroidManifest.xml` with `<receiver ... />`.
3. In your app’s JS code, register the widget classes:
   ```ts
   if (Capacitor.getPlatform() === 'android') {
     WidgetBridgePlugin.setRegisteredWidgets({
       widgets: ['com.example.plugin.MyWidget'],
     });
   }
   ```
4. Call `WidgetBridgePlugin.setItem(...)` and then `reloadAllTimelines()` or `reloadTimelines(...)` to trigger updates.
5. Use `SharedPreferences` in your widget code to read the data, using the same key/group as in JS.

## API

<docgen-index>

* [`getItem(...)`](#getitem)
* [`setItem(...)`](#setitem)
* [`removeItem(...)`](#removeitem)
* [`reloadAllTimelines()`](#reloadalltimelines)
* [`reloadTimelines(...)`](#reloadtimelines)
* [`setRegisteredWidgets(...)`](#setregisteredwidgets)
* [`getCurrentConfigurations()`](#getcurrentconfigurations)
* [Interfaces](#interfaces)

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

**Since:** 7.0.0

--------------------


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

**Since:** 7.0.0

--------------------


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

**Since:** 7.0.0

--------------------


### reloadAllTimelines()

```typescript
reloadAllTimelines() => Promise<DataResults<boolean>>
```

Reloads timelines for all configured widgets in the app.

- iOS: Triggers WidgetCenter reload.
- Android: No-op (not applicable).

**Returns:** <code>Promise&lt;<a href="#dataresults">DataResults</a>&lt;boolean&gt;&gt;</code>

**Since:** 7.0.0

--------------------


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

**Since:** 7.0.0

--------------------


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

**Since:** 7.0.0

--------------------


### getCurrentConfigurations()

```typescript
getCurrentConfigurations() => Promise<DataResults<any>>
```

Retrieves current widget configurations.

- iOS: Returns active widget info via WidgetCenter.
- Android: Not supported (returns empty or dummy data).

**Returns:** <code>Promise&lt;<a href="#dataresults">DataResults</a>&lt;any&gt;&gt;</code>

**Since:** 7.0.0

--------------------


### Interfaces


#### DataResults

| Prop          | Type           | Description                             | Since |
| ------------- | -------------- | --------------------------------------- | ----- |
| **`results`** | <code>T</code> | Holds response results from native code | 7.0.0 |


#### UserDefaultsOptions

| Prop        | Type                | Description                                                           | Since |
| ----------- | ------------------- | --------------------------------------------------------------------- | ----- |
| **`key`**   | <code>string</code> | The key whose value to retrieve from storage.                         | 7.0.0 |
| **`group`** | <code>string</code> | User defaults database name which holds and organizes key/value pairs | 7.0.0 |
| **`value`** | <code>string</code> | The value to set in storage with the associated key                   | 7.0.0 |


#### TimelinesOptions

| Prop         | Type                | Description                                                                                                    | Since |
| ------------ | ------------------- | -------------------------------------------------------------------------------------------------------------- | ----- |
| **`ofKind`** | <code>string</code> | A string that identifies the widget and matches the value you used when you created the widget’s configuration | 7.0.0 |


#### RegisteredWidgetsOptions

| Prop          | Type                  | Description                                                     | Since |
| ------------- | --------------------- | --------------------------------------------------------------- | ----- |
| **`widgets`** | <code>string[]</code> | Fully qualified class names of widgets to register for updates. | 7.0.0 |

</docgen-api>
