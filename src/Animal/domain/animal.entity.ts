export interface Animal {
  id?: number | null;
  name?: string;
  serial?: string;
  gender_male: boolean;
  gender_female: boolean;
  category_id: number;
  type_id: number;
  image_url?: string;
  image_public_id?: string;
  born: boolean;
  born_date: string;
  born_mom_id: string;
  born_dad_id: string;
  purchased: boolean;
  purchased_date: string;
  purchased_price: number;
  purchased_weight: number;
  sold: boolean;
  sold_date: string;
  sold_price: number;
  sold_weight: number;

  created_at: number;
  updated_at: number;
}
