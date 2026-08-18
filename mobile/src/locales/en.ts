export const en = {
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

  checkResults: {
    compliant: 'GACC Protocol Compliant',
    conditionally_compliant: 'Conditionally Compliant',
    non_compliant: 'Non-Compliant',
    insufficient_information: 'Insufficient Documents',
    not_applicable: 'Not Applicable',
    manual_review_required: 'Manual Review Required',
  },

  checkStatuses: {
    queued: 'Queued',
    processing: 'AI Analyzing...',
    needs_input: 'Action Required',
    completed: 'Verified',
    failed: 'Failed',
    cancelled: 'Cancelled',
  },

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

  roles: {
    OWNER: 'Owner',
    MANAGER: 'Manager',
    COMPLIANCE: 'Compliance Analyst',
    VIEWER: 'Viewer',
  },

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

  quickPrompts: [
    'Cadmium limit under GB 2762-2022?',
    'Phytosanitary certificate validity for China?',
    '4 mandatory documents for fresh durian export?',
    'GACC Decree 248 CIFER registration guide?',
  ],

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
  },
};
