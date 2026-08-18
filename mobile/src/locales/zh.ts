export const zh = {
  // ─── Navigation Tabs ──────────────────────────────────────────────────────
  tabs: {
    dashboard: '运行监控',
    products: '产品批次',
    checks: 'AI顾问',
    integrity: '防伪溯源',
    settings: '系统设置',
  },

  // ─── Dashboard Screen ─────────────────────────────────────────────────────
  dashboard: {
    title: '海关合规与运行中心',
    subtitle: '中国海关总署 (GACC) — 海关编码: 0810.60.00',
    kpi: {
      totalBatches: '出口批次总数',
      activeProducts: '认证产品',
      compliantRate: '合规达标率',
      auditEvents: '防伪审计日志',
      containerEst: '货柜预估:',
      billionVnd: '亿越南盾',
      cont: '柜',
    },
    radar: {
      title: '中国海关合规雷达与现场预警',
      cadmiumLabel: '镉限量指标 (GB 2762-2022)',
      cadmiumDesc: '最高允许限量 ≤ 0.05 mg/kg。从 0.040 mg/kg 起触发早期预警。',
      cadmiumSafe: '现场安全基准: 0.028 mg/kg',
      phytoLabel: '植物检疫证书 (Phyto) 有效期',
      phytoDesc: '有效期最长14天。剩余 ≤ 3天时触发优先通关预警。',
      ciferLabel: 'CIFER注册编号 (第248/249号令)',
      ciferDesc: '100%包装厂和种植园必须持有有效的PUC和PHC海关备案编号。',
    },
    actionItems: {
      title: '紧急处理与待办事项',
      badge: '紧急待办',
      phytoExpiring: '批次 DURIAN-2024-889 植检证书即将过期 (剩余2天) — 需优先办理口岸通关。',
      cadmiumWarning: '批次 892 检测报告接近镉最高限量 (0.042 mg/kg) — 需复检产地果园。',
    },
    recentBatches: {
      title: '近期批次与4项核心单证',
      viewAll: '查看全部',
      empty: '暂无创建的出口批次。',
    },
  },

  // ─── Products & Batches Screen ────────────────────────────────────────────
  products: {
    title: '产品目录与出口批次',
    subtitle: '管理果园PUC与包装厂PHC资质单证',
    tabProducts: '产品列表',
    tabBatches: '4证核心批次',
    addProductBtn: '+ 新增产品',
    addBatchBtn: '+ 创建批次',
    searchPlaceholder: '搜索产品名称、编码或批次号...',
    productCard: {
      codePrefix: '产品编码:',
      hsPrefix: '海关编码:',
      originPrefix: '产地 / PUC:',
      deleteConfirmTitle: '删除产品',
      deleteConfirmMsg: '确定要删除此产品吗？此操作将被记录在不可篡改的审计日志中。',
      deleteSuccess: '已成功删除产品。',
    },
    batchCard: {
      codePrefix: '批次号:',
      productPrefix: '产品:',
      pucPrefix: '果园PUC:',
      quantityPrefix: '出口数量:',
      keysStatus: '4项核心单证:',
      openKeysBtn: '4项单证详情 >',
    },
    addProductModal: {
      title: '添加新出口产品',
      nameLabel: '产品名称 *',
      namePlaceholder: '例如：金枕头优质鲜榴莲 1级果',
      codeLabel: '产品编码 *',
      codePlaceholder: '例如：SP-SR-MT01',
      hsLabel: '海关HS编码 *',
      hsPlaceholder: '0810.60.00',
      pucLabel: '果园PUC备案号 *',
      pucPlaceholder: '例如：VN-DL-0012',
      createBtn: '创建产品',
      validationError: '请填写所有带 (*) 的必填字段。',
      createSuccess: '已成功创建产品。',
    },
    addBatchModal: {
      title: '创建新出口榴莲批次',
      batchCodeLabel: '出口批次号 *',
      batchCodePlaceholder: '例如：DURIAN-2024-999',
      selectProductLabel: '选择出口产品 *',
      quantityLabel: '出口产量 (吨 / 箱) *',
      quantityPlaceholder: '例如：20 吨 (1,300 箱)',
      pucCodeLabel: '果园PUC编号',
      pucCodePlaceholder: '例如：VN-DL-0012',
      createBtn: '初始化批次',
      validationError: '请输入批次号并选择对应产品。',
      createSuccess: '已成功创建新批次。',
    },
    fourKeysModal: {
      title: '批次4项核心法定单证',
      batchPrefix: '批次:',
      readyBanner: '4项单证齐全 — 符合中国海关出口标准！',
      missingBanner: '单证缺失 — 请上传全部4项单证以确保通关。',
      uploadAction: '上传单证',
      uploadedAction: '已上传',
      docUploadedSuccess: '单证上传成功。',
    },
  },

  // ─── AI Checks & Field Advisor Screen ──────────────────────────────────────
  checks: {
    title: 'AI智能合规顾问与审核历史',
    subtitle: '中国海关总署议定书 — 现场实时法规解答',
    tabAdvisor: '现场AI助手',
    tabHistory: '审核历史',
    advisor: {
      headerBadge: 'AI 实时顾问',
      welcome: '您好！我是 Themis LexiGuard 农业出口法规AI助手。请随时咨询关于中国海关总署 (GACC) 的监管标准（2024年议定书、第248/249号令、GB 2762 镉限量、植检证书14天有效期等）。',
      inputPlaceholder: '输入海关监管合规问题...',
      sendBtn: '发送',
      thinking: 'AI正在分析海关总署法规条款...',
    },
    history: {
      emptyTitle: '暂无审核记录',
      emptyDesc: '批次单证合规审查结果将在此处展示。',
    },
  },

  // ─── Integrity & Blockchain Merkle Screen ──────────────────────────────────
  integrity: {
    title: '防伪溯源与 SHA-256 默克尔链',
    subtitle: '不可篡改审计日志 — 杜绝出口单证造假',
    stats: {
      title: '加密哈希算法完整性保护',
      merkleStatus: '默克尔链状态:',
      merkleActive: '100% 完整不可篡改',
      totalLogs: '审计事件总计:',
      verifiedHashes: 'SHA-256 签名:',
    },
    verifyTool: {
      title: '单证哈希实时校验工具',
      inputPlaceholder: '粘贴 SHA-256 哈希码或单证编号 (例如: a1b2c3d4...)',
      verifyBtn: '校验单证哈希',
      verifying: '正在校验中...',
      successTitle: '哈希验证通过：单证真实未被篡改',
      failedTitle: '警告：哈希校验失败或单证已被篡改',
      emptyHashAlert: '请输入需要校验的 SHA-256 哈希码。',
    },
    scanner: {
      scanQrBtn: '📷 扫描二维码/条码',
      modalTitle: '扫描包装箱二维码 / 封条',
      instruction: '请将摄像头对准榴莲外箱二维码或海关封条条码进行自动比对',
      permissionTitle: '需要相机访问权限',
      permissionDesc: '本应用需要相机权限以扫描现场货物二维码和防伪标签。',
      grantBtn: '授予相机权限',
      torchOn: '开手电筒',
      torchOff: '关手电筒',
      closeBtn: '关闭扫描',
      scannedSuccess: '已成功识别哈希码！',
    },
    timeline: {
      title: '审计日志时间线',
      subtitle: '不可篡改记录',
      emptyTitle: '暂无审计日志',
      emptyDesc: '所有数据更改和单证操作均将自动在此留痕。',
    },
  },

  // ─── Settings & Account Screen ─────────────────────────────────────────────
  settings: {
    title: '账户与系统设置',
    subtitle: 'Themis LexiGuard — RBAC权限与多语言',
    profileSection: '主管档案',
    orgSection: '认证企业',
    languageSection: '系统语言',
    envSection: '运行环境',
    scopeSection: '监管范围',
    standardLabel: '执行标准',
    standardValue: '中国海关总署 2024 议定书',
    marketLabel: '目标市场',
    marketValue: '中国 (CN)',
    hsCodeLabel: '海关编码',
    hsCodeValue: '0810.60.00 — 鲜榴莲',
    gatewayLabel: 'API 网关',
    databaseLabel: '数据库',
    databaseValue: 'Supabase PostgreSQL',
    aiEngineLabel: 'AI 推理引擎',
    aiEngineValue: 'Gemini 2.4 + 规则引擎',
    logoutBtn: '退出系统登录',
    logoutConfirmTitle: '退出登录',
    logoutConfirmMsg: '确定要退出当前企业账号吗？',
    logoutConfirmAction: '确认退出',
    versionText: 'Themis LexiGuard Mobile v1.0.0',
  },

  // ─── Actions & Audit Labels ───────────────────────────────────────────────
  actions: {
    'product.created': '创建产品',
    'product.updated': '更新产品',
    'product.deleted': '删除产品',
    'batch.created': '创建批次',
    'batch.updated': '更新批次',
    'document.uploaded': '上传单证',
    'document.deleted': '删除单证',
    'check.started': '启动合规检查',
    'check.completed': '完成合规检查',
    'report.approved': '批准合规报告',
    'user.login_success': '用户登录',
    'user.registered': '注册账号',
  },

  // ─── Compliance Check Results ─────────────────────────────────────────────
  checkResults: {
    compliant: '符合中国海关标准',
    conditionally_compliant: '有条件合规',
    non_compliant: '不符合标准',
    insufficient_information: '资料不完整',
    not_applicable: '不适用',
    manual_review_required: '需人工审核',
  },

  // ─── Compliance Check Statuses ────────────────────────────────────────────
  checkStatuses: {
    queued: '排队中',
    processing: 'AI审核中...',
    needs_input: '需补充资料',
    completed: '审核完成',
    failed: '审核失败',
    cancelled: '已取消',
  },

  // ─── Batch Statuses ───────────────────────────────────────────────────────
  batchStatuses: {
    draft: '草稿',
    collecting_documents: '文件收集',
    ready_for_check: '准备检查',
    checking: '审核中',
    action_required: '紧急处理',
    compliant: '合格出口',
    non_compliant: '不合格',
    expired: '已过期',
  },

  // ─── Roles & Permissions ──────────────────────────────────────────────────
  roles: {
    OWNER: '企业法人/所有者',
    MANAGER: '质检主管',
    COMPLIANCE: '合规分析员',
    VIEWER: '观察员',
  },

  // ─── 4-Key Compliance Documents ───────────────────────────────────────────
  docKeys: {
    phyto: {
      label: '1. 植物检疫证书 (Phyto)',
      desc: '符合海关总署GACC标准 (有效期14天)',
    },
    lab: {
      label: '2. 镉重金属检测报告 (Lab)',
      desc: '符合GB 2762-2022标准 (Cd ≤ 0.05 mg/kg)',
    },
    co: {
      label: '3. 原产地证书 (C/O Form E)',
      desc: '中国-东盟自贸区原产地证 (关税 0%)',
    },
    pkg: {
      label: '4. 装箱单与熏蒸证明 (Packing List)',
      desc: '包装厂PHC编号与病虫害控制记录',
    },
  },

  // ─── Quick Prompts for Field AI ───────────────────────────────────────────
  quickPrompts: [
    'GB 2762-2022 鲜榴莲镉限量标准？',
    '出口中国植物检疫证书有效期？',
    '出口鲜榴莲4项核心单证清单？',
    '海关总署第248号令CIFER注册流程？',
  ],

  // ─── UI Common Text ───────────────────────────────────────────────────────
  common: {
    loading: '正在加载数据...',
    save: '保存更改',
    close: '关闭',
    cancel: '取消',
    delete: '删除',
    confirm: '确认',
    retry: '重试',
    search: '搜索...',
    verify: '验证',
    upload: '上传文件',
    send: '发送',
    error: '发生错误',
    success: '操作成功',
  },
};
