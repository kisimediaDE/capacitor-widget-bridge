import { Capacitor } from '@capacitor/core';
import { WidgetsBridgePlugin } from 'capacitor-widgetsbridge-plugin-extented';

// Register widget class names (only necessary on Android)
if (Capacitor.getPlatform() === 'android') {
  WidgetsBridgePlugin.setRegisteredWidgets({
    widgets: ['com.example.plugin.MyAppWidget'] // Replace with your actual widget class
  }).catch(console.error);
}

const group = 'group.de.kisimedia.WidgetsBridgePluginExample'; // Replace with your actual group identifier
const key = 'widgetText'; // Replace with your actual key

window.setItem = async () => {
  const inputValue = document.getElementById('echoInput').value;
  await WidgetsBridgePlugin.setItem({ key, value: inputValue, group });
  await WidgetsBridgePlugin.reloadAllTimelines();
  alert('Value saved!');
};

window.getItem = async () => {
  const result = await WidgetsBridgePlugin.getItem({ key, group });
  document.getElementById('echoInput').value = result.results;
  alert('Stored value: ' + result.results);
};

window.removeItem = async () => {
  await WidgetsBridgePlugin.removeItem({ key, group });
  document.getElementById('echoInput').value = '';
  await WidgetsBridgePlugin.reloadAllTimelines();
  alert('Value removed!');
}

WidgetsBridgePlugin.getItem({ key, group }).then(result => {
  // Set the input value to the stored value on page load
  if (result.results) {
    document.getElementById('echoInput').value = result.results;
  }
}
).catch(error => {
  console.error('Error retrieving item:', error);
  document.getElementById('echoInput').value = '';
});