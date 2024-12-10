```typescript
import React from 'react';
import { StackLayout } from '@nativescript/core';
import { StyleSheet } from 'react-nativescript';

interface CardProps {
  children: React.ReactNode;
  style?: any;
}

export function Card({ children, style }: CardProps) {
  return (
    <StackLayout
      style={[styles.card, style]}
    >
      {children}
    </StackLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  }
});
```