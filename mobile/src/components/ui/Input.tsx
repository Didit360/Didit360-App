```typescript
import React from 'react';
import { TextField, Label } from '@nativescript/core';
import { StyleSheet } from 'react-nativescript';

interface InputProps {
  value: string;
  onTextChange: (text: string) => void;
  placeholder?: string;
  label?: string;
  secure?: boolean;
  keyboardType?: 'text' | 'email' | 'number' | 'phone';
  error?: string;
  disabled?: boolean;
}

export function Input({
  value,
  onTextChange,
  placeholder,
  label,
  secure = false,
  keyboardType = 'text',
  error,
  disabled = false
}: InputProps) {
  return (
    <stackLayout style={styles.container}>
      {label && (
        <Label
          text={label}
          style={styles.label}
        />
      )}
      <TextField
        text={value}
        onTextChange={(args) => onTextChange(args.value)}
        hint={placeholder}
        secure={secure}
        keyboardType={keyboardType}
        isEnabled={!disabled}
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled
        ]}
      />
      {error && (
        <Label
          text={error}
          style={styles.errorText}
        />
      )}
    </stackLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF'
  },
  inputError: {
    borderColor: '#EF4444'
  },
  inputDisabled: {
    backgroundColor: '#F3F4F6'
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4
  }
});
```