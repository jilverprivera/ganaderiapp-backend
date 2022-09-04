export type FileType = {
  file: File | null | undefined;
};

export type File = {
  name: string;
  data: Data;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: ImageType;
  md5: string;
};

export type Data = {
  type: string;
  data: any[];
};

export enum ImageType {
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  WEBP = 'image/webp',
  PNG = 'image/png',
}

// Generated by https://quicktype.io

export interface CloudinaryResponse {
  result: Result;
}

export interface Result {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  api_key: string;
}