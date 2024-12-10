```typescript
import { Platform } from '@nativescript/core';

const DEV_API_URL = Platform.isIOS ? 
  'http://localhost:3000/api' : 
  'http://10.0.2.2:3000/api';

export const API_CONFIG = {
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.didit360.com' 
    : DEV_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};
```