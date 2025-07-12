import { registerPlugin } from '@capacitor/core';

import { WidgetBridgePlugin } from './definitions';

const WidgetBridgePlugin = registerPlugin<WidgetBridgePlugin>('WidgetBridgePlugin');
export * from './definitions';
export { WidgetBridgePlugin };
