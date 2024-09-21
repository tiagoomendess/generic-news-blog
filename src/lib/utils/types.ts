
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
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    created_at: string;
    updated_at: string;
}

export interface ApiImageLite {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}

export interface ApiImageFormats {
    small: ApiImageLite | undefined;
    medium: ApiImageLite | undefined;
    large: ApiImageLite | undefined;
    thumbnail: ApiImageLite;
}

export interface SettingsApiResponse {
    SiteName: string;
    SiteUrl: string;
    SiteEmail: string;
    SiteSquareLogo: ApiResponse<DataItem<ApiImage>>;
    HeaderImageForLightMode: ApiResponse<DataItem<ApiImage>>;
    HeaderImageForDarkMode: ApiResponse<DataItem<ApiImage>>;
    SiteFavIcon: ApiResponse<DataItem<ApiImage>>;
}

export interface Settings {
    SiteName: string;
    SiteUrl: string;
    SiteEmail: string;
    SiteSquareLogo: string;
    HeaderImageForLightMode: string;
    HeaderImageForDarkMode: string;
    SiteFavIcon: string;
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
