export const vi = {
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
  },
};
