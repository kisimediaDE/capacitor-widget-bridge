export interface WidgetBridgePlugin {
  /**
   * Returns the value from the user’s defaults/shared preferences associated with the specified key.
   *
   * - iOS: Uses UserDefaults with app group support.
   * - Android: Uses SharedPreferences with private app storage.
   *
   * @param {UserDefaultsOptions} options
   * @since 7.0.0
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
   * @since 7.0.0
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
   * @since 7.0.0
   * @returns {Promise<DataResults<boolean>>} Promise indicating success or failure.
   */
  removeItem(options: UserDefaultsOptions): Promise<DataResults<boolean>>;

  /**
   * Reloads timelines for all configured widgets in the app.
   *
   * - iOS: Triggers WidgetCenter reload.
   * - Android: Triggers AppWidgetManager update using registered widget class names.
   *
   * @since 7.0.0
   * @returns {Promise<DataResults<boolean>>} Promise indicating success or no-op.
   */
  reloadAllTimelines(): Promise<DataResults<boolean>>;

  /**
   * Reloads timelines for all widgets of a specified kind.
   *
   * - iOS: Triggers reload of specific widget kind.
   * - Android: Triggers update for specific widget kinds if matched in registered widget class names.
   *
   * @param {TimelinesOptions} options
   * @since 7.0.0
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
   * @since 7.0.0
   * @returns {Promise<DataResults<boolean>>} Promise indicating success.
   */
  setRegisteredWidgets(options: RegisteredWidgetsOptions): Promise<DataResults<boolean>>;

  /**
   * Retrieves current widget configurations.
   *
   * - iOS: Returns active widget info via WidgetCenter.
   * - Android: Not supported (returns empty or dummy data).
   *
   * @since 7.0.0
   * @returns {Promise<DataResults<any>>} Promise resolving to configuration data.
   */
  getCurrentConfigurations(): Promise<DataResults<any>>;
}

export interface UserDefaultsOptions {
  /**
   * The key whose value to retrieve from storage.
   *
   * @since 7.0.0
   */
  key: string;

  /**
   * User defaults database name which holds and organizes key/value pairs
   *
   * @since 7.0.0
   */
  group: string;

  /**
   * The value to set in storage with the associated key
   *
   * @since 7.0.0
   */
  value?: string;
}

export interface TimelinesOptions {
  /**
   * A string that identifies the widget and matches the value you used when you created the widget’s configuration
   *
   * @since 7.0.0
   */
  ofKind: string;
}

export interface RegisteredWidgetsOptions {
  /**
   * Fully qualified class names of widgets to register for updates.
   *
   * @since 7.0.0
   */
  widgets: string[];
}

export interface DataResults<T> {
  /**
   * Holds response results from native code
   *
   * @since 7.0.0
   */
  results: T;
}
