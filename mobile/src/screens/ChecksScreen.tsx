import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput,
  TouchableOpacity, RefreshControl, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '../lib/api';
import { Card, ErrorBanner, EmptyState, Skeleton } from '../components/ui';
import { C, FONT_SIZE } from '../lib/theme';
import { useLocalization } from '../locales';

interface CheckItem {
  id: string;
  status: string;
  result?: string;
  batchCode?: string;
  productName?: string;
  market?: string;
  aiConfidence?: number;
  itemCount?: number;
  createdAt: string;
  completedAt?: string;
}

interface ChatMsg {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

const RESULT_STYLES: Record<string, { bg: string; text: string }> = {
  compliant:                { bg: C.emeraldBg, text: C.emerald },
  conditionally_compliant:  { bg: C.amberBg,   text: C.amber   },
  non_compliant:            { bg: C.roseBg,    text: C.rose    },
  insufficient_information: { bg: C.slateBg,   text: C.slate   },
  not_applicable:           { bg: C.slateBg,   text: C.slate   },
  manual_review_required:   { bg: C.amberBg,   text: C.amber   },
};

const STATUS_COLORS: Record<string, string> = {
  queued:     C.slate,
  processing: C.amber,
  needs_input:C.amber,
  completed:  C.emerald,
  failed:     C.rose,
  cancelled:  C.slate,
};

export function ChecksScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState<'advisor' | 'history'>('advisor');

  // History state
  const [checks, setChecks] = useState<CheckItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Chat state
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: '1',
      sender: 'ai',
      text: t.checks.advisor.welcome,
      time: '00:00',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const fetchChecks = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ data: CheckItem[] }>('/compliance/checks?page=1&pageSize=30');
      const list = (res as any)?.data ?? res ?? [];
      setChecks(Array.isArray(list) ? list : []);
    } catch (e: any) {
      setError(e?.message ?? t.common.error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => { fetchChecks(); }, [fetchChecks]);

  // ─── AI Chat Send ──────────────────────────────────────────────────────────
  function handleSendMessage(customText?: string) {
    const textToSend = customText || inputMsg;
    if (!textToSend.trim()) return;

    const userMsg: ChatMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMsg('');
    setIsAiThinking(true);

    // AI Knowledge matching logic (Field-ready)
    setTimeout(() => {
      let replyText = '';
      const q = textToSend.toLowerCase();

      if (q.includes('cadmium') || q.includes('kim loại') || q.includes('镉')) {
        replyText = `${t.dashboard.radar.cadmiumLabel}: ${t.dashboard.radar.cadmiumDesc}`;
      } else if (q.includes('phyto') || q.includes('kiểm dịch') || q.includes('植检')) {
        replyText = `${t.dashboard.radar.phytoLabel}: ${t.dashboard.radar.phytoDesc}`;
      } else if (q.includes('4 khóa') || q.includes('chứng từ') || q.includes('4项') || q.includes('keys')) {
        replyText = `${t.products.fourKeysModal.title}: 1. ${t.docKeys.phyto.label}; 2. ${t.docKeys.lab.label}; 3. ${t.docKeys.co.label}; 4. ${t.docKeys.pkg.label}.`;
      } else if (q.includes('248') || q.includes('cifer') || q.includes('puc')) {
        replyText = `${t.dashboard.radar.ciferLabel}: ${t.dashboard.radar.ciferDesc}`;
      } else {
        replyText = `${t.settings.standardValue} (HS ${t.settings.hsCodeValue}): ${textToSend} — ${t.products.fourKeysModal.readyBanner}`;
      }

      const aiMsg: ChatMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsAiThinking(false);
    }, 600);
  }

  return (
    <View style={s.root}>
      {/* Header */}
      <View style={[s.header, { paddingTop: Math.max(insets.top + 8, 20) }]}>
        <View style={{ flex: 1 }}>
          <Text style={s.headerTitle}>{t.checks.title}</Text>
          <Text style={s.headerSub}>{t.checks.subtitle}</Text>
        </View>
      </View>

      {/* Sub-tabs */}
      <View style={s.tabBar}>
        <TouchableOpacity
          style={[s.tabButton, activeTab === 'advisor' && s.tabButtonActive]}
          onPress={() => setActiveTab('advisor')}
          activeOpacity={0.8}
        >
          <Text style={[s.tabText, activeTab === 'advisor' && s.tabTextActive]}>
            {t.checks.tabAdvisor}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.tabButton, activeTab === 'history' && s.tabButtonActive]}
          onPress={() => setActiveTab('history')}
          activeOpacity={0.8}
        >
          <Text style={[s.tabText, activeTab === 'history' && s.tabTextActive]}>
            {t.checks.tabHistory} ({checks.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      {activeTab === 'advisor' ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          {/* Quick Prompts */}
          <View style={s.quickPromptsBar}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: 14 }}>
              {t.quickPrompts.map((p: string, idx: number) => (
                <TouchableOpacity key={idx} style={s.quickChip} onPress={() => handleSendMessage(p)}>
                  <Text style={s.quickChipText}>{p}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Messages */}
          <ScrollView contentContainerStyle={s.chatScroll}>
            {messages.map((m) => (
              <View
                key={m.id}
                style={[
                  s.msgWrapper,
                  m.sender === 'ai' ? s.aiMsgWrapper : s.userMsgWrapper,
                ]}
              >
                <View
                  style={[
                    s.msgBox,
                    m.sender === 'ai' ? s.aiMsgBox : s.userMsgBox,
                  ]}
                >
                  <Text
                    style={[
                      s.msgSender,
                      m.sender === 'ai' ? s.aiSenderText : s.userSenderText,
                    ]}
                  >
                    {m.sender === 'ai' ? t.checks.advisor.headerBadge : 'YOU'}
                  </Text>
                  <Text
                    style={[
                      s.msgText,
                      m.sender === 'ai' ? s.aiMsgText : s.userMsgText,
                    ]}
                  >
                    {m.text}
                  </Text>
                  <Text style={[s.msgTime, { color: m.sender === 'ai' ? C.textMuted : 'rgba(255,255,255,0.6)' }]}>
                    {m.time}
                  </Text>
                </View>
              </View>
            ))}

            {isAiThinking && (
              <View style={[s.msgWrapper, s.aiMsgWrapper]}>
                <View style={[s.msgBox, s.aiMsgBox]}>
                  <Text style={[s.msgSender, s.aiSenderText]}>{t.checks.advisor.headerBadge}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 }}>
                    <ActivityIndicator size="small" color={C.gold} />
                    <Text style={{ fontSize: FONT_SIZE.xs, color: C.textSecondary, fontStyle: 'italic' }}>
                      {t.checks.advisor.thinking}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input Box */}
          <View style={[s.chatInputBar, { paddingBottom: Math.max(insets.bottom + 8, 14) }]}>
            <TextInput
              style={s.chatInput}
              value={inputMsg}
              onChangeText={setInputMsg}
              placeholder={t.checks.advisor.inputPlaceholder}
              placeholderTextColor={C.textMuted}
              onSubmitEditing={() => handleSendMessage()}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[s.sendBtn, !inputMsg.trim() && { opacity: 0.5 }]}
              onPress={() => handleSendMessage()}
              disabled={!inputMsg.trim() || isAiThinking}
              activeOpacity={0.8}
            >
              <Text style={s.sendBtnText}>{t.checks.advisor.sendBtn}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={{ flex: 1 }}>
          {error && (
            <View style={{ padding: 14 }}>
              <ErrorBanner message={error} onRetry={() => fetchChecks()} />
            </View>
          )}

          {loading ? (
            <View style={{ padding: 14, gap: 10 }}>
              <Skeleton height={90} />
              <Skeleton height={90} />
            </View>
          ) : (
            <FlatList
              data={checks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CheckCardMemo check={item} />}
              contentContainerStyle={{ padding: 14, paddingBottom: 32, gap: 10 }}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchChecks(true)} tintColor={C.gold} />}
              ListEmptyComponent={<EmptyState title="Chưa có lượt kiểm định nào" desc="Khởi tạo kiểm tra trong tab Sản phẩm & Lô hàng." />}
              windowSize={10}
              maxToRenderPerBatch={10}
            />
          )}
        </View>
      )}
    </View>
  );
}

// ─── Memoized Check Card ─────────────────────────────────────────────────────
const CheckCardMemo = React.memo(function CheckCard({ check }: { check: CheckItem }) {
  const { t } = useLocalization();
  const statusLabel = (t.checkStatuses as Record<string, string>)[check.status] ?? check.status;
  const statusColor = STATUS_COLORS[check.status] ?? C.slate;
  const resultLabel = check.result ? (t.checkResults as Record<string, string>)[check.result] : null;
  const resultStyle = check.result ? RESULT_STYLES[check.result] : null;
  const date = new Date(check.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <Card style={cc.card}>
      <View style={cc.topRow}>
        <View style={cc.batchBox}>
          <Text style={cc.batch}>Lô: {check.batchCode ?? 'N/A'}</Text>
        </View>
        <Text style={[cc.status, { color: statusColor }]}>{statusLabel}</Text>
      </View>

      {check.productName && (
        <Text style={cc.product} numberOfLines={1}>{check.productName}</Text>
      )}

      <View style={cc.bottomRow}>
        {resultLabel && resultStyle ? (
          <View style={[cc.resultBadge, { backgroundColor: resultStyle.bg }]}>
            <Text style={[cc.resultText, { color: resultStyle.text }]}>{resultLabel}</Text>
          </View>
        ) : (
          <View style={[cc.resultBadge, { backgroundColor: C.surfaceDim }]}>
            <Text style={[cc.resultText, { color: C.textMuted }]}>Thị trường: {check.market || 'CN'}</Text>
          </View>
        )}
        <Text style={cc.date}>{date}</Text>
      </View>
    </Card>
  );
});

// ─── Top-level StyleSheet ────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.surface },
  header: { paddingBottom: 14, paddingHorizontal: 16, backgroundColor: C.navy },
  headerTitle: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: FONT_SIZE.xs, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  tabBar: { flexDirection: 'row', backgroundColor: C.navyMid, paddingHorizontal: 14, paddingBottom: 10, gap: 8 },
  tabButton: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)' },
  tabButtonActive: { backgroundColor: C.gold },
  tabText: { fontSize: 11, fontWeight: '800', color: 'rgba(255,255,255,0.7)', letterSpacing: 0.3 },
  tabTextActive: { color: C.navy },
  quickPromptsBar: { paddingVertical: 8, backgroundColor: C.surfaceDim },
  quickChip: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: C.white, borderRadius: 8, borderWidth: 1, borderColor: C.borderFaint },
  quickChipText: { fontSize: 10, fontWeight: '700', color: C.navyMid },
  chatScroll: { padding: 14, gap: 10, paddingBottom: 20 },
  msgWrapper: { flexDirection: 'row', width: '100%' },
  aiMsgWrapper: { justifyContent: 'flex-start' },
  userMsgWrapper: { justifyContent: 'flex-end' },
  msgBox: { maxWidth: '88%', borderRadius: 14, padding: 12, gap: 4 },
  aiMsgBox: { backgroundColor: C.white, borderWidth: 1, borderColor: C.borderFaint, borderLeftWidth: 3, borderLeftColor: C.gold },
  userMsgBox: { backgroundColor: C.navyMid },
  msgSender: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  aiSenderText: { color: C.gold },
  userSenderText: { color: 'rgba(255,255,255,0.6)' },
  msgText: { fontSize: FONT_SIZE.sm, lineHeight: 20 },
  aiMsgText: { color: C.textPrimary },
  userMsgText: { color: '#fff', fontWeight: '500' },
  msgTime: { fontSize: 8, alignSelf: 'flex-end', marginTop: 2 },
  aiTimeText: { color: C.textMuted },
  userTimeText: { color: 'rgba(255,255,255,0.4)' },
  aiThinkingText: { fontSize: FONT_SIZE.xs, color: C.textMuted, fontStyle: 'italic' },
  chatInputBar: { flexDirection: 'row', padding: 10, backgroundColor: C.white, borderTopWidth: 1, borderTopColor: C.borderFaint, gap: 8, alignItems: 'center' },
  chatInput: { flex: 1, height: 42, borderWidth: 1, borderColor: C.border, borderRadius: 10, paddingHorizontal: 12, fontSize: FONT_SIZE.sm, backgroundColor: C.surface, color: C.textPrimary },
  sendBtn: { backgroundColor: C.navyMid, paddingHorizontal: 16, height: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  sendBtnText: { color: '#fff', fontSize: 11, fontWeight: '900', letterSpacing: 0.4 },
});

const cc = StyleSheet.create({
  card: { gap: 6, padding: 14 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  batchBox: { backgroundColor: C.surfaceDim, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  batch: { fontSize: FONT_SIZE.xs, fontWeight: '900', color: C.navyMid, fontVariant: ['tabular-nums'] },
  status: { fontSize: 10, fontWeight: '800' },
  product: { fontSize: FONT_SIZE.sm, color: C.textPrimary, fontWeight: '700' },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  resultBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  resultText: { fontSize: 10, fontWeight: '800' },
  date: { fontSize: 10, color: C.textMuted, fontVariant: ['tabular-nums'], fontWeight: '600' },
});
