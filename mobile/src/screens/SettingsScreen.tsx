import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { api, clearAuth, getToken } from '../lib/api';
import { ScreenShell, Card, ErrorBanner } from '../components/ui';
import { C, FONT_SIZE } from '../lib/theme';
import { activeEnv } from '../config/env';
import { useLocalization, LANGUAGE_OPTIONS, SupportedLanguage } from '../locales';

interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
  organization?: { name: string; id: string };
}

interface Props {
  onLogout: () => void;
}

export function SettingsScreen({ onLogout }: Props) {
  const { t, lang, setLanguage } = useLocalization();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<any>('/auth/me');
      if (res) {
        const u = res.user ?? res;
        const orgs = res.organizations ?? [];
        const primaryOrg = orgs[0];
        setProfile({
          id: u.id,
          email: u.email,
          fullName: u.fullName,
          role: primaryOrg?.role ?? u.platformRole,
          organization: primaryOrg ? { id: primaryOrg.id, name: primaryOrg.name } : undefined,
        });
      }
    } catch (e: any) {
      setError(e?.message ?? t.common.error);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  function handleLogout() {
    Alert.alert(
      t.settings.logoutConfirmTitle,
      t.settings.logoutConfirmMsg,
      [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.settings.logoutConfirmAction,
          style: 'destructive',
          onPress: async () => {
            await clearAuth();
            onLogout();
          },
        },
      ],
    );
  }

  const roleLabel = profile?.role ? (t.roles as Record<string, string>)[profile.role] ?? profile.role : '—';

  return (
    <ScreenShell
      title={t.settings.title}
      subtitle={t.settings.subtitle}
      loading={loading}
    >
      {error && <ErrorBanner message={error} onRetry={fetchProfile} />}

      {profile && (
        <>
          {/* Profile card */}
          <Card>
            <View style={s.avatarRow}>
              <View style={s.avatar}>
                <Text style={s.avatarText}>
                  {(profile.fullName ?? profile.email)[0].toUpperCase()}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{profile.fullName ?? 'Chăm Rốch Thi'}</Text>
                <Text style={s.email}>{profile.email}</Text>
              </View>
            </View>
          </Card>

          {/* Language Switcher */}
          <Card>
            <Text style={s.sectionLabel}>{t.settings.languageSection}</Text>
            <View style={s.langRow}>
              {LANGUAGE_OPTIONS.map((opt) => {
                const isSel = lang === opt.code;
                return (
                  <TouchableOpacity
                    key={opt.code}
                    style={[s.langChip, isSel && s.langChipActive]}
                    onPress={() => setLanguage(opt.code)}
                    activeOpacity={0.8}
                  >
                    <Text style={s.langFlag}>{opt.flag}</Text>
                    <Text style={[s.langText, isSel && s.langTextActive]}>{opt.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>

          {/* Organization */}
          {profile.organization && (
            <Card>
              <Text style={s.sectionLabel}>{t.settings.orgSection}</Text>
              <Text style={s.orgName}>{profile.organization.name}</Text>
              <Text style={s.orgRole}>
                Vai trò: {roleLabel}
              </Text>
            </Card>
          )}

          {/* Environment Profile */}
          <Card>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={s.sectionLabel}>{t.settings.envSection}</Text>
              <View style={[s.envBadge, { backgroundColor: activeEnv.id === 'demo' ? C.amberBg : activeEnv.id === 'production' ? C.emeraldBg : C.navyMid + '20' }]}>
                <Text style={[s.envBadgeText, { color: activeEnv.id === 'demo' ? C.amber : activeEnv.id === 'production' ? C.emerald : C.navyMid }]}>
                  {activeEnv.badge}
                </Text>
              </View>
            </View>
            <Text style={s.envName}>{activeEnv.name}</Text>
            <Text style={s.envDesc}>{activeEnv.description}</Text>
            <InfoRow label={t.settings.gatewayLabel} value={activeEnv.apiUrl} />
            <InfoRow label={t.settings.databaseLabel} value={t.settings.databaseValue} />
            <InfoRow label={t.settings.aiEngineLabel} value={t.settings.aiEngineValue} />
          </Card>

          {/* System Info */}
          <Card>
            <Text style={s.sectionLabel}>{t.settings.scopeSection}</Text>
            <InfoRow label={t.settings.standardLabel} value={t.settings.standardValue} />
            <InfoRow label={t.settings.marketLabel} value={t.settings.marketValue} />
            <InfoRow label={t.settings.hsCodeLabel} value={t.settings.hsCodeValue} />
          </Card>

          {/* Logout */}
          <TouchableOpacity onPress={handleLogout} style={s.logoutBtn} activeOpacity={0.8}>
            <Text style={s.logoutText}>{t.settings.logoutBtn}</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={s.version}>{t.settings.versionText} — {activeEnv.badge}</Text>
    </ScreenShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={ir.row}>
      <Text style={ir.label}>{label}</Text>
      <Text style={ir.value}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  avatarRow:   { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar:      { width: 48, height: 48, borderRadius: 24, backgroundColor: C.navyMid, alignItems: 'center', justifyContent: 'center' },
  avatarText:  { fontSize: FONT_SIZE.xl, fontWeight: '900', color: C.gold },
  name:        { fontSize: FONT_SIZE.md, fontWeight: '800', color: C.textPrimary },
  email:       { fontSize: FONT_SIZE.xs, color: C.textMuted, marginTop: 2 },
  sectionLabel:{ fontSize: FONT_SIZE.xs, fontWeight: '800', color: C.textMuted, letterSpacing: 0.8, marginBottom: 8 },
  langRow:     { flexDirection: 'row', gap: 8, marginVertical: 4 },
  langChip:    { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 10, backgroundColor: C.surfaceDim, borderWidth: 1, borderColor: C.borderFaint },
  langChipActive: { backgroundColor: C.navyMid, borderColor: C.navyMid },
  langFlag:    { fontSize: 14 },
  langText:    { fontSize: 11, fontWeight: '700', color: C.textPrimary },
  langTextActive: { color: '#fff' },
  envBadge:    { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  envBadgeText:{ fontSize: 9, fontWeight: '900', letterSpacing: 0.4 },
  envName:     { fontSize: FONT_SIZE.base, fontWeight: '800', color: C.textPrimary, marginBottom: 2 },
  envDesc:     { fontSize: 10, color: C.textSecondary, marginBottom: 8, lineHeight: 15 },
  orgName:     { fontSize: FONT_SIZE.base, fontWeight: '700', color: C.textPrimary },
  orgRole:     { fontSize: FONT_SIZE.xs, color: C.textSecondary, marginTop: 4 },
  logoutBtn:   { backgroundColor: C.roseBg, borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#FECDD3' },
  logoutText:  { fontSize: FONT_SIZE.base, fontWeight: '800', color: C.rose },
  version:     { textAlign: 'center', fontSize: FONT_SIZE.xs, color: C.textMuted, marginTop: 8 },
});

const ir = StyleSheet.create({
  row:   { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: C.borderFaint },
  label: { fontSize: FONT_SIZE.xs, color: C.textSecondary, fontWeight: '600' },
  value: { fontSize: FONT_SIZE.xs, color: C.textPrimary, fontWeight: '700', fontVariant: ['tabular-nums'] },
});
