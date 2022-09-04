export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  image_url?: string;
  image_public_id?: string;
  role?: number;
};
