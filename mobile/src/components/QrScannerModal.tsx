import React, { useState } from 'react';
import {
  Modal, View, Text, StyleSheet, TouchableOpacity,
  ActivityIndicator, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { C, FONT_SIZE } from '../lib/theme';
import { useLocalization } from '../locales';

interface Props {
  visible: boolean;
  onClose: () => void;
  onScanned: (data: string) => void;
}

export function QrScannerModal({ visible, onClose, onScanned }: Props) {
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const [scanned, setScanned] = useState(false);

  function handleBarcodeScanned(result: BarcodeScanningResult) {
    if (scanned) return;
    const rawData = result.data?.trim();
    if (!rawData) return;

    setScanned(true);

    // Extract hash or ID if it is a URL or custom prefix
    let cleanHash = rawData;
    if (rawData.includes('/verify/')) {
      const parts = rawData.split('/verify/');
      cleanHash = parts[parts.length - 1].split('?')[0].split('#')[0];
    } else if (rawData.includes('hash=')) {
      const match = rawData.match(/hash=([^&]+)/);
      if (match) cleanHash = match[1];
    } else if (rawData.startsWith('THEMIS-')) {
      cleanHash = rawData.replace('THEMIS-', '');
    }

    onScanned(cleanHash);
    setTimeout(() => {
      setScanned(false);
      onClose();
    }, 300);
  }

  function handleClose() {
    setScanned(false);
    setTorch(false);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <View style={s.root}>
        {/* Permission Request View */}
        {!permission ? (
          <View style={[s.centerBox, { paddingTop: insets.top }]}>
            <ActivityIndicator size="large" color={C.gold} />
          </View>
        ) : !permission.granted ? (
          <View style={[s.permissionBox, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
            <View style={s.permIconBox}>
              <Text style={s.permIcon}>📷</Text>
            </View>
            <Text style={s.permTitle}>{t.integrity.scanner.permissionTitle}</Text>
            <Text style={s.permDesc}>{t.integrity.scanner.permissionDesc}</Text>
            
            <TouchableOpacity style={s.grantBtn} onPress={requestPermission} activeOpacity={0.8}>
              <Text style={s.grantBtnText}>{t.integrity.scanner.grantBtn}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.permCancelBtn} onPress={handleClose} activeOpacity={0.8}>
              <Text style={s.permCancelText}>{t.common.cancel}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Live Camera View */
          <View style={StyleSheet.absoluteFill}>
            <CameraView
              style={StyleSheet.absoluteFill}
              facing="back"
              enableTorch={torch}
              barcodeScannerSettings={{
                barcodeTypes: ['qr', 'code128', 'ean13', 'code39'],
              }}
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />

            {/* Dark Mask with Clear Viewfinder */}
            <View style={[s.topBar, { paddingTop: Math.max(insets.top + 8, 20) }]}>
              <TouchableOpacity style={s.closeBtn} onPress={handleClose} activeOpacity={0.8}>
                <Text style={s.closeBtnText}>✕</Text>
              </TouchableOpacity>

              <Text style={s.topBarTitle} numberOfLines={1}>{t.integrity.scanner.modalTitle}</Text>

              <TouchableOpacity
                style={[s.torchBtn, torch && s.torchBtnActive]}
                onPress={() => setTorch(!torch)}
                activeOpacity={0.8}
              >
                <Text style={s.torchIcon}>{torch ? '⚡ BẬT' : '💡 ĐÈN'}</Text>
              </TouchableOpacity>
            </View>

            {/* Targeting Frame Box */}
            <View style={s.viewfinderContainer}>
              <View style={[s.viewfinder, scanned && s.viewfinderSuccess]}>
                {/* 4 Gold Corner Accents */}
                <View style={[s.corner, s.topLeft]} />
                <View style={[s.corner, s.topRight]} />
                <View style={[s.corner, s.bottomLeft]} />
                <View style={[s.corner, s.bottomRight]} />

                {/* Laser scan indicator */}
                <View style={s.laserLine} />
              </View>

              <Text style={s.instructionText}>{t.integrity.scanner.instruction}</Text>
            </View>

            {/* Bottom Status bar */}
            <View style={[s.bottomBar, { paddingBottom: Math.max(insets.bottom + 12, 24) }]}>
              <Text style={s.bottomStatusText}>
                {scanned ? t.integrity.scanner.scannedSuccess : 'QR / Barcode Auto-Detection Active'}
              </Text>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  centerBox: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.navy },
  permissionBox: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, backgroundColor: C.navy },
  permIconBox: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,184,0,0.15)', borderWidth: 1, borderColor: C.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  permIcon: { fontSize: 32 },
  permTitle: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 10 },
  permDesc: { fontSize: FONT_SIZE.sm, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 20, marginBottom: 28 },
  grantBtn: { backgroundColor: C.gold, width: '100%', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  grantBtnText: { color: C.navy, fontSize: FONT_SIZE.base, fontWeight: '800' },
  permCancelBtn: { paddingVertical: 10 },
  permCancelText: { color: 'rgba(255,255,255,0.6)', fontSize: FONT_SIZE.sm, fontWeight: '600' },

  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 14, backgroundColor: 'rgba(0,10,26,0.75)' },
  topBarTitle: { flex: 1, fontSize: 13, fontWeight: '800', color: '#fff', textAlign: 'center', paddingHorizontal: 8, letterSpacing: 0.4 },
  closeBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  closeBtnText: { color: '#fff', fontSize: 16, fontWeight: '900' },
  torchBtn: { paddingHorizontal: 12, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  torchBtnActive: { backgroundColor: C.gold, borderColor: C.gold },
  torchIcon: { color: '#fff', fontSize: 11, fontWeight: '900' },

  viewfinderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  viewfinder: { width: 260, height: 260, position: 'relative', borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  viewfinderSuccess: { borderColor: C.emerald, backgroundColor: 'rgba(16,185,129,0.1)' },
  corner: { position: 'absolute', width: 28, height: 28, borderColor: C.gold },
  topLeft: { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 16 },
  topRight: { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 16 },
  bottomLeft: { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 16 },
  bottomRight: { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 16 },
  laserLine: { position: 'absolute', top: '50%', left: 10, right: 10, height: 2, backgroundColor: C.gold, opacity: 0.8 },

  instructionText: { marginTop: 24, fontSize: FONT_SIZE.xs, color: '#fff', textAlign: 'center', lineHeight: 18, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, overflow: 'hidden' },

  bottomBar: { paddingHorizontal: 20, paddingTop: 14, backgroundColor: 'rgba(0,10,26,0.75)', alignItems: 'center' },
  bottomStatusText: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
});
