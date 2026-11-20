export type DietaryTag = 'Vegetarian' | 'Chef Special' | 'Gluten Free' | 'Signature' | 'Seafood';

export type MenuCategory = 
  | 'All' 
  | 'Best Appetizers' 
  | 'Mains & Specialties' 
  | 'Woodfire & Pasta' 
  | 'Decadent Desserts' 
  | 'Artisanal Cocktails & Wines';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  tags: DietaryTag[];
  calories?: number;
  preparationTime?: string;
  allergens?: string[];
  winePairing?: string;
  chefNote?: string;
  isPopular?: boolean;
}

export interface SelectedItem {
  item: MenuItem;
  quantity: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Interior & Ambiance' | 'Plated Dishes' | 'Cocktails & Wine' | 'Terrace';
  imageUrl: string;
  caption: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  favoriteDish: string;
  date: string;
}

export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: 'Main Dining Room' | 'Garden Terrace' | 'Chef\'s Counter' | 'Private Wine Cellar';
  occasion: 'Casual Dining' | 'Birthday Celebration' | 'Anniversary' | 'Business Dinner' | 'Romantic Date';
  specialRequests: string;
  tastingMenuSelected?: boolean;
}

export interface ReservationConfirmation extends ReservationFormData {
  bookingId: string;
  createdAt: string;
  tableNumber: string;
}
