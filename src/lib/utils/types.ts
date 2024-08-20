
export interface DataItem<T> {
    id: number;
    attributes: T;
}

export interface ApiResponse<T> {
    data: T;
    error?: ApiError;
    meta?: ApiMeta;
}

export interface ApiError {
    status: number;
    name: string;
    message: string;
    details: any;
}

export interface ApiMeta {
    pagination?: ApiPagination;
}

export interface ApiPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface Article {
    id?: number;
    title: string;
    slug: string;
    body: string;
    picture: any;
    tags: any;
    category: any;
    metaDescription: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
}

export interface ApiEntity<T> {
    id: number;
    attributes: T;
}

export interface Category {
    id: number;
    name: string;
}

export interface ApiImage {
    name: string;
    caption: string;
    width: number;
    height: number;
    mime: string;
    url: string;
    provider: string;
}

export interface SettingsApiResponse {
    SiteName: string;
    SiteUrl: string;
    SiteEmail: string;
    SiteHorizontalLogo: ApiImage;
    SiteSquareLogo: ApiImage;
}

export interface Settings {
    SiteName: string;
    SiteUrl: string;
    SiteEmail: string;
    SiteHorizontalLogo: string;
    SiteSquareLogo: string;
}

export interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
}
