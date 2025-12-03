import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import FeedScreen from './src/screens/FeedScreen';
import CheckScreen from './src/screens/CheckScreen';
import FeedWriteScreen from './src/screens/FeedWriteScreen'; // 새로 추가됨
import { COLORS } from './src/constants/theme';

export default function App() {
  // 간단한 상태 기반 네비게이션
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'Feed':
        return <FeedScreen onNavigate={setCurrentScreen} />;
      case 'FeedWrite': // 새로 추가된 라우트
        return <FeedWriteScreen onNavigate={setCurrentScreen} />;
      case 'Check':
        return <CheckScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      {renderScreen()}
    </SafeAreaView>
  );
}