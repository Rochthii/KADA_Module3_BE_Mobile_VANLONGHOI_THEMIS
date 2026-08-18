export const en = {
  // ─── Navigation Tabs ──────────────────────────────────────────────────────
  tabs: {
    dashboard: 'Dashboard',
    products: 'Products',
    checks: 'AI Advisor',
    integrity: 'Integrity',
    settings: 'Settings',
  },

  // ─── Dashboard Screen ─────────────────────────────────────────────────────
  dashboard: {
    title: 'Legal Radar & Operations',
    subtitle: 'China GACC Customs Protocol — HS Code: 0810.60.00',
    kpi: {
      totalBatches: 'Total Batches',
      activeProducts: 'Active Products',
      compliantRate: 'Compliance Rate',
      auditEvents: 'Immutable Logs',
      containerEst: 'Est. Cargo:',
      billionVnd: 'Billion VND',
      cont: 'Containers',
    },
    radar: {
      title: 'GACC LEGAL RADAR & FIELD WARNINGS',
      cadmiumLabel: 'Cadmium Threshold (GB 2762-2022)',
      cadmiumDesc: 'Maximum limit ≤ 0.05 mg/kg. Early warning triggers at 0.040 mg/kg.',
      cadmiumSafe: 'Field baseline: 0.028 mg/kg',
      phytoLabel: 'Phytosanitary Certificate Validity',
      phytoDesc: 'Max 14 days validity. Priority dispatch alert triggers at ≤ 3 days.',
      ciferLabel: 'CIFER Identification (Decree 248/249)',
      ciferDesc: '100% packing houses and orchards must hold active PUC/PHC codes.',
    },
    actionItems: {
      title: 'Urgent Action Items',
      badge: 'ACTION REQUIRED',
      phytoExpiring: 'Batch DURIAN-2024-889 Phyto expiring soon (2 days left) — Priority customs clearance needed.',
      cadmiumWarning: 'Batch 892 lab report near Cadmium limit (0.042 mg/kg) — Re-inspect origin orchard.',
    },
    recentBatches: {
      title: 'Recent Batches & 4-Key Documents',
      viewAll: 'View All',
      empty: 'No export batches created yet.',
    },
  },

  // ─── Products & Batches Screen ────────────────────────────────────────────
  products: {
    title: 'Products & Export Batches',
    subtitle: 'Manage PUC Orchard & PHC Packing House Dossiers',
    tabProducts: 'PRODUCTS',
    tabBatches: '4-KEY BATCHES',
    addProductBtn: '+ PRODUCT',
    addBatchBtn: '+ NEW BATCH',
    searchPlaceholder: 'Search product name, code, or batch...',
    productCard: {
      codePrefix: 'Code:',
      hsPrefix: 'HS Code:',
      originPrefix: 'Orchard / PUC:',
      deleteConfirmTitle: 'Delete Product',
      deleteConfirmMsg: 'Are you sure you want to delete this product? This action will be recorded in the immutable audit log.',
      deleteSuccess: 'Product deleted successfully.',
    },
    batchCard: {
      codePrefix: 'Batch:',
      productPrefix: 'Product:',
      pucPrefix: 'PUC Code:',
      quantityPrefix: 'Quantity:',
      keysStatus: '4-Key Status:',
      openKeysBtn: '4-Key Dossier >',
    },
    addProductModal: {
      title: 'Add New Export Product',
      nameLabel: 'Product Name *',
      namePlaceholder: 'e.g. Premium Monthong Durian Grade 1',
      codeLabel: 'Product Code *',
      codePlaceholder: 'e.g. SP-SR-MT01',
      hsLabel: 'Customs HS Code *',
      hsPlaceholder: '0810.60.00',
      pucLabel: 'Orchard PUC Code *',
      pucPlaceholder: 'e.g. VN-DL-0012',
      createBtn: 'Create Product',
      validationError: 'Please fill in all mandatory fields (*).',
      createSuccess: 'Product created successfully.',
    },
    addBatchModal: {
      title: 'Create New Durian Export Batch',
      batchCodeLabel: 'Batch Code *',
      batchCodePlaceholder: 'e.g. DURIAN-2024-999',
      selectProductLabel: 'Select Product *',
      quantityLabel: 'Volume (Tons / Boxes) *',
      quantityPlaceholder: 'e.g. 20 Tons (1,300 Boxes)',
      pucCodeLabel: 'Orchard PUC Code',
      pucCodePlaceholder: 'e.g. VN-DL-0012',
      createBtn: 'Initialize Batch',
      validationError: 'Please enter a Batch Code and select a Product.',
      createSuccess: 'Export batch created successfully.',
    },
    fourKeysModal: {
      title: 'Batch 4-Key Legal Dossier',
      batchPrefix: 'Batch:',
      readyBanner: 'All 4 Keys verified — Ready for export sealing!',
      missingBanner: 'Missing documents — Upload all 4 Keys to ensure clearance.',
      uploadAction: 'Upload Certificate',
      uploadedAction: 'Uploaded',
      docUploadedSuccess: 'Certificate uploaded successfully.',
    },
  },

  // ─── AI Checks & Field Advisor Screen ──────────────────────────────────────
  checks: {
    title: 'AI Compliance Advisor & History',
    subtitle: 'China GACC Protocol — Live Field Legal Guidance',
    tabAdvisor: 'FIELD AI ADVISOR',
    tabHistory: 'AUDIT HISTORY',
    advisor: {
      headerBadge: 'LIVE AI ADVISOR',
      welcome: 'Hello! I am Themis LexiGuard Legal AI. Ask me about China GACC Customs standards (2024 Protocol, Decrees 248/249, Cadmium limits GB 2762, Phyto 14-day validity...).',
      inputPlaceholder: 'Ask a GACC compliance question...',
      sendBtn: 'Send',
      thinking: 'AI analyzing GACC regulatory articles...',
    },
    history: {
      emptyTitle: 'No compliance checks yet',
      emptyDesc: 'Batch dossier audit results will appear here.',
    },
  },

  // ─── Integrity & Blockchain Merkle Screen ──────────────────────────────────
  integrity: {
    title: 'Integrity Monitoring & SHA-256 Chain',
    subtitle: 'Immutable Audit Log — Preventing Export Dossier Fraud',
    stats: {
      title: 'CRYPTOGRAPHIC HASH INTEGRITY PROTECTION',
      merkleStatus: 'Merkle Chain:',
      merkleActive: '100% Immutable',
      totalLogs: 'Total Events:',
      verifiedHashes: 'SHA-256 Signatures:',
    },
    verifyTool: {
      title: 'DOSSIER HASH VERIFICATION TOOL',
      inputPlaceholder: 'Paste SHA-256 hash or certificate number (e.g. a1b2c3d4...)',
      verifyBtn: 'Verify Hash',
      verifying: 'Verifying...',
      successTitle: 'HASH INTACT & VALID',
      failedTitle: 'WARNING: INVALID HASH OR TAMPERED DOSSIER',
      emptyHashAlert: 'Please enter a SHA-256 hash to verify.',
    },
    timeline: {
      title: 'Audit Log Timeline',
      subtitle: 'Immutable Ledger',
      emptyTitle: 'No audit records yet',
      emptyDesc: 'All data modifications will be recorded here automatically.',
    },
  },

  // ─── Settings & Account Screen ─────────────────────────────────────────────
  settings: {
    title: 'Settings & Account',
    subtitle: 'Themis LexiGuard — RBAC Permissions & Localization',
    profileSection: 'OFFICER PROFILE',
    orgSection: 'ORGANIZATION',
    languageSection: 'SYSTEM LANGUAGE',
    envSection: 'SYSTEM ENVIRONMENT',
    scopeSection: 'SYSTEM SCOPE',
    standardLabel: 'Standard',
    standardValue: 'GACC Protocol 2024',
    marketLabel: 'Market',
    marketValue: 'China (CN)',
    hsCodeLabel: 'HS Code',
    hsCodeValue: '0810.60.00 — Fresh Durian',
    gatewayLabel: 'API Gateway',
    databaseLabel: 'Database',
    databaseValue: 'Supabase PostgreSQL',
    aiEngineLabel: 'AI Engine',
    aiEngineValue: 'Gemini 2.4 + Rule Engine',
    logoutBtn: 'Sign Out from System',
    logoutConfirmTitle: 'Sign Out',
    logoutConfirmMsg: 'Are you sure you want to sign out?',
    logoutConfirmAction: 'Sign Out',
    versionText: 'Themis LexiGuard Mobile v1.0.0',
  },

  // ─── Actions & Audit Labels ───────────────────────────────────────────────
  actions: {
    'product.created': 'Create Product',
    'product.updated': 'Update Product',
    'product.deleted': 'Delete Product',
    'batch.created': 'Create Batch',
    'batch.updated': 'Update Batch',
    'document.uploaded': 'Upload Document',
    'document.deleted': 'Delete Document',
    'check.started': 'Start Compliance Check',
    'check.completed': 'Complete Compliance Check',
    'report.approved': 'Approve Report',
    'user.login_success': 'User Login',
    'user.registered': 'Register Account',
  },

  // ─── Compliance Check Results ─────────────────────────────────────────────
  checkResults: {
    compliant: 'GACC Protocol Compliant',
    conditionally_compliant: 'Conditionally Compliant',
    non_compliant: 'Non-Compliant',
    insufficient_information: 'Insufficient Documents',
    not_applicable: 'Not Applicable',
    manual_review_required: 'Manual Review Required',
  },

  // ─── Compliance Check Statuses ────────────────────────────────────────────
  checkStatuses: {
    queued: 'Queued',
    processing: 'AI Analyzing...',
    needs_input: 'Action Required',
    completed: 'Verified',
    failed: 'Failed',
    cancelled: 'Cancelled',
  },

  // ─── Batch Statuses ───────────────────────────────────────────────────────
  batchStatuses: {
    draft: 'Draft',
    collecting_documents: 'Collecting Documents',
    ready_for_check: 'Ready for Check',
    checking: 'Checking',
    action_required: 'Action Required',
    compliant: 'Compliant for Export',
    non_compliant: 'Non-Compliant',
    expired: 'Expired',
  },

  // ─── Roles & Permissions ──────────────────────────────────────────────────
  roles: {
    OWNER: 'Owner',
    MANAGER: 'Manager',
    COMPLIANCE: 'Compliance Analyst',
    VIEWER: 'Viewer',
  },

  // ─── 4-Key Compliance Documents ───────────────────────────────────────────
  docKeys: {
    phyto: {
      label: '1. Phytosanitary Certificate',
      desc: 'Plant health certificate (14 days validity)',
    },
    lab: {
      label: '2. Cadmium Lab Report',
      desc: 'GB 2762-2022 standard (Cd ≤ 0.05 mg/kg)',
    },
    co: {
      label: '3. C/O Form E Certificate',
      desc: 'ASEAN - China origin certificate (0% tariff)',
    },
    pkg: {
      label: '4. Packing List & Fumigation',
      desc: 'PHC facility manifest & pest control record',
    },
  },

  // ─── Quick Prompts for Field AI ───────────────────────────────────────────
  quickPrompts: [
    'Cadmium limit under GB 2762-2022?',
    'Phytosanitary certificate validity for China?',
    '4 mandatory documents for fresh durian export?',
    'GACC Decree 248 CIFER registration guide?',
  ],

  // ─── UI Common Text ───────────────────────────────────────────────────────
  common: {
    loading: 'Loading data...',
    save: 'Save changes',
    close: 'Close',
    cancel: 'Cancel',
    delete: 'Delete',
    confirm: 'Confirm',
    retry: 'Retry',
    search: 'Search...',
    verify: 'Verify',
    upload: 'Upload file',
    send: 'Send',
    error: 'An error occurred',
    success: 'Success',
  },
};
