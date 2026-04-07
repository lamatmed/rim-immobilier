export type PropertyType = "house" | "apartment" | "land" | "building";

export interface Property {
  id: string;
  type: PropertyType;
  price: number;
  location: string;
  locationAr: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number; // in square meters
  image: string;
  featured?: boolean;
}

export const mockProperties: Property[] = [
  // Maisons
  {
    id: "house-1",
    type: "house",
    price: 15000000,
    location: "Tevragh Zeina, Nouakchott",
    locationAr: "تفرغ زينة، نواكشوط",
    bedrooms: 5,
    bathrooms: 4,
    area: 400,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    featured: true,
  },
  {
    id: "house-2",
    type: "house",
    price: 8500000,
    location: "Dar Naim, Nouakchott",
    locationAr: "دار النعيم، نواكشوط",
    bedrooms: 3,
    bathrooms: 2,
    area: 250,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: "house-3",
    type: "house",
    price: 12000000,
    location: "Sebkha, Nouakchott",
    locationAr: "السبخة، نواكشوط",
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800",
    featured: true,
  },

  // Appartements
  {
    id: "apt-1",
    type: "apartment",
    price: 3500000,
    location: "Arafat, Nouakchott",
    locationAr: "عرفات، نواكشوط",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    featured: true,
  },
  {
    id: "apt-2",
    type: "apartment",
    price: 2800000,
    location: "Ksar, Nouakchott",
    locationAr: "لكصر، نواكشوط",
    bedrooms: 2,
    bathrooms: 1,
    area: 110,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },

  // Terrains
  {
    id: "land-1",
    type: "land",
    price: 4500000,
    location: "Toujounine, Nouakchott",
    locationAr: "توجنين، نواكشوط",
    area: 600,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    featured: true,
  },
  {
    id: "land-2",
    type: "land",
    price: 3000000,
    location: "Riyadh, Nouakchott",
    locationAr: "الرياض، نواكشوط",
    area: 500,
    image: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },

  // Immeubles
  {
    id: "bld-1",
    type: "building",
    price: 55000000,
    location: "Centre Ville, Nouakchott",
    locationAr: "وسط المدينة، نواكشوط",
    bedrooms: 20,
    bathrooms: 15,
    area: 1200,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    featured: true,
  },
  {
    id: "bld-2",
    type: "building",
    price: 38000000,
    location: "Tevragh Zeina, Nouakchott",
    locationAr: "تفرغ زينة، نواكشوط",
    bedrooms: 10,
    bathrooms: 8,
    area: 800,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
    featured: false,
  }
];
