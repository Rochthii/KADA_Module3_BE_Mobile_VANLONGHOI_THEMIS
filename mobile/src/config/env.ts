export type Environment = 'development' | 'demo' | 'production';

export interface EnvProfile {
  id: Environment;
  name: string;
  badge: string;
  apiUrl: string;
  description: string;
  features: {
    enableDemoData: boolean;
    enableLiveAI: boolean;
    enableAuditLog: boolean;
  };
}

export const ENV_PROFILES: Record<Environment, EnvProfile> = {
  development: {
    id: 'development',
    name: 'Môi trường Phát triển (Local LAN)',
    badge: 'DEV LOCAL',
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://192.168.100.234:3001/api',
    description: 'Kết nối trực tiếp máy phát triển local qua mạng LAN.',
    features: {
      enableDemoData: false,
      enableLiveAI: true,
      enableAuditLog: true,
    },
  },
  demo: {
    id: 'demo',
    name: 'Môi trường Demo Thuyết trình (Presentation)',
    badge: 'DEMO EVALUATION',
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://192.168.100.234:3001/api',
    description: 'Nạp sẵn kịch bản 2 Lô hàng mẫu (Vi phạm & Đạt chuẩn) phục vụ bảo vệ đồ án.',
    features: {
      enableDemoData: true,
      enableLiveAI: true,
      enableAuditLog: true,
    },
  },
  production: {
    id: 'production',
    name: 'Môi trường Production (Cloud Live)',
    badge: 'PRODUCTION',
    apiUrl: 'https://api.themis.vn/api',
    description: 'Môi trường đám mây thực tế kết nối Tổng cục Hải quan GACC.',
    features: {
      enableDemoData: false,
      enableLiveAI: true,
      enableAuditLog: true,
    },
  },
};

// Default active environment for presentation
export const CURRENT_ENV: Environment = (process.env.EXPO_PUBLIC_APP_ENV as Environment) || 'demo';
export const activeEnv: EnvProfile = ENV_PROFILES[CURRENT_ENV];
