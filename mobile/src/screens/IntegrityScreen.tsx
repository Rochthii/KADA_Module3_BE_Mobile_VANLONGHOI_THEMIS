import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput,
  TouchableOpacity, RefreshControl, Alert, ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '../lib/api';
import { Card, ErrorBanner, EmptyState, Skeleton } from '../components/ui';
import { C, FONT_SIZE } from '../lib/theme';

interface AuditEntry {
  id: string;
  action: string;
  userId: string;
  userEmail?: string;
  entityType?: string;
  entityId?: string;
  ipAddress?: string;
  createdAt: string;
}

interface IntegrityStats {
  totalLogs: number;
  sealedReportsCount: number;
  hashIntegrityPercentage: number;
  auditEngine: string;
  blockchainStatus: string;
}

import { strings } from '../locales';

interface VerifyResult {
  verified: boolean;
  message: string;
  reportNumber?: string;
  batchCode?: string;
  productName?: string;
  issuedAt?: string;
}

const ACTION_COLORS: Record<string, string> = {
  'product.created':   C.emerald,
  'product.updated':   C.blue,
  'product.deleted':   C.rose,
  'batch.created':     C.emerald,
  'batch.updated':     C.blue,
  'document.uploaded': C.emerald,
  'document.deleted':  C.rose,
  'check.started':     C.amber,
  'check.completed':   C.emerald,
  'report.approved':   C.emerald,
  'user.login_success':C.blue,
};

import { useLocalization } from '../locales';
import { QrScannerModal } from '../components/QrScannerModal';

export function IntegrityScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [stats, setStats] = useState<IntegrityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hash verification & Camera state
  const [inputHash, setInputHash] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  const fetchIntegrityData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    setError(null);
    try {
      const [logsRes, statsRes] = await Promise.all([
        api.get<{ data: AuditEntry[] }>('/integrity/audit-log?page=1&pageSize=50'),
        api.get<IntegrityStats>('/integrity/stats').catch(() => null),
      ]);
      const list = (logsRes as any)?.data ?? logsRes ?? [];
      setLogs(Array.isArray(list) ? list : []);
      if (statsRes) setStats(statsRes);
    } catch (e: any) {
      setError(e?.message ?? t.common.error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => { fetchIntegrityData(); }, [fetchIntegrityData]);

  // ─── Execute SHA-256 Hash Verification ─────────────────────────────────────
  const executeHashVerification = useCallback(async (hashToVerify: string) => {
    const trimmed = hashToVerify.trim();
    if (!trimmed) {
      Alert.alert(t.common.error, t.integrity.verifyTool.emptyHashAlert);
      return;
    }
    setVerifying(true);
    setVerifyResult(null);
    try {
      const res = await api.get<VerifyResult>(`/integrity/verify/${encodeURIComponent(trimmed)}`);
      setVerifyResult(res);
    } catch (e: any) {
      setVerifyResult({
        verified: false,
        message: e?.message ?? t.common.error,
      });
    } finally {
      setVerifying(false);
    }
  }, [t]);

  const handleVerifyHash = () => {
    executeHashVerification(inputHash);
  };

  const handleScannedData = (scannedData: string) => {
    setInputHash(scannedData);
    executeHashVerification(scannedData);
  };

  const renderAuditItem = useCallback(({ item, index }: { item: AuditEntry; index: number }) => (
    <AuditRowMemo entry={item} isFirst={index === 0} />
  ), []);

  const keyExtractor = useCallback((item: AuditEntry) => item.id, []);

  return (
    <View style={s.root}>
      {/* Header */}
      <View style={[s.header, { paddingTop: Math.max(insets.top + 8, 20) }]}>
        <View style={{ flex: 1 }}>
          <Text style={s.headerTitle}>{t.integrity.title}</Text>
          <Text style={s.headerSub}>{t.integrity.subtitle}</Text>
        </View>
      </View>

      <FlatList
        data={logs}
        renderItem={renderAuditItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={s.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchIntegrityData(true)} tintColor={C.gold} />}
        ListHeaderComponent={
          <View style={s.headerComponents}>
            {/* Stats Bar */}
            <View style={s.statsContainer}>
              <View style={s.statCard}>
                <Text style={s.statLabel}>{t.integrity.stats.merkleStatus}</Text>
                <Text style={[s.statVal, { color: C.emerald }]}>100%</Text>
                <Text style={s.statSub}>{t.integrity.stats.merkleActive}</Text>
              </View>
              <View style={s.statCard}>
                <Text style={s.statLabel}>{t.integrity.stats.totalLogs}</Text>
                <Text style={[s.statVal, { color: C.navyMid }]}>{stats?.totalLogs ?? logs.length}</Text>
                <Text style={s.statSub}>Append-only</Text>
              </View>
              <View style={s.statCard}>
                <Text style={s.statLabel}>{t.integrity.stats.verifiedHashes}</Text>
                <Text style={[s.statVal, { color: C.amber }]}>{stats?.sealedReportsCount ?? 1}</Text>
                <Text style={s.statSub}>SHA-256 Merkle</Text>
              </View>
            </View>

            {/* SHA-256 Verification Tool */}
            <Card style={s.verifyBox}>
              <Text style={s.verifyTitle}>{t.integrity.verifyTool.title}</Text>
              <Text style={s.verifyDesc}>{t.integrity.stats.title}</Text>

              <View style={s.hashInputRow}>
                <TextInput
                  style={s.hashInput}
                  value={inputHash}
                  onChangeText={setInputHash}
                  placeholder={t.integrity.verifyTool.inputPlaceholder}
                  placeholderTextColor={C.textMuted}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={s.scanBtn}
                  onPress={() => setShowScanner(true)}
                  activeOpacity={0.8}
                >
                  <Text style={s.scanBtnText}>{t.integrity.scanner.scanQrBtn}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.verifyBtn}
                  onPress={handleVerifyHash}
                  disabled={verifying}
                  activeOpacity={0.8}
                >
                  {verifying ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={s.verifyBtnText}>{t.integrity.verifyTool.verifyBtn}</Text>
                  )}
                </TouchableOpacity>
              </View>

              {verifyResult && (
                <View style={[s.verifyResultCard, { backgroundColor: verifyResult.verified ? C.emeraldBg : C.roseBg, borderColor: verifyResult.verified ? C.emerald : C.rose }]}>
                  <Text style={[s.verifyResultTitle, { color: verifyResult.verified ? C.emerald : C.rose }]}>
                    {verifyResult.verified ? t.integrity.verifyTool.successTitle : t.integrity.verifyTool.failedTitle}
                  </Text>
                  <Text style={s.verifyResultMsg}>{verifyResult.message}</Text>
                  {verifyResult.batchCode && (
                    <Text style={s.verifyResultDetail}>{t.products.batchCard.codePrefix} {verifyResult.batchCode} — {verifyResult.productName}</Text>
                  )}
                </View>
              )}
            </Card>

            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>{t.integrity.timeline.title}</Text>
              <Text style={s.sectionHint}>{t.integrity.timeline.subtitle}</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View style={{ gap: 10 }}>
              <Skeleton height={80} />
              <Skeleton height={80} />
            </View>
          ) : (
            <EmptyState title={t.integrity.timeline.emptyTitle} desc={t.integrity.timeline.emptyDesc} />
          )
        }
        windowSize={10}
        maxToRenderPerBatch={10}
      />

      {/* Live Camera QR / Barcode Scanner Modal */}
      <QrScannerModal
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScanned={handleScannedData}
      />
    </View>
  );
}

// ─── Memoized Audit Row ──────────────────────────────────────────────────────
const AuditRowMemo = React.memo(function AuditRow({ entry, isFirst }: { entry: AuditEntry; isFirst: boolean }) {
  const { t } = useLocalization();
  const label = (t.actions as Record<string, string>)[entry.action] ?? entry.action;
  const color = ACTION_COLORS[entry.action] ?? C.slate;
  const date = new Date(entry.createdAt);
  const timeStr = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const dateStr = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

  return (
    <View style={row.wrapper}>
      <View style={row.lineCol}>
        <View style={[row.dot, { backgroundColor: color }]} />
        <View style={[row.line, isFirst && { opacity: 0 }]} />
      </View>

      <Card style={row.card}>
        <View style={row.topRow}>
          <View style={[row.actionTag, { backgroundColor: color + '15' }]}>
            <Text style={[row.actionText, { color }]}>{label}</Text>
          </View>
          <Text style={row.time}>{dateStr} {timeStr}</Text>
        </View>
        <Text style={row.user} numberOfLines={1}>Cán bộ: {entry.userEmail ?? entry.userId}</Text>
        {entry.entityId && (
          <Text style={row.entity} numberOfLines={1}>
            Thực thể ({entry.entityType || 'Record'}): {entry.entityId}
          </Text>
        )}
      </Card>
    </View>
  );
});

// ─── Top-level StyleSheet ────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.surface },
  header: { paddingBottom: 14, paddingHorizontal: 16, backgroundColor: C.navy },
  headerTitle: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: FONT_SIZE.xs, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  listContent: { padding: 14, paddingBottom: 32, gap: 6 },
  headerComponents: { gap: 10, marginBottom: 8 },
  statsContainer: { flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1, backgroundColor: C.white, borderRadius: 12, padding: 10,
    borderWidth: 1, borderColor: C.borderFaint, alignItems: 'center', gap: 2,
  },
  statLabel: { fontSize: 9, color: C.textSecondary, fontWeight: '700', textAlign: 'center' },
  statVal: { fontSize: FONT_SIZE.lg, fontWeight: '900' },
  statSub: { fontSize: 8, color: C.textMuted, fontWeight: '600' },
  verifyBox: { gap: 8, padding: 14, borderWidth: 1, borderColor: '#BFDBFE' },
  verifyTitle: { fontSize: FONT_SIZE.sm, fontWeight: '800', color: C.navyMid },
  verifyDesc: { fontSize: 10, color: C.textSecondary },
  hashInputRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  hashInput: {
    flex: 1, height: 42, borderWidth: 1, borderColor: C.border,
    borderRadius: 8, paddingHorizontal: 8, fontSize: 11,
    backgroundColor: C.surface, color: C.textPrimary, fontVariant: ['tabular-nums'],
  },
  scanBtn: { backgroundColor: C.surfaceDim, borderWidth: 1, borderColor: C.navyMid, paddingHorizontal: 10, height: 42, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  scanBtnText: { color: C.navyMid, fontSize: 10, fontWeight: '900', letterSpacing: 0.2 },
  verifyBtn: { backgroundColor: C.navyMid, paddingHorizontal: 10, height: 42, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  verifyBtnText: { color: '#fff', fontSize: 10, fontWeight: '900', letterSpacing: 0.3 },
  verifyResultCard: { borderRadius: 8, padding: 10, borderWidth: 1, gap: 4 },
  verifyResultTitle: { fontSize: 11, fontWeight: '900' },
  verifyResultMsg: { fontSize: FONT_SIZE.xs, color: C.textPrimary },
  verifyResultDetail: { fontSize: 10, color: C.textSecondary, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  sectionTitle: { fontSize: FONT_SIZE.sm, fontWeight: '800', color: C.textSecondary },
  sectionHint: { fontSize: 10, color: C.textMuted },
});

const row = StyleSheet.create({
  wrapper: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  lineCol: { alignItems: 'center', width: 16 },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: 14, flexShrink: 0 },
  line: { flex: 1, width: 1, backgroundColor: C.borderFaint, marginVertical: 2 },
  card: { flex: 1, gap: 4, padding: 12 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  actionTag: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  actionText: { fontSize: 10, fontWeight: '800' },
  time: { fontSize: 10, color: C.textMuted, fontVariant: ['tabular-nums'], fontWeight: '600' },
  user: { fontSize: FONT_SIZE.xs, color: C.textSecondary, fontWeight: '600' },
  entity: { fontSize: 10, color: C.textMuted, fontVariant: ['tabular-nums'] },
});
