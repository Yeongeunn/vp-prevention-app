import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

export default function HomeScreen({ onNavigate }) {
  // 위험 상황 시뮬레이션을 위한 상태
  const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
  const [simulationType, setSimulationType] = useState(null); // 'URL_CLICK' or 'VOICE_PHISHING'
  
  // 깜빡이는 효과 (긴급 상황용)
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (emergencyModalVisible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(fadeAnim, { toValue: 0.3, duration: 500, useNativeDriver: true })
        ])
      ).start();
    }
  }, [emergencyModalVisible]);

  // 시뮬레이션 함수
  const triggerSimulation = (type) => {
    setSimulationType(type);
    setEmergencyModalVisible(true);
    console.log("🚨 보호자에게 긴급 알림 전송됨!"); 
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>안녕하세요, 김영숙님</Text>
            <Text style={styles.subtitle}>오늘도 안전하게 지켜드릴게요 🛡️</Text>
          </View>
          <View style={styles.connectionBadge}>
            <View style={styles.dot} />
            <Text style={styles.connectionText}>딸과 연결됨</Text>
          </View>
        </View>

        {/* 1. 메인 기능 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>무엇이 궁금하세요?</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.card} onPress={() => onNavigate('Check')}>
              <View style={[styles.iconBox, { backgroundColor: '#E0E7FF' }]}>
                <Ionicons name="search" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.cardTitle}>문자/번호 검사</Text>
              <Text style={styles.cardDesc}>이거 사기 아닐까?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => onNavigate('Feed')}>
              <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="people" size={28} color={COLORS.secondary} />
              </View>
              <Text style={styles.cardTitle}>피싱 제보함</Text>
              <Text style={styles.cardDesc}>남들은 뭘 받았나</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. 시연용 */}
        <View style={styles.devSection}>
          <Text style={styles.devTitle}>🛠️ [과제 시연용] 위험 상황 시뮬레이션</Text>
          <Text style={styles.devDesc}>사용자가 의심 없이 행동했을 때(URL 클릭 등) 앱이 어떻게 보호자를 호출하는지 테스트합니다.</Text>
          
          <TouchableOpacity 
            style={[styles.simButton, { backgroundColor: COLORS.danger }]}
            onPress={() => triggerSimulation('URL_CLICK')}
          >
            <Ionicons name="link" size={20} color="white" />
            <Text style={styles.simBtnText}>상황 1: 검찰 사칭 URL 클릭함</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.simButton, { backgroundColor: COLORS.secondary }]}
            onPress={() => triggerSimulation('VOICE_PHISHING')}
          >
            <Ionicons name="call" size={20} color="white" />
            <Text style={styles.simBtnText}>상황 2: 통화 중 돈 보내 감지</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* 🚨 긴급 개입 오버레이 */}
      <Modal
        visible={emergencyModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setEmergencyModalVisible(false)} // 안드로이드 백버튼 대응
      >
        <View style={styles.emergencyOverlay}>
          <Animated.View style={[styles.warningBox, { opacity: fadeAnim }]}>
            <Ionicons name="hand-left" size={60} color={COLORS.white} />
            <Text style={styles.warningTitle}>잠깐만요!!</Text>
          </Animated.View>

          <View style={styles.alertCard}>
            <Text style={styles.alertHeader}>
              {simulationType === 'URL_CLICK' ? "🚨 악성 앱 설치 링크 감지!" : "🚨 보이스피싱 의심 통화 감지!"}
            </Text>
            
            <Text style={styles.alertBody}>
              {simulationType === 'URL_CLICK' 
                ? "방금 누르신 주소는 '검찰청 사칭' 사기 사이트입니다.\n접속을 강제로 차단했습니다."
                : "통화 내용 중 금융 정보 요구가 감지되었습니다.\n지금 당장 전화를 끊으세요!"
              }
            </Text>

            <View style={styles.guardianNotice}>
              <Ionicons name="notifications" size={20} color={COLORS.white} />
              <Text style={styles.guardianText}>
                따님(한아영)에게 긴급 알림을 보냈습니다.
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.closeBtn}
              onPress={() => setEmergencyModalVisible(false)}
            >
              <Text style={styles.closeBtnText}>알겠습니다 (위험 해제)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 40,
    marginBottom: 30,
  },
  greeting: { fontSize: 24, fontWeight: 'bold', color: COLORS.black },
  subtitle: { fontSize: 16, color: COLORS.gray, marginTop: 5 },
  connectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success, marginRight: 6 },
  connectionText: { color: '#166534', fontWeight: 'bold', fontSize: 12 },
  
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: COLORS.black },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: COLORS.black },
  cardDesc: { fontSize: 14, color: COLORS.gray },

  // 개발자 시연용 스타일
  devSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  devTitle: { fontSize: 16, fontWeight: 'bold', color: '#4B5563', marginBottom: 5 },
  devDesc: { fontSize: 13, color: '#6B7280', marginBottom: 15 },
  simButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  simBtnText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },

  // 긴급 상황 오버레이
  emergencyOverlay: {
    flex: 1,
    backgroundColor: 'rgba(220, 38, 38, 0.95)', // 빨간색 배경
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  warningBox: { alignItems: 'center', marginBottom: 30 },
  warningTitle: { fontSize: 40, fontWeight: 'bold', color: 'white', marginTop: 10 },
  alertCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
  },
  alertHeader: { fontSize: 22, fontWeight: 'bold', color: COLORS.danger, marginBottom: 15, textAlign: 'center' },
  alertBody: { fontSize: 18, color: COLORS.black, textAlign: 'center', lineHeight: 26, marginBottom: 20 },
  guardianNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    padding: 15,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  guardianText: { color: 'white', marginLeft: 10, fontWeight: 'bold', fontSize: 15 },
  closeBtn: { padding: 15 },
  closeBtnText: { color: COLORS.gray, textDecorationLine: 'underline', fontSize: 16 },
});