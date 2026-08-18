export const zh = {
  actions: {
    'product.created': '创建产品',
    'product.updated': '更新产品',
    'product.deleted': '删除产品',
    'batch.created': '创建批次',
    'batch.updated': '更新批次',
    'document.uploaded': '上传文件',
    'document.deleted': '删除文件',
    'check.started': '开始合规检查',
    'check.completed': '完成合规检查',
    'report.approved': '批准报告',
    'user.login_success': '用户登录',
    'user.registered': '注册账号',
  },

  checkResults: {
    compliant: '符合中国海关标准',
    conditionally_compliant: '有条件合规',
    non_compliant: '不符合标准',
    insufficient_information: '资料不完整',
    not_applicable: '不适用',
    manual_review_required: '需人工审核',
  },

  checkStatuses: {
    queued: '排队中',
    processing: 'AI审核中...',
    needs_input: '需补充资料',
    completed: '审核完成',
    failed: '审核失败',
    cancelled: '已取消',
  },

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

  roles: {
    OWNER: '企业法人/所有者',
    MANAGER: '质检主管',
    COMPLIANCE: '合规分析员',
    VIEWER: '观察员',
  },

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

  quickPrompts: [
    'GB 2762-2022 鲜榴莲镉限量标准？',
    '出口中国植物检疫证书有效期？',
    '出口鲜榴莲4项核心单证清单？',
    '海关总署第248号令CIFER注册流程？',
  ],

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
  },
};
