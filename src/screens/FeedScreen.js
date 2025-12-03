import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { FEED_DATA } from '../data/mockData';

// 가족 탭을 위한 가짜 데이터 (실제로는 DB에서 가족 ID로 필터링)
const FAMILY_DATA = [
  {
    id: 'f1',
    type: 'SHARE', // 공유함
    author: '엄마',
    target: '딸(한아영)',
    content: '아영아, 오늘 이런 문자가 왔는데 내가 앱으로 검사해서 막았다! 너도 조심해라.',
    orgContent: '[국제발신] 해외결제 980,000원 승인완료 본인 아닐시 문의...',
    date: '방금 전',
    reaction: '딸: 와 엄마 대박! 👍 잘했어',
  },
  {
    id: 'f2',
    type: 'DANGER',
    author: '아빠',
    content: '친구분이 부고 문자 링크 눌렀다가 폰 해킹당하셨단다. 우리 가족은 절대 누르지 말자.',
    date: '어제',
    reaction: '엄마: 아이고 무서워라.. 알겠어요',
  }
];

export default function FeedScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' or 'FAMILY'

  const renderItem = ({ item }) => {
    // 1. 가족 탭 렌더링 (디자인을 조금 다르게: 말풍선 느낌)
    if (activeTab === 'FAMILY') {
      return (
        <View style={styles.familyCard}>
          <View style={styles.familyHeader}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={[styles.avatar, { backgroundColor: item.author === '엄마' ? '#FBCFE8' : '#E0E7FF' }]}>
                <Text style={{fontSize: 18}}>{item.author === '엄마' ? '👩' : '👨'}</Text>
              </View>
              <Text style={styles.familyAuthor}>{item.author}</Text>
            </View>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          
          <Text style={styles.familyContent}>{item.content}</Text>
          
          {/* 원본 문자 인용 */}
          {item.orgContent && (
            <View style={styles.quoteBox}>
              <Text style={styles.quoteText}>⛔ {item.orgContent}</Text>
            </View>
          )}

          {/* 가족 반응(댓글) */}
          <View style={styles.reactionBox}>
            <Text style={styles.reactionText}>{item.reaction}</Text>
          </View>
        </View>
      );
    }

    // 2. 전체 탭 렌더링 (기존 디자인 유지)
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[
            styles.badge, 
            { backgroundColor: item.type === 'DANGER' ? '#FEE2E2' : item.type === 'QUESTION' ? '#FEF3C7' : '#D1FAE5' }
          ]}>
            <Text style={[
              styles.badgeText,
              { color: item.type === 'DANGER' ? COLORS.danger : item.type === 'QUESTION' ? COLORS.secondary : COLORS.success }
            ]}>
              {item.type === 'DANGER' ? '🚨 위험' : item.type === 'QUESTION' ? '❓ 투표중' : '✅ 안전'}
            </Text>
          </View>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        <Text style={styles.content}>{item.content}</Text>
        
        {item.type === 'QUESTION' && (
          <View style={styles.voteContainer}>
            <Text style={styles.voteTitle}>이거 피싱일까요? (투표해주세요)</Text>
            <View style={styles.voteButtons}>
              <TouchableOpacity style={[styles.voteBtn, { backgroundColor: COLORS.success }]}>
                <Text style={styles.voteBtnText}>안전해요 ({item.answers.safe})</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.voteBtn, { backgroundColor: COLORS.danger }]}>
                <Text style={styles.voteBtnText}>위험해요 ({item.answers.danger})</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.cardFooter}>
          <Text style={styles.author}>작성자: {item.author}</Text>
          {item.type === 'DANGER' && <Text style={styles.checkCount}>⚠️ {item.votes}명이 확인</Text>}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Home')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>실시간 제보 피드</Text>
      </View>
      
      {/* 탭 버튼 (전체 / 가족) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'ALL' && styles.activeTabBtn]} 
          onPress={() => setActiveTab('ALL')}
        >
          <Text style={[styles.tabText, activeTab === 'ALL' && styles.activeTabText]}>🌏 전체 커뮤니티</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'FAMILY' && styles.activeTabBtn]} 
          onPress={() => setActiveTab('FAMILY')}
        >
          <Text style={[styles.tabText, activeTab === 'FAMILY' && styles.activeTabText]}>👨‍👩‍👧 우리 가족</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          {activeTab === 'ALL' 
            ? "지금 유행하는 피싱 수법을 실시간으로 확인하세요."
            : "우리 가족이 공유한 중요 알림을 모아봤어요."}
        </Text>
      </View>

      <FlatList
        data={activeTab === 'ALL' ? FEED_DATA : FAMILY_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      
      {/* 글쓰기 버튼 */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => onNavigate('FeedWrite')}
      >
        <Ionicons name="pencil" size={24} color={COLORS.white} />
        <Text style={styles.fabText}>글쓰기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: SIZES.h2, fontWeight: 'bold', color: COLORS.black },
  
  // 탭 스타일
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTabBtn: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: COLORS.primary,
  },

  infoBox: {
    backgroundColor: COLORS.primaryLight,
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  infoText: { color: COLORS.primaryDark, fontSize: 16, lineHeight: 22 },
  
  // 전체 카드 스타일
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontWeight: 'bold', fontSize: 14 },
  date: { color: COLORS.gray },
  content: { fontSize: 18, color: COLORS.black, lineHeight: 26, marginBottom: 15 },
  voteContainer: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  voteTitle: { textAlign: 'center', marginBottom: 10, color: COLORS.gray },
  voteButtons: { flexDirection: 'row', gap: 10 },
  voteBtn: { flex: 1, padding: 10, borderRadius: 8, alignItems: 'center' },
  voteBtnText: { color: COLORS.white, fontWeight: 'bold' },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 10,
  },
  author: { color: COLORS.gray },

  // 가족 카드 스타일 (약간 다르게)
  familyCard: {
    backgroundColor: '#FFFBEB', // 따뜻한 색감
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  familyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 8,
  },
  familyAuthor: { fontSize: 16, fontWeight: 'bold', color: '#92400E' },
  familyContent: { fontSize: 18, color: '#4B5563', lineHeight: 26, marginBottom: 15 },
  quoteBox: {
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.danger,
  },
  quoteText: { color: COLORS.danger, fontWeight: 'bold' },
  reactionBox: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 8,
  },
  reactionText: { color: COLORS.primary, fontWeight: 'bold' },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
  },
  fabText: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 18,
  },
});