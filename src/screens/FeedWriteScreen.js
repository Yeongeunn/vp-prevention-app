import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

export default function FeedWriteScreen({ onNavigate }) {
  // 기본값은 '질문(QUESTION)'
  const [postType, setPostType] = useState('QUESTION'); 
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim().length < 5) {
      Alert.alert("내용이 너무 짧아요", "5글자 이상 적어주세요.");
      return;
    }

    // 실제로는 여기서 서버(Firebase 등)에 데이터 전송
    Alert.alert(
      "등록 완료",
      postType === 'QUESTION' 
        ? "질문이 등록되었습니다.\n다른 분들의 답변을 기다려주세요!" 
        : "소중한 제보 감사합니다.\n이웃들에게 큰 도움이 될 거예요.",
      [{ text: "확인", onPress: () => onNavigate('Feed') }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Feed')} style={styles.backBtn}>
          <Ionicons name="close" size={28} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>글쓰기</Text>
        <TouchableOpacity onPress={handleSubmit} style={styles.completeBtn}>
          <Text style={styles.completeText}>완료</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* 1. 유형 선택 (직관적인 버튼) */}
        <Text style={styles.label}>어떤 글을 쓰실 건가요?</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity 
            style={[styles.typeBtn, postType === 'QUESTION' && styles.selectedTypeBtn, { borderColor: COLORS.secondary }]}
            onPress={() => setPostType('QUESTION')}
          >
            <Ionicons name="help-circle" size={24} color={postType === 'QUESTION' ? COLORS.white : COLORS.secondary} />
            <Text style={[styles.typeText, postType === 'QUESTION' && styles.selectedTypeText]}>물어볼래요</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.typeBtn, postType === 'DANGER' && styles.selectedDangerBtn, { borderColor: COLORS.danger }]}
            onPress={() => setPostType('DANGER')}
          >
            <Ionicons name="alert-circle" size={24} color={postType === 'DANGER' ? COLORS.white : COLORS.danger} />
            <Text style={[styles.typeText, postType === 'DANGER' && styles.selectedTypeText]}>알려줄래요</Text>
          </TouchableOpacity>
        </View>

        {/* 2. 안내 문구 */}
        <View style={[styles.guideBox, { backgroundColor: postType === 'QUESTION' ? '#FEF3C7' : '#FEE2E2' }]}>
          <Text style={[styles.guideText, { color: postType === 'QUESTION' ? '#92400E' : '#991B1B' }]}>
            {postType === 'QUESTION' 
              ? "💡 받은 문자 내용이나 상황을 적어주세요. '이거 눌러도 되나요?' 하고 물어보셔도 돼요." 
              : "🚨 다른 사람들이 속지 않게 어떤 문자가 왔는지 알려주세요. 전화번호를 적어주시면 더 좋아요!"}
          </Text>
        </View>

        {/* 3. 입력 창 */}
        <TextInput
          style={styles.input}
          placeholder="여기에 내용을 적으세요. (예: 010-0000-0000 번호로 택배 반송 문자가 왔는데 링크가 이상해요.)"
          placeholderTextColor={COLORS.gray}
          multiline
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: { fontSize: SIZES.h2, fontWeight: 'bold' },
  completeText: { fontSize: 18, color: COLORS.primary, fontWeight: 'bold' },
  
  content: { padding: 20 },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  
  typeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  selectedTypeBtn: { backgroundColor: COLORS.secondary }, // 질문 선택 시 배경
  selectedDangerBtn: { backgroundColor: COLORS.danger }, // 위험 선택 시 배경
  
  typeText: { fontSize: 16, fontWeight: 'bold', color: COLORS.gray, marginLeft: 8 },
  selectedTypeText: { color: COLORS.white },

  guideBox: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  guideText: { fontSize: 15, lineHeight: 22 },

  input: {
    height: 300,
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.black,
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 15,
  },
});