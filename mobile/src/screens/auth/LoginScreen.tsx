```typescript
import React, { useState } from 'react';
import { Page } from '@nativescript/core';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet } from 'react-nativescript';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { AuthService } from '../../services/auth.service';
import { useAuthStore } from '../../stores/authStore';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { setAuth } = useAuthStore();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await AuthService.login({ email, password });
      setAuth(response.token, response.refreshToken, response.user);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <scrollView>
        <stackLayout style={styles.container}>
          <Card>
            <stackLayout>
              <label style={styles.title}>Welcome Back</label>
              <label style={styles.subtitle}>Sign in to your account</label>

              {error && (
                <label style={styles.errorText}>{error}</label>
              )}

              <Input
                value={email}
                onTextChange={setEmail}
                placeholder="Email"
                keyboardType="email"
                label="Email Address"
              />

              <Input
                value={password}
                onTextChange={setPassword}
                placeholder="Password"
                secure={true}
                label="Password"
              />

              <Button
                text="Sign In"
                onTap={handleLogin}
                loading={loading}
                fullWidth={true}
              />

              <button
                text="Don't have an account? Sign up"
                onTap={() => navigation.navigate('Register')}
                style={styles.linkButton}
              />
            </stackLayout>
          </Card>
        </stackLayout>
      </scrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#111827'
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#6B7280'
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16
  },
  linkButton: {
    fontSize: 14,
    color: '#22C55E',
    textAlign: 'center',
    marginTop: 16
  }
});
```