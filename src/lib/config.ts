export interface AppConfig {
    appName: string;
    appUrl: string;
    apiBaseUrl: string;
    defaultLocale: string;
    defaultTheme: string;
}

export const config : AppConfig = {
    appName: import.meta.env.VITE_APP_NAME || 'Generic Blog',
    appUrl: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api',
    defaultLocale: import.meta.env.VITE_DEFAULT_LOCALE || 'pt',
    defaultTheme: import.meta.env.VITE_DEFAULT_THEME || 'light',
}
