import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { hasPin, setPin, verifyPin } from '@/lib/supabase';
import { useTheme } from '@/theme/ThemeContext';

type Stage = 'loading' | 'create' | 'confirm' | 'enter' | 'error' | 'unlocked';

const PIN_LENGTH = 4;

export function PinGate({ children }: { children: React.ReactNode }) {
  const { palette } = useTheme();
  const [stage, setStage] = useState<Stage>('loading');
  const [pin, setPinValue] = useState('');
  const [firstPin, setFirstPin] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    hasPin()
      .then((exists) => setStage(exists ? 'enter' : 'create'))
      .catch(() => setErrorText('تعذّر الاتصال بالسيرفر. حاول تاني.'));
  }, []);

  if (stage === 'unlocked') return <>{children}</>;

  const submit = async () => {
    if (pin.length !== PIN_LENGTH) return;

    if (stage === 'create') {
      setFirstPin(pin);
      setPinValue('');
      setStage('confirm');
      return;
    }

    if (stage === 'confirm') {
      if (pin !== firstPin) {
        setErrorText('الرقمين مش متطابقين، جرب تاني');
        setPinValue('');
        setFirstPin('');
        setStage('create');
        return;
      }
      try {
        await setPin(pin);
        setStage('unlocked');
      } catch {
        setErrorText('حصل خطأ في الحفظ، حاول تاني');
      }
      return;
    }

    if (stage === 'enter') {
      try {
        const ok = await verifyPin(pin);
        if (ok) {
          setStage('unlocked');
        } else {
          setErrorText('الرقم السري غلط');
          setPinValue('');
        }
      } catch {
        setErrorText('تعذّر التحقق، حاول تاني');
      }
    }
  };

  const title =
    stage === 'create'
      ? 'اختار رقم سري (4 أرقام)'
      : stage === 'confirm'
        ? 'أكّد الرقم السري'
        : 'اكتب الرقم السري';

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      {stage === 'loading' ? (
        <ActivityIndicator size="large" color={palette.accent} />
      ) : (
        <>
          <Text style={[styles.title, { color: palette.textPrimary }]}>{title}</Text>

          <View style={styles.dots}>
            {Array.from({ length: PIN_LENGTH }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    borderColor: palette.border,
                    backgroundColor: i < pin.length ? palette.accent : 'transparent',
                  },
                ]}
              />
            ))}
          </View>

          <TextInput
            value={pin}
            onChangeText={(text) => {
              setErrorText('');
              setPinValue(text.replace(/[^0-9]/g, '').slice(0, PIN_LENGTH));
            }}
            keyboardType="number-pad"
            secureTextEntry
            maxLength={PIN_LENGTH}
            autoFocus
            style={styles.hiddenInput}
          />

          {!!errorText && <Text style={styles.error}>{errorText}</Text>}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: palette.accent, opacity: pin.length === PIN_LENGTH ? 1 : 0.4 }]}
            disabled={pin.length !== PIN_LENGTH}
            onPress={submit}
          >
            <Text style={styles.buttonText}>تأكيد</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24, padding: 24 },
  title: { fontSize: 18, fontWeight: '700' },
  dots: { flexDirection: 'row', gap: 14 },
  dot: { width: 18, height: 18, borderRadius: 9, borderWidth: 2 },
  hiddenInput: { position: 'absolute', opacity: 0, height: 1, width: 1 },
  error: { color: '#EF4444', fontSize: 13 },
  button: { paddingHorizontal: 40, paddingVertical: 14, borderRadius: 16 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
