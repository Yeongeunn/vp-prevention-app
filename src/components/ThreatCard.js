import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PRIMARY_COLOR = '#6B46C1'; 
const RED_COLOR = '#E53E3E';

/**
 * 개별 위험 감지 사례를 표시하는 카드 컴포넌트
 */
const ThreatCard = ({ threat, onAskChild }) => {
  const isHighRisk = threat.riskScore >= 90;
  const cardStyle = isHighRisk ? styles.highRiskCard : styles.defaultCard;
  const riskColor = isHighRisk ? RED_COLOR : PRIMARY_COLOR;
  
  return (
    <View style={[styles.card, cardStyle]}>
      
      {/* 위험도와 타입 */}
      <View style={styles.header}>
        <Text style={[styles.riskScore, { color: riskColor }]}>
          위험 점수: {threat.riskScore}%
        </Text>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{threat.type} 감지</Text>
        </View>
      </View>

      {/* 시간 정보 */}
      <Text style={styles.timestamp}>
        {threat.timestamp.toLocaleDateString('ko-KR')} · {threat.timestamp.toLocaleTimeString('ko-KR')}
      </Text>

      {/* 메시지 내용 */}
      <View style={styles.contentBox}>
        <Text style={styles.contentText} numberOfLines={3}>
          {threat.content}
        </Text>
      </View>

      {/* 문의 버튼 */}
      {threat.status === 'Unresolved' ? (
        <TouchableOpacity
          style={styles.askButton}
          onPress={() => onAskChild(threat)}
        >
          <Text style={styles.askButtonText}> 보호자에게 문의하기 (확인 요청)</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.sentStatus}>
          <Text style={styles.sentStatusText}> 확인 요청 전송 완료</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  defaultCard: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E9D5FF',
  },
  highRiskCard: {
    backgroundColor: '#FFF0F0',
    borderWidth: 3,
    borderColor: RED_COLOR,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  riskScore: {
    fontSize: 28,
    fontWeight: '900',
  },
  typeBadge: {
    backgroundColor: '#E9D5FF',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  contentBox: {
    backgroundColor: '#F7F7F7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: PRIMARY_COLOR,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 25,
  },
  askButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  askButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFF',
  },
  sentStatus: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  sentStatusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  }
});

export default ThreatCard;