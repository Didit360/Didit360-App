```typescript
import React from 'react';
import { Button as NSButton } from '@nativescript/core';
import { StyleSheet } from 'react-nativescript';

interface ButtonProps {
  text: string;
  onTap: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  text,
  onTap,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false
}: ButtonProps) {
  return (
    <NSButton
      text={loading ? 'Loading...' : text}
      onTap={onTap}
      isEnabled={!disabled && !loading}
      className={`btn btn-${variant} ${fullWidth ? 'w-full' : ''}`}
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        fullWidth && styles.fullWidth
      ]}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 8,
    padding: 12,
    textTransform: 'none'
  },
  primary: {
    backgroundColor: '#22C55E',
    color: '#FFFFFF'
  },
  secondary: {
    backgroundColor: '#374151',
    color: '#FFFFFF'
  },
  danger: {
    backgroundColor: '#EF4444',
    color: '#FFFFFF'
  },
  disabled: {
    opacity: 0.5
  },
  fullWidth: {
    width: '100%'
  }
});
```