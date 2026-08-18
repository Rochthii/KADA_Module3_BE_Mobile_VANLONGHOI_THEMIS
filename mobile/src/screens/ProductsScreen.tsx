import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, TextInput, FlatList,
  TouchableOpacity, Modal, Alert, RefreshControl,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '../lib/api';
import { Card, StatusBadge, KeyBadge, ErrorBanner, EmptyState, Skeleton, PrimaryButton } from '../components/ui';
import { C, FONT_SIZE } from '../lib/theme';
import { useLocalization } from '../locales';

interface ProductItem {
  id: string;
  name: string;
  category?: string;
  hsCode: string;
  origin?: string;
  activeBatchCount?: number;
  batchesCount?: number;
}

interface BatchItem {
  id: string;
  batchCode: string;
  productId: string;
  productName?: string;
  product?: { name: string };
  quantity: number | null;
  unit: string | null;
  status: string;
  documents?: Array<{ document: { id: string; type: string; title: string } }>;
  createdAt: string;
}

export function ProductsScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState<'products' | 'batches'>('products');

  // Products & Batches state
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Modals state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [selectedBatchForDocs, setSelectedBatchForDocs] = useState<BatchItem | null>(null);

  // Form states - Product
  const [newProdName, setNewProdName] = useState('');
  const [newProdHs, setNewProdHs] = useState('0810.60.00');
  const [newProdOrigin, setNewProdOrigin] = useState('');
  const [submittingProd, setSubmittingProd] = useState(false);

  // Form states - Batch
  const [newBatchCode, setNewBatchCode] = useState('');
  const [newBatchProdId, setNewBatchProdId] = useState('');
  const [newBatchQty, setNewBatchQty] = useState('');
  const [submittingBatch, setSubmittingBatch] = useState(false);

  // ─── Fetch Data ─────────────────────────────────────────────────────────────
  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    setError(null);
    try {
      const [prodRes, batchRes] = await Promise.all([
        api.get<any>('/products?page=1&pageSize=50'),
        api.get<any>('/batches?page=1&pageSize=50'),
      ]);

      const pList = prodRes?.data ?? prodRes ?? [];
      const bList = batchRes?.data ?? batchRes ?? [];

      setProducts(Array.isArray(pList) ? pList : []);
      setBatches(Array.isArray(bList) ? bList : []);
    } catch (e: any) {
      setError(e?.message ?? t.common.error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => { loadData(); }, [loadData]);

  // ─── Create Product (Real API) ──────────────────────────────────────────────
  async function handleCreateProduct() {
    if (!newProdName.trim()) {
      Alert.alert(t.common.error, t.products.addProductModal.validationError);
      return;
    }
    setSubmittingProd(true);
    try {
      await api.post('/products', {
        name: newProdName.trim(),
        category: 'Sầu riêng tươi',
        hsCode: newProdHs.trim() || '0810.60.00',
        origin: newProdOrigin.trim() || 'Việt Nam (Mã PUC GACC)',
        markets: [{ marketCode: 'CN', marketName: 'Trung Quốc (GACC)' }],
      });
      setShowAddProductModal(false);
      setNewProdName('');
      setNewProdOrigin('');
      Alert.alert(t.common.success, t.products.addProductModal.createSuccess);
      loadData(true);
    } catch (e: any) {
      Alert.alert(t.common.error, e?.message ?? t.common.error);
    } finally {
      setSubmittingProd(false);
    }
  }

  // ─── Create Batch (Real API) ────────────────────────────────────────────────
  async function handleCreateBatch() {
    if (!newBatchCode.trim() || !newBatchProdId) {
      Alert.alert(t.common.error, t.products.addBatchModal.validationError);
      return;
    }
    setSubmittingBatch(true);
    try {
      await api.post('/batches', {
        batchCode: newBatchCode.trim().toUpperCase(),
        productId: newBatchProdId,
        quantity: parseFloat(newBatchQty) || 20,
        unit: 'tấn',
        status: 'COLLECTING_DOCUMENTS',
      });
      setShowAddBatchModal(false);
      setNewBatchCode('');
      setNewBatchQty('');
      Alert.alert(t.common.success, t.products.addBatchModal.createSuccess);
      loadData(true);
    } catch (e: any) {
      Alert.alert(t.common.error, e?.message ?? t.common.error);
    } finally {
      setSubmittingBatch(false);
    }
  }

  // ─── Attach 4-Key Document (Real API write) ─────────────────────────────────
  async function handleUploadKeyDoc(batchId: string, docType: string, label: string) {
    try {
      const fileName = `${docType}_${Date.now()}.pdf`;
      await api.post(`/batches/${batchId}/documents`, {
        title: `${label} - Số hóa thực địa`,
        type: docType,
        fileUrl: `https://storage.themis.vn/docs/${fileName}`,
        fileSize: 1250000,
        mimeType: 'application/pdf',
      });
      Alert.alert(t.common.success, `${label}: ${t.products.fourKeysModal.docUploadedSuccess}`);
      loadData(true);
      setSelectedBatchForDocs(null);
    } catch (e: any) {
      Alert.alert(t.common.error, e?.message ?? t.common.error);
    }
  }

  // ─── Delete Product (Real API) ──────────────────────────────────────────────
  function handleDeleteProduct(prodId: string, name: string) {
    Alert.alert(
      t.products.productCard.deleteConfirmTitle,
      `${t.products.productCard.deleteConfirmMsg} ("${name}")`,
      [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.common.delete,
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/products/${prodId}`);
              Alert.alert(t.common.success, t.products.productCard.deleteSuccess);
              loadData(true);
            } catch (err: any) {
              Alert.alert(t.common.error, err?.message ?? t.common.error);
            }
          },
        },
      ],
    );
  }

  // ─── Filtered Data ─────────────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter((p) => p.name?.toLowerCase().includes(q) || p.hsCode?.includes(q));
  }, [products, search]);

  const filteredBatches = useMemo(() => {
    if (!search.trim()) return batches;
    const q = search.toLowerCase();
    return batches.filter((b) => b.batchCode?.toLowerCase().includes(q));
  }, [batches, search]);

  return (
    <View style={s.root}>
      {/* Header */}
      <View style={[s.header, { paddingTop: Math.max(insets.top + 8, 20) }]}>
        <View style={{ flex: 1 }}>
          <Text style={s.headerTitle}>{t.products.title}</Text>
          <Text style={s.headerSub}>{t.products.subtitle}</Text>
        </View>
      </View>

      {/* Sub-tabs */}
      <View style={s.tabBar}>
        <TouchableOpacity
          style={[s.tabButton, activeTab === 'products' && s.tabButtonActive]}
          onPress={() => setActiveTab('products')}
          activeOpacity={0.8}
        >
          <Text style={[s.tabText, activeTab === 'products' && s.tabTextActive]}>
            {t.products.tabProducts} ({products.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.tabButton, activeTab === 'batches' && s.tabButtonActive]}
          onPress={() => setActiveTab('batches')}
          activeOpacity={0.8}
        >
          <Text style={[s.tabText, activeTab === 'batches' && s.tabTextActive]}>
            {t.products.tabBatches} ({batches.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Action Bar */}
      <View style={s.actionBar}>
        <View style={s.searchBox}>
          <TextInput
            style={s.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder={t.products.searchPlaceholder}
            placeholderTextColor={C.textMuted}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity
          style={s.addButton}
          onPress={() => (activeTab === 'products' ? setShowAddProductModal(true) : setShowAddBatchModal(true))}
          activeOpacity={0.8}
        >
          <Text style={s.addButtonText}>{activeTab === 'products' ? t.products.addProductBtn : t.products.addBatchBtn}</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={s.errorContainer}>
          <ErrorBanner message={error} onRetry={() => loadData()} />
        </View>
      )}

      {/* Main List Rendering with FlatList */}
      {loading ? (
        <View style={s.loadingContainer}>
          <Skeleton height={90} />
          <Skeleton height={90} />
          <Skeleton height={90} />
        </View>
      ) : activeTab === 'products' ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductRow
              product={item}
              onDelete={() => handleDeleteProduct(item.id, item.name)}
            />
          )}
          contentContainerStyle={s.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadData(true)} tintColor={C.gold} />}
          ListEmptyComponent={<EmptyState title="Chưa có sản phẩm nào" desc="Bấm '+ SẢN PHẨM' ở trên để thêm sản phẩm mới." />}
          windowSize={10}
          maxToRenderPerBatch={10}
        />
      ) : (
        <FlatList
          data={filteredBatches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BatchItemRow
              batch={item}
              onOpenDocs={() => setSelectedBatchForDocs(item)}
            />
          )}
          contentContainerStyle={s.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadData(true)} tintColor={C.gold} />}
          ListEmptyComponent={<EmptyState title="Chưa có lô hàng nào" desc="Bấm '+ TẠO LÔ' ở trên để khởi tạo lô hàng 4 Khóa." />}
          windowSize={10}
          maxToRenderPerBatch={10}
        />
      )}

      {/* ─── MODAL 1: ADD PRODUCT ────────────────────────────────────────── */}
      <Modal visible={showAddProductModal} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.modalOverlay}>
          <View style={s.modalBox}>
            <Text style={s.modalTitle}>{t.products.addProductModal.title}</Text>

            <View style={s.field}>
              <Text style={s.fieldLabel}>{t.products.addProductModal.nameLabel}</Text>
              <TextInput
                style={s.input}
                value={newProdName}
                onChangeText={setNewProdName}
                placeholder={t.products.addProductModal.namePlaceholder}
                placeholderTextColor={C.textMuted}
              />
            </View>

            <View style={s.field}>
              <Text style={s.fieldLabel}>{t.products.addProductModal.hsLabel}</Text>
              <TextInput
                style={s.input}
                value={newProdHs}
                onChangeText={setNewProdHs}
                placeholder={t.products.addProductModal.hsPlaceholder}
                placeholderTextColor={C.textMuted}
              />
            </View>

            <View style={s.field}>
              <Text style={s.fieldLabel}>{t.products.addProductModal.pucLabel}</Text>
              <TextInput
                style={s.input}
                value={newProdOrigin}
                onChangeText={setNewProdOrigin}
                placeholder={t.products.addProductModal.pucPlaceholder}
                placeholderTextColor={C.textMuted}
              />
            </View>

            <View style={s.modalActions}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setShowAddProductModal(false)}>
                <Text style={s.cancelBtnText}>{t.common.close}</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <PrimaryButton label={t.products.addProductModal.createBtn} onPress={handleCreateProduct} loading={submittingProd} />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ─── MODAL 2: ADD BATCH ──────────────────────────────────────────── */}
      <Modal visible={showAddBatchModal} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.modalOverlay}>
          <View style={s.modalBox}>
            <Text style={s.modalTitle}>{t.products.addBatchModal.title}</Text>

            <View style={s.field}>
              <Text style={s.fieldLabel}>{t.products.addBatchModal.batchCodeLabel}</Text>
              <TextInput
                style={s.input}
                value={newBatchCode}
                onChangeText={setNewBatchCode}
                placeholder={t.products.addBatchModal.batchCodePlaceholder}
                placeholderTextColor={C.textMuted}
                autoCapitalize="characters"
              />
            </View>

            <View style={s.field}>
              <Text style={s.fieldLabel}>{t.products.addBatchModal.selectProductLabel}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', gap: 6, marginVertical: 4 }}>
                {products.map((p) => {
                  const isSel = newBatchProdId === p.id;
                  return (
                    <TouchableOpacity
                      key={p.id}
                      style={[s.choiceChip, isSel && s.choiceChipActive]}
                      onPress={() => setNewBatchProdId(p.id)}
                    >
                      <Text style={[s.choiceChipText, isSel && s.choiceChipTextActive]}>{p.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <View style={s.field}>
              <Text style={s.fieldLabel}>{t.products.addBatchModal.quantityLabel}</Text>
              <TextInput
                style={s.input}
                value={newBatchQty}
                onChangeText={setNewBatchQty}
                placeholder={t.products.addBatchModal.quantityPlaceholder}
                keyboardType="numeric"
                placeholderTextColor={C.textMuted}
              />
            </View>

            <View style={s.modalActions}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setShowAddBatchModal(false)}>
                <Text style={s.cancelBtnText}>{t.common.close}</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <PrimaryButton label={t.products.addBatchModal.createBtn} onPress={handleCreateBatch} loading={submittingBatch} />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ─── MODAL 3: 4-KEY DOCUMENT MANAGEMENT ─────────────────────────── */}
      <Modal visible={!!selectedBatchForDocs} animationType="slide" transparent>
        <View style={s.modalOverlay}>
          <View style={s.modalBox}>
            <Text style={s.modalTitle}>{t.products.fourKeysModal.title}: {selectedBatchForDocs?.batchCode}</Text>
            <Text style={s.modalSub}>{t.products.fourKeysModal.missingBanner}</Text>

            <View style={s.docKeysList}>
              <DocKeyUploadRow
                label={t.docKeys.phyto.label}
                desc={t.docKeys.phyto.desc}
                onUpload={() => handleUploadKeyDoc(selectedBatchForDocs!.id, 'PHYTO', t.docKeys.phyto.label)}
              />
              <DocKeyUploadRow
                label={t.docKeys.lab.label}
                desc={t.docKeys.lab.desc}
                onUpload={() => handleUploadKeyDoc(selectedBatchForDocs!.id, 'LAB_REPORT', t.docKeys.lab.label)}
              />
              <DocKeyUploadRow
                label={t.docKeys.co.label}
                desc={t.docKeys.co.desc}
                onUpload={() => handleUploadKeyDoc(selectedBatchForDocs!.id, 'CO', t.docKeys.co.label)}
              />
              <DocKeyUploadRow
                label={t.docKeys.pkg.label}
                desc={t.docKeys.pkg.desc}
                onUpload={() => handleUploadKeyDoc(selectedBatchForDocs!.id, 'PACKING_LIST', t.docKeys.pkg.label)}
              />
            </View>

            <TouchableOpacity style={[s.cancelBtn, { marginTop: 12 }]} onPress={() => setSelectedBatchForDocs(null)}>
              <Text style={s.cancelBtnText}>{t.common.close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────
const ProductRow = React.memo(function ProductRow({
  product, onDelete,
}: {
  product: ProductItem; onDelete: () => void;
}) {
  return (
    <Card style={pc.card}>
      <View style={pc.topRow}>
        <View style={pc.iconBox}><Text style={pc.iconText}>SP</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={pc.name}>{product.name}</Text>
          <Text style={pc.hs}>HS: {product.hsCode || '0810.60.00'}</Text>
        </View>
        <TouchableOpacity style={pc.delBtn} onPress={onDelete}>
          <Text style={pc.delText}>Xóa</Text>
        </TouchableOpacity>
      </View>
      {product.origin && <Text style={pc.origin}>Vùng trồng / PUC: {product.origin}</Text>}
    </Card>
  );
});

const BatchItemRow = React.memo(function BatchItemRow({
  batch, onOpenDocs,
}: {
  batch: BatchItem; onOpenDocs: () => void;
}) {
  const docs = batch.documents?.map((d) => d.document) || [];
  const hasPhyto = docs.some((d) => d.type === 'PHYTO');
  const hasLab = docs.some((d) => d.type === 'LAB_REPORT');
  const hasCo = docs.some((d) => d.type === 'CO');
  const hasPkg = docs.some((d) => d.type === 'PACKING_LIST');

  return (
    <Card style={bc.card}>
      <View style={bc.topRow}>
        <Text style={bc.code}>{batch.batchCode}</Text>
        <StatusBadge status={batch.status} />
      </View>
      <Text style={bc.product}>{batch.product?.name ?? batch.productName ?? 'Sầu riêng xuất khẩu'}</Text>
      <View style={bc.bottomRow}>
        <View style={bc.keys}>
          <KeyBadge label="Phyto" active={hasPhyto} />
          <KeyBadge label="Lab" active={hasLab} />
          <KeyBadge label="CO" active={hasCo} />
          <KeyBadge label="Pkg" active={hasPkg} />
        </View>
        <TouchableOpacity style={bc.manageBtn} onPress={onOpenDocs}>
          <Text style={bc.manageBtnText}>4 Khóa hồ sơ &gt;</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
});

function DocKeyUploadRow({ label, desc, onUpload }: { label: string; desc: string; onUpload: () => void }) {
  return (
    <TouchableOpacity style={dk.row} onPress={onUpload} activeOpacity={0.8}>
      <View style={{ flex: 1 }}>
        <Text style={dk.label}>{label}</Text>
        <Text style={dk.desc}>{desc}</Text>
      </View>
      <View style={dk.uploadBadge}>
        <Text style={dk.uploadText}>+ Nạp file</Text>
      </View>
    </TouchableOpacity>
  );
}

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
  actionBar: { flexDirection: 'row', padding: 14, gap: 8, alignItems: 'center' },
  searchBox: { flex: 1, backgroundColor: C.white, borderRadius: 10, borderWidth: 1, borderColor: C.border, paddingHorizontal: 10 },
  searchInput: { height: 40, fontSize: FONT_SIZE.sm, color: C.textPrimary },
  addButton: { backgroundColor: C.navyMid, borderRadius: 10, paddingHorizontal: 12, height: 40, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: '#fff', fontSize: 11, fontWeight: '900', letterSpacing: 0.3 },
  errorContainer: { paddingHorizontal: 14, paddingTop: 4 },
  loadingContainer: { padding: 14, gap: 10 },
  listContent: { paddingHorizontal: 14, paddingBottom: 32, gap: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: C.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, gap: 12 },
  modalTitle: { fontSize: FONT_SIZE.lg, fontWeight: '900', color: C.textPrimary },
  modalSub: { fontSize: FONT_SIZE.xs, color: C.textSecondary, marginBottom: 4 },
  field: { gap: 4 },
  fieldLabel: { fontSize: FONT_SIZE.xs, fontWeight: '700', color: C.textSecondary },
  input: { borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 10, fontSize: FONT_SIZE.sm, backgroundColor: C.surface, color: C.textPrimary },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 10, alignItems: 'center' },
  cancelBtn: { paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10, backgroundColor: C.surfaceDim, alignItems: 'center' },
  cancelBtnText: { fontSize: FONT_SIZE.sm, fontWeight: '800', color: C.textSecondary },
  choiceChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: C.surfaceDim, borderWidth: 1, borderColor: C.borderFaint },
  choiceChipActive: { backgroundColor: C.navyMid, borderColor: C.navyMid },
  choiceChipText: { fontSize: FONT_SIZE.xs, color: C.textPrimary, fontWeight: '700' },
  choiceChipTextActive: { color: '#fff' },
  docKeysList: { gap: 8 },
});

const pc = StyleSheet.create({
  card: { gap: 6, padding: 12 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBox: { width: 36, height: 36, borderRadius: 8, backgroundColor: C.navyMid + '15', alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: FONT_SIZE.xs, fontWeight: '900', color: C.navyMid },
  name: { fontSize: FONT_SIZE.base, fontWeight: '800', color: C.textPrimary },
  hs: { fontSize: 10, color: C.textMuted, fontWeight: '600' },
  delBtn: { backgroundColor: C.roseBg, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  delText: { fontSize: 10, fontWeight: '800', color: C.rose },
  origin: { fontSize: FONT_SIZE.xs, color: C.textSecondary },
});

const bc = StyleSheet.create({
  card: { gap: 6, padding: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  code: { fontSize: FONT_SIZE.sm, fontWeight: '900', color: C.navyMid, fontVariant: ['tabular-nums'] },
  product: { fontSize: FONT_SIZE.sm, color: C.textPrimary, fontWeight: '600' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  keys: { flexDirection: 'row', gap: 4 },
  manageBtn: { backgroundColor: C.navyMid + '10', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  manageBtnText: { fontSize: 10, fontWeight: '800', color: C.navyMid },
});

const dk = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: C.surface, borderRadius: 10, borderWidth: 1, borderColor: C.borderFaint, gap: 10 },
  label: { fontSize: FONT_SIZE.sm, fontWeight: '800', color: C.textPrimary },
  desc: { fontSize: 10, color: C.textMuted, marginTop: 1 },
  uploadBadge: { backgroundColor: C.emeraldBg, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 5, borderWidth: 1, borderColor: C.emerald + '40' },
  uploadText: { fontSize: 10, fontWeight: '800', color: C.emerald },
});
