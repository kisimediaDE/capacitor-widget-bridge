export interface WidgetsBridgePlugin {
  /**
   * Returns the value from the user’s defaults/shared preferences associated with the specified key.
   *
   * - iOS: Uses UserDefaults with app group support.
   * - Android: Uses SharedPreferences with private app storage.
   *
   * @param {UserDefaultsOptions} options
   * @since 0.0.1 (iOS), 0.3.0 (Android)
   * @returns {Promise<DataResults<any>>} Promise resolving to the stored value.
   */
  getItem(options: UserDefaultsOptions): Promise<DataResults<any>>;

  /**
   * Sets the value to the user’s defaults/shared preferences associated with the specified key.
   *
   * - iOS: Uses UserDefaults with app group support.
   * - Android: Uses SharedPreferences with private app storage.
   *
   * @param {UserDefaultsOptions} options
   * @since 0.0.1 (iOS), 0.3.0 (Android)
   * @returns {Promise<DataResults<boolean>>} Promise indicating success or failure.
   */
  setItem(options: UserDefaultsOptions): Promise<DataResults<boolean>>;

  /**
   * Removes the value from the user’s defaults/shared preferences associated with the specified key.
   *
   * - iOS: Uses UserDefaults.
   * - Android: Uses SharedPreferences.
   *
   * @param {UserDefaultsOptions} options
   * @since 0.0.1 (iOS), 0.3.0 (Android)
   * @returns {Promise<DataResults<boolean>>} Promise indicating success or failure.
   */
  removeItem(options: UserDefaultsOptions): Promise<DataResults<boolean>>;

  /**
   * Reloads timelines for all configured widgets in the app.
   *
   * - iOS: Triggers WidgetCenter reload.
   * - Android: No-op (not applicable).
   *
   * @since 0.0.1 (iOS), 0.3.0 (Android – no effect)
   * @returns {Promise<DataResults<boolean>>} Promise indicating success or no-op.
   */
  reloadAllTimelines(): Promise<DataResults<boolean>>;

  /**
   * Reloads timelines for all widgets of a specified kind.
   *
   * - iOS: Triggers reload of specific widget kind.
   * - Android: No-op (not applicable).
   *
   * @param {TimelinesOptions} options
   * @since 0.0.1 (iOS), 0.3.0 (Android – no effect)
   * @returns {Promise<DataResults<boolean>>} Promise indicating success or no-op.
   */
  reloadTimelines(options: TimelinesOptions): Promise<DataResults<boolean>>;

  /**
   * Registers widget provider class names for dynamic timeline updates on Android.
   *
   * - iOS: No-op.
   * - Android: Used to register widget classes for reloadAllTimelines.
   *
   * @param {RegisteredWidgetsOptions} options
   * @since 0.3.0 (Android only)
   * @returns {Promise<DataResults<boolean>>} Promise indicating success.
   */
  setRegisteredWidgets(options: RegisteredWidgetsOptions): Promise<DataResults<boolean>>;

  /**
   * Retrieves current widget configurations.
   *
   * - iOS: Returns active widget info via WidgetCenter.
   * - Android: Not supported (returns empty or dummy data).
   *
   * @since 0.0.1 (iOS), 0.3.0 (Android – limited)
   * @returns {Promise<DataResults<any>>} Promise resolving to configuration data.
   */
  getCurrentConfigurations(): Promise<DataResults<any>>;
}

export interface UserDefaultsOptions {
  /**
   * The key whose value to retrieve from storage.
   *
   * @since 0.0.1
   */
  key: string;

  /**
   * User defaults database name which holds and organizes key/value pairs
   *
   * @since 0.0.1
   */
  group: string;

  /**
   * The value to set in storage with the associated key
   *
   * @since 0.0.1
   */
  value?: string;
}

export interface TimelinesOptions {
  /**
   * A string that identifies the widget and matches the value you used when you created the widget’s configuration
   *
   * @since 0.0.1
   */
  ofKind: string;
}

export interface RegisteredWidgetsOptions {
  /**
   * Fully qualified class names of widgets to register for updates.
   *
   * @since 0.3.0
   */
  widgets: string[];
}

export interface DataResults<T> {
  /**
   * Holds response results from native code
   *
   * @since 0.0.1
   */
  results: T;
}
