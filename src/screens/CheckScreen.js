import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

export default function CheckScreen({ onNavigate }) {
  const [text, setText] = useState('');
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [riskLevel, setRiskLevel] = useState(null); // 'SAFE', 'WARNING', 'DANGER'

  const handleCheck = () => {
    if (text.length === 0) return;

    // ---------------------------------------------------------
    // AI 판단 로직(일단 테스트)
    // ---------------------------------------------------------
    if (text.includes("검찰") || text.includes("앱 설치") || text.includes("출금")) {
      // 🔴 [확실한 위험]: 이미 데이터가 쌓인 건 -> 제보 및 공유 유도
      setRiskLevel('DANGER');
    } else if (text.includes("택배") || text.includes("당첨") || text.length > 10) {
      // 🟡 [애매한 의심]: 데이터 부족 -> 커뮤니티 질문 유도
      setRiskLevel('WARNING');
    } else {
      // 🟢 [안전]
      setRiskLevel('SAFE');
    }
    setResultModalVisible(true);
  };

  // 1. 커뮤니티로 이동 (물어보기 or 제보하기)
  const goToCommunity = (type) => {
    setResultModalVisible(false);
    // type: 'QUESTION'(물어보기) or 'DANGER'(알려주기)
    // 실제로는 여기서 text를 가지고 글쓰기 화면으로 가면 더 좋습니다.
    onNavigate('FeedWrite'); 
  };

  // 2. 가족에게 공유하기 (위험/확정 건 공유)
  const shareWithFamily = () => {
    Alert.alert(
      "가족에게 공유 완료", 
      "보호자에게 방금 발견한 피싱 문자를 공유했습니다.\n\n\"이거 미리 발견해서 다행이야!\""
    );
  };

  const handleSafeAction = () => {
    setResultModalVisible(false);
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Home')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>피싱 검사소</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>
          문자 내용이나 전화번호를{'\n'}여기에 붙여넣으세요.
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="꾹 눌러서 붙여넣기"
            value={text}
            onChangeText={setText}
            multiline
            placeholderTextColor={COLORS.gray}
          />
          {text.length > 0 && (
            <TouchableOpacity onPress={() => setText('')} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={24} color={COLORS.gray} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.checkBtn, { backgroundColor: text ? COLORS.primary : '#C4B5FD' }]} 
          onPress={handleCheck}
          disabled={!text}
        >
          <Text style={styles.checkBtnText}>검사 시작하기</Text>
        </TouchableOpacity>
      </View>

      {/* 결과 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={resultModalVisible}
        onRequestClose={() => setResultModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            {/* 아이콘 표시 */}
            <View style={[styles.iconBox, { backgroundColor: riskLevel === 'DANGER' ? '#FEE2E2' : riskLevel === 'WARNING' ? '#FEF3C7' : '#D1FAE5' }]}>
              <Ionicons 
                name={riskLevel === 'DANGER' ? "alert-circle" : riskLevel === 'WARNING' ? "help-circle" : "checkmark-circle"} 
                size={50} 
                color={riskLevel === 'DANGER' ? COLORS.danger : riskLevel === 'WARNING' ? COLORS.secondary : COLORS.success} 
              />
            </View>

            {/* 타이틀 */}
            <Text style={styles.modalTitle}>
              {riskLevel === 'DANGER' ? "🚨 피싱이 확실해요!" : riskLevel === 'WARNING' ? "🤔 판단이 애매하네요" : "✅ 안전해 보입니다"}
            </Text>

            {/* 설명 텍스트 */}
            <Text style={styles.modalText}>
              {riskLevel === 'DANGER' 
                ? "이미 10명이 신고한 악성 문자입니다.\n이웃들에게 알리고 가족에게도 공유하세요!" 
                : riskLevel === 'WARNING' 
                ? "아직 정보가 부족해요.\n커뮤니티에 올려서 다른 사람들의\n생각을 물어보는 게 좋겠어요."
                : "공식적인 안내 문자로 보입니다.\n안심하셔도 될 것 같아요."}
            </Text>

            {/* 버튼*/}
            <View style={styles.buttonGroup}>
              
              {/* 🔴 DANGER: 제보하기 + 가족공유 */}
              {riskLevel === 'DANGER' && (
                <>
                  <TouchableOpacity 
                    style={[styles.modalBtn, { backgroundColor: COLORS.danger, marginBottom: 10 }]} 
                    onPress={() => goToCommunity('DANGER')}
                  >
                    <Text style={styles.modalBtnText}>📢 커뮤니티에 제보 하기</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.modalBtn, { backgroundColor: '#FEE2E2' }]} 
                    onPress={shareWithFamily}
                  >
                    <Text style={[styles.modalBtnText, { color: COLORS.danger }]}>👨‍👩‍👧 가족에게 공유하기</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* 🟡 WARNING: 물어보기 */}
              {riskLevel === 'WARNING' && (
                <>
                  <TouchableOpacity 
                    style={[styles.modalBtn, { backgroundColor: COLORS.secondary, marginBottom: 10 }]} 
                    onPress={() => goToCommunity('QUESTION')}
                  >
                    <Text style={styles.modalBtnText}>🙋‍♀️ 커뮤니티에 물어보기</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={() => setResultModalVisible(false)}>
                    <Text style={{ color: COLORS.gray, marginTop: 10, textDecorationLine: 'underline', textAlign: 'center' }}>
                      다음에 할게요
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {/* 🟢 SAFE: 확인 */}
              {riskLevel === 'SAFE' && (
                <TouchableOpacity 
                  style={[styles.modalBtn, { backgroundColor: COLORS.success }]} 
                  onPress={handleSafeAction}
                >
                  <Text style={styles.modalBtnText}>확인했습니다</Text>
                </TouchableOpacity>
              )}

            </View>
          </View>
        </View>
      </Modal>
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
  },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: SIZES.h2, fontWeight: 'bold' },
  content: { padding: 20, flex: 1 },
  label: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.black,
    lineHeight: 32,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    padding: 15,
    marginBottom: 20,
    height: 150,
  },
  input: {
    flex: 1,
    fontSize: 20, 
    color: COLORS.black,
    lineHeight: 28,
    textAlignVertical: 'top',
  },
  clearBtn: { position: 'absolute', right: 10, top: 10 },
  checkBtn: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  checkBtnText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: COLORS.gray,
    lineHeight: 26,
  },
  buttonGroup: {
    width: '100%',
  },
  modalBtn: {
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
  },
  modalBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});