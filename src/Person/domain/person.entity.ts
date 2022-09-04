export interface PersonEntity {
  id?: number | null;
  name: string;
  email: string;
  password: string;
  image_url?: string | null;
  image_public_id?: string | null;
  role?: number | null;
}
