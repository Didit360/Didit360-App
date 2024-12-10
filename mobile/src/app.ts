```typescript
import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { AppNavigator } from './navigation/AppNavigator';

// Disable verbose logging in production
Object.defineProperty(global, '__DEV__', { value: process.env.NODE_ENV === 'development' });

ReactNativeScript.start(React.createElement(AppNavigator, {}, null));
```