export const vi = {
  // ─── Navigation Tabs ──────────────────────────────────────────────────────
  tabs: {
    dashboard: 'Điều hành',
    products: 'Sản phẩm',
    checks: 'Tư vấn AI',
    integrity: 'Liêm chính',
    settings: 'Cài đặt',
  },

  // ─── Dashboard Screen ─────────────────────────────────────────────────────
  dashboard: {
    title: 'Ra-da Pháp lý & Điều hành',
    subtitle: 'Hải quan GACC Trung Quốc — Mã HS: 0810.60.00',
    kpi: {
      totalBatches: 'Tổng Lô hàng',
      activeProducts: 'Sản phẩm',
      compliantRate: 'Tỷ lệ Tuân thủ',
      auditEvents: 'Nhật ký Bất biến',
      containerEst: 'Ước tính:',
      billionVnd: 'Tỷ VNĐ',
      cont: 'Cont',
    },
    radar: {
      title: 'RA-DA PHÁP LÝ GACC & CẢNH BÁO THỰC ĐỊA',
      cadmiumLabel: 'Ngưỡng Cadmium (GB 2762-2022)',
      cadmiumDesc: 'Giới hạn tối đa cho phép ≤ 0.05 mg/kg. Cảnh báo sớm từ 0.040 mg/kg.',
      cadmiumSafe: 'Mức an toàn thực địa: 0.028 mg/kg',
      phytoLabel: 'Hiệu lực Kiểm dịch Thực vật (Phyto)',
      phytoDesc: 'Thời hạn tối đa 14 ngày. Cảnh báo ưu tiên xuất bến khi còn ≤ 3 ngày.',
      ciferLabel: 'Định danh CIFER Lệnh 248/249',
      ciferDesc: '100% cơ sở đóng gói và vùng trồng phải có mã PUC/PHC hiệu lực.',
    },
    actionItems: {
      title: 'Hồ sơ & Việc cần Xử lý Ngay',
      badge: 'VIỆC CẦN LÀM',
      phytoExpiring: 'Lô DURIAN-2024-889 sắp hết hạn Phyto (còn 2 ngày) — Cần ưu tiên thông quan khẩn.',
      cadmiumWarning: 'Phiếu kiểm nghiệm Lô 892 tiệm cận ngưỡng Cadmium (0.042 mg/kg) — Kiểm tra lại vùng trồng.',
    },
    recentBatches: {
      title: 'Lô hàng & Hồ sơ 4 Khóa Gần đây',
      viewAll: 'Xem tất cả',
      empty: 'Chưa có lô hàng nào được tạo.',
    },
  },

  // ─── Products & Batches Screen ────────────────────────────────────────────
  products: {
    title: 'Danh mục Sản phẩm & Lô hàng',
    subtitle: 'Quản lý Hồ sơ Vùng trồng PUC & Cơ sở PHC',
    tabProducts: 'SẢN PHẨM',
    tabBatches: 'LÔ HÀNG 4 KHÓA',
    addProductBtn: '+ SẢN PHẨM',
    addBatchBtn: '+ TẠO LÔ',
    searchPlaceholder: 'Tìm theo tên, mã sản phẩm hoặc lô hàng...',
    productCard: {
      codePrefix: 'Mã SP:',
      hsPrefix: 'HS:',
      originPrefix: 'Vùng trồng / PUC:',
      deleteConfirmTitle: 'Xóa sản phẩm',
      deleteConfirmMsg: 'Bạn có chắc muốn xóa sản phẩm này? Hành động này sẽ được ghi vào Nhật ký Liêm chính.',
      deleteSuccess: 'Đã xóa sản phẩm thành công.',
    },
    batchCard: {
      codePrefix: 'Mã Lô:',
      productPrefix: 'Sản phẩm:',
      pucPrefix: 'Mã PUC:',
      quantityPrefix: 'Số lượng:',
      keysStatus: '4 Khóa Hồ sơ:',
      openKeysBtn: '4 Khóa hồ sơ >',
    },
    addProductModal: {
      title: 'Thêm Sản phẩm Xuất khẩu Mới',
      nameLabel: 'Tên Sản Phẩm *',
      namePlaceholder: 'VD: Sầu riêng Monthong Cơm Vàng Loại 1',
      codeLabel: 'Mã Sản Phẩm *',
      codePlaceholder: 'VD: SP-SR-MT01',
      hsLabel: 'Mã HS Hải quan *',
      hsPlaceholder: '0810.60.00',
      pucLabel: 'Mã Vùng Trồng (PUC) *',
      pucPlaceholder: 'VD: VN-DL-0012',
      createBtn: 'Tạo sản phẩm',
      validationError: 'Vui lòng nhập đầy đủ các trường bắt buộc (*).',
      createSuccess: 'Đã tạo sản phẩm thành công.',
    },
    addBatchModal: {
      title: 'Tạo Lô Hàng Sầu Riêng Mới',
      batchCodeLabel: 'Mã Lô Hàng *',
      batchCodePlaceholder: 'VD: DURIAN-2024-999',
      selectProductLabel: 'Chọn Sản Phẩm *',
      quantityLabel: 'Sản lượng (Tấn / Hộp) *',
      quantityPlaceholder: 'VD: 20 Tấn (1.300 Thùng)',
      pucCodeLabel: 'Mã Số Vùng Trồng (PUC)',
      pucCodePlaceholder: 'VD: VN-DL-0012',
      createBtn: 'Khởi tạo lô hàng',
      validationError: 'Vui lòng nhập Mã lô và Chọn sản phẩm.',
      createSuccess: 'Đã tạo lô hàng mới thành công.',
    },
    fourKeysModal: {
      title: '4 Khóa Hồ Sơ Pháp Lý Lô Hàng',
      batchPrefix: 'Lô:',
      readyBanner: 'Đủ 4 Khóa hồ sơ — Sẵn sàng niêm phong xuất khẩu!',
      missingBanner: 'Thiếu chứng thư — Hãy nạp đủ 4 Khóa để đảm bảo thông quan.',
      uploadAction: 'Nạp chứng thư',
      uploadedAction: 'Đã nạp',
      docUploadedSuccess: 'Đã nạp chứng thư thành công.',
    },
  },

  // ─── AI Checks & Field Advisor Screen ──────────────────────────────────────
  checks: {
    title: 'Trợ lý AI & Lịch sử Thẩm định',
    subtitle: 'Nghị định thư GACC Trung Quốc — Tư vấn Trực tiếp Thực địa',
    tabAdvisor: 'TRỢ LÝ AI THỰC ĐỊA',
    tabHistory: 'LỊCH SỬ THẨM ĐỊNH',
    advisor: {
      headerBadge: 'LIVE AI ADVISOR',
      welcome: 'Xin chào! Tôi là Trợ lý AI Pháp lý Themis LexiGuard. Hãy hỏi tôi về Quy chuẩn Hải quan GACC Trung Quốc (Nghị định thư 2024, Lệnh 248/249, Ngưỡng Cadmium GB 2762, Hạn Phyto 14 ngày...).',
      inputPlaceholder: 'Nhập câu hỏi quy chuẩn GACC...',
      sendBtn: 'Gửi',
      thinking: 'AI đang phân tích quy định GACC...',
    },
    history: {
      emptyTitle: 'Chưa có lượt kiểm định nào',
      emptyDesc: 'Các kết quả thẩm định hồ sơ lô hàng sẽ xuất hiện tại đây.',
    },
  },

  // ─── Integrity & Blockchain Merkle Screen ──────────────────────────────────
  integrity: {
    title: 'Giám sát Liêm chính & Chuỗi SHA-256',
    subtitle: 'Nhật ký Kiểm toán Bất biến — Chống Gian lận Hồ sơ Xuất khẩu',
    stats: {
      title: 'BẢO VỆ TOÀN VẸN BẰNG MÃ BĂM MẬT MÃ',
      merkleStatus: 'Chuỗi Merkle:',
      merkleActive: '100% Bất biến',
      totalLogs: 'Tổng sự kiện:',
      verifiedHashes: 'Khóa SHA-256:',
    },
    verifyTool: {
      title: 'CÔNG CỤ XÁC THỰC MÃ BĂM HỒ SƠ',
      inputPlaceholder: 'Dán mã băm SHA-256 hoặc số chứng thư (VD: a1b2c3d4...)',
      verifyBtn: 'Xác thực mã băm',
      verifying: 'Đang kiểm tra...',
      successTitle: 'MÃ BĂM NGUYÊN VẸN & HỢP LỆ',
      failedTitle: 'CẢNH BÁO: MÃ BĂM KHÔNG HỢP LỆ',
      emptyHashAlert: 'Vui lòng nhập mã băm SHA-256 cần kiểm tra.',
    },
    timeline: {
      title: 'Dòng thời gian Nhật ký Kiểm toán',
      subtitle: 'Ghi nhận bất biến',
      emptyTitle: 'Chưa có nhật ký kiểm toán',
      emptyDesc: 'Mọi thao tác thay đổi dữ liệu sẽ được ghi nhận tại đây.',
    },
  },

  // ─── Settings & Account Screen ─────────────────────────────────────────────
  settings: {
    title: 'Cài đặt & Tài khoản',
    subtitle: 'Themis LexiGuard — Phân quyền RBAC & Ngôn ngữ',
    profileSection: 'HỒ SƠ CÁN BỘ',
    orgSection: 'TỔ CHỨC',
    languageSection: 'NGÔN NGỮ HỆ THỐNG',
    envSection: 'MÔI TRƯỜNG HỆ THỐNG',
    scopeSection: 'PHẠM VI HỆ THỐNG',
    standardLabel: 'Tiêu chuẩn',
    standardValue: 'GACC Protocol 2024',
    marketLabel: 'Thị trường',
    marketValue: 'Trung Quốc (CN)',
    hsCodeLabel: 'Mã HS',
    hsCodeValue: '0810.60.00 — Sầu riêng',
    gatewayLabel: 'API Gateway',
    databaseLabel: 'Cơ sở dữ liệu',
    databaseValue: 'Supabase PostgreSQL',
    aiEngineLabel: 'AI Engine',
    aiEngineValue: 'Gemini 2.4 + Rule Engine',
    logoutBtn: 'Đăng xuất khỏi hệ thống',
    logoutConfirmTitle: 'Đăng xuất',
    logoutConfirmMsg: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?',
    logoutConfirmAction: 'Đăng xuất',
    versionText: 'Themis LexiGuard Mobile v1.0.0',
  },

  // ─── Actions & Audit Labels ───────────────────────────────────────────────
  actions: {
    'product.created': 'Tạo sản phẩm',
    'product.updated': 'Sửa sản phẩm',
    'product.deleted': 'Xóa sản phẩm',
    'batch.created': 'Tạo lô hàng',
    'batch.updated': 'Cập nhật lô',
    'document.uploaded': 'Nạp tài liệu',
    'document.deleted': 'Xóa tài liệu',
    'check.started': 'Bắt đầu kiểm định',
    'check.completed': 'Hoàn thành kiểm định',
    'report.approved': 'Duyệt báo cáo',
    'user.login_success': 'Đăng nhập',
    'user.registered': 'Đăng ký tài khoản',
  },

  // ─── Compliance Check Results ─────────────────────────────────────────────
  checkResults: {
    compliant: 'Đạt Tuân thủ GACC',
    conditionally_compliant: 'Có điều kiện',
    non_compliant: 'Vi phạm Tiêu chuẩn',
    insufficient_information: 'Thiếu hồ sơ',
    not_applicable: 'Không áp dụng',
    manual_review_required: 'Cần duyệt thủ công',
  },

  // ─── Compliance Check Statuses ────────────────────────────────────────────
  checkStatuses: {
    queued: 'Đang xếp hàng',
    processing: 'AI Đang quét...',
    needs_input: 'Cần bổ sung',
    completed: 'Đã thẩm định',
    failed: 'Thất bại',
    cancelled: 'Đã hủy',
  },

  // ─── Batch Statuses ───────────────────────────────────────────────────────
  batchStatuses: {
    draft: 'Bản nháp',
    collecting_documents: 'Đang thu thập hồ sơ',
    ready_for_check: 'Sẵn sàng kiểm tra',
    checking: 'Đang kiểm định',
    action_required: 'Cần xử lý gấp',
    compliant: 'Đạt chuẩn xuất khẩu',
    non_compliant: 'Không đạt tiêu chuẩn',
    expired: 'Đã hết hạn',
  },

  // ─── Roles & Permissions ──────────────────────────────────────────────────
  roles: {
    OWNER: 'Chủ sở hữu',
    MANAGER: 'Quản lý',
    COMPLIANCE: 'Phân tích viên',
    VIEWER: 'Người xem',
  },

  // ─── 4-Key Compliance Documents ───────────────────────────────────────────
  docKeys: {
    phyto: {
      label: '1. Kiểm dịch TV Phyto',
      desc: 'Chứng nhận kiểm dịch đạt chuẩn GACC (Hiệu lực 14 ngày)',
    },
    lab: {
      label: '2. Phiếu Lab Cadmium',
      desc: 'Đạt giới hạn Cadmium ≤ 0.05 mg/kg (GB 2762-2022)',
    },
    co: {
      label: '3. Chứng nhận C/O Form E',
      desc: 'Xuất xứ hàng hóa ASEAN - Trung Quốc (Thuế 0%)',
    },
    pkg: {
      label: '4. Packing List & Khử trùng',
      desc: 'Bảng kê đóng gói cơ sở PHC & kiểm soát dịch hại',
    },
  },

  // ─── Quick Prompts for Field AI ───────────────────────────────────────────
  quickPrompts: [
    'Quy định mức Cadmium GB 2762-2022?',
    'Hạn kiểm dịch Phyto đi Trung Quốc?',
    '4 Khóa chứng từ xuất khẩu gồm những gì?',
    'Quy trình đăng ký CIFER Lệnh 248?',
  ],

  // ─── UI Common Text ───────────────────────────────────────────────────────
  common: {
    loading: 'Đang tải dữ liệu...',
    save: 'Lưu thay đổi',
    close: 'Đóng',
    cancel: 'Hủy bỏ',
    delete: 'Xóa',
    confirm: 'Xác nhận',
    retry: 'Thử lại',
    search: 'Tìm kiếm...',
    verify: 'Kiểm tra',
    upload: 'Nạp file',
    send: 'Gửi',
    error: 'Đã có lỗi xảy ra',
    success: 'Thành công',
  },
};
