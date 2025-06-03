import { registerPlugin } from '@capacitor/core';

import { WidgetsBridgePlugin } from './definitions';

const WidgetsBridgePlugin = registerPlugin<WidgetsBridgePlugin>('WidgetsBridgePlugin');

export * from './definitions';
export { WidgetsBridgePlugin };
