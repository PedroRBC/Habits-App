import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter'
import { Routes } from './src/routes';
import { Loading } from './src/components/Views/Loading';
import './src/lib/dayjs';
import { FireBaseProvider } from './src/contexts/firebase';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <FireBaseProvider>
      <Routes />
      <StatusBar style='light' backgroundColor="transparent" translucent />
    </FireBaseProvider>
  );
}
