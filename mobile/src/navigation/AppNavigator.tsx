```typescript
import * as React from 'react';
import { BaseNavigationContainer } from '@react-navigation/core';
import { stackNavigatorFactory } from 'react-nativescript-navigation';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { useAuthStore } from '../stores/authStore';

const StackNavigator = stackNavigatorFactory();

export function AppNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BaseNavigationContainer>
      <StackNavigator.Navigator
        initialRouteName={isAuthenticated ? 'Dashboard' : 'Login'}
        screenOptions={{
          headerShown: true,
        }}
      >
        {!isAuthenticated ? (
          <>
            <StackNavigator.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <StackNavigator.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <StackNavigator.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: true }}
          />
        )}
      </StackNavigator.Navigator>
    </BaseNavigationContainer>
  );
}
```