
export const MOCK_USER = {
	id: "1",
	email: "traveler@vizit.africa",
	fullName: "Alex Rivera",
	phone: "+250 788 123 456",
	role: "user",
	preferredCurrency: "USD",
	createdAt: "2023-01-15T10:00:00Z",
	avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=traveler@vizit.africa"
};

export const MOCK_ADDONS = [
	{
		id: 1,
		name: "Airport Transfer",
		description: "Private transfer from Kigali International Airport",
		price: 50,
		price_type: "per_stay" as const,
	},
	{
		id: 2,
		name: "Breakfast",
		description: "Daily buffet breakfast",
		price: 25,
		price_type: "per_night" as const,
	},
	{
		id: 3,
		name: "Gorilla Trekking Permit",
		description: "Official permit for Volcanoes National Park",
		price: 1500,
		price_type: "per_person" as const,
	}
];

export const MOCK_LISTINGS = [
	{
		id: 1,
		title: "The Retreat by Heaven",
		description: "Luxury boutique hotel in the heart of Kigali. The Retreat is Kigali's first eco-friendly resort and features solar electricity, organic toiletries, and locally crafted furniture. Enjoy our fusion cuisine, wellness spa, and salt-water pool.",
		listingType: "hotel_room",
		basePrice: 280,
		currency: "USD",
		capacity: 2,
		locationId: "Kigali",
		imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
		rating: 4.98,
		reviewCount: 128,
		amenities: ["Wifi", "Pool", "Spa", "Gym", "Restaurant", "AC"],
		addons: MOCK_ADDONS,
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80"
        ]
	},
	{
		id: 2,
		title: "Bisate Lodge",
		description: "Located in the natural amphitheater of an eroded volcanic cone, Bisate Lodge offers panoramic views of the Volcanoes National Park peaks. Experience world-class hospitality while being close to the mountain gorillas.",
		listingType: "hotel_room",
		basePrice: 1500,
		currency: "USD",
		capacity: 2,
		locationId: "Musanze",
		imageUrl: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=80",
		rating: 5.0,
		reviewCount: 85,
		amenities: ["Wifi", "All-inclusive", "Trekking", "Fireplace"],
		addons: MOCK_ADDONS,
         images: [
            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=80"
        ]
	},
	{
		id: 3,
		title: "Lake Kivu Serena Hotel",
		description: "Serenely situated on the white sandy shores of Lake Kivu, the sixth largest lake in Africa, and surrounded by extensive tropical gardens, the Lake Kivu Serena Hotel offers the perfect getaway.",
		listingType: "hotel_room",
		basePrice: 180,
		currency: "USD",
		capacity: 3,
		locationId: "Rubavu",
		imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1920&q=80",
		rating: 4.7,
		reviewCount: 340,
		amenities: ["Beach Access", "Pool", "Boating", "Restaurant"],
		addons: MOCK_ADDONS,
         images: [
             "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1920&q=80"
         ]
	},
    {
		id: 4,
		title: "Akagera Game Lodge",
		description: "Perched on a ridge overlooking Lake Ihema, Akagera Game Lodge is the perfect base for exploring Akagera National Park. Spot the Big Five and enjoy the comfort of our modern rooms.",
		listingType: "hotel_room", // simplified
		basePrice: 220,
		currency: "USD",
		capacity: 2,
		locationId: "Akagera",
		imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80",
		rating: 4.8,
		reviewCount: 210,
		amenities: ["Pool", "Safari", "Restaurant", "Bar"],
		addons: MOCK_ADDONS,
         images: [
             "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80"
         ]
	},
     {
		id: 5,
		title: "Nyungwe House",
		description: "Set among the rich tea plantations of Gisakura, on the edge of Nyungwe National Park. One&Only Nyungwe House offers an exclusive window into Rwanda’s fascinating wildlife and culture.",
		listingType: "hotel_room",
		basePrice: 1200,
		currency: "USD",
		capacity: 2,
		locationId: "Nyungwe",
		imageUrl: "https://images.unsplash.com/photo-1504567961542-e24d9439a724?auto=format&fit=crop&w=1920&q=80",
		rating: 4.9,
		reviewCount: 95,
		amenities: ["Spa", "Tea Ceremony", "Nature Walks", "Gym"],
		addons: MOCK_ADDONS,
         images: [
             "https://images.unsplash.com/photo-1504567961542-e24d9439a724?auto=format&fit=crop&w=1920&q=80"
         ]
	}
];

export const MOCK_REVIEWS = [
	{
		id: 1,
		userId: "2",
		listingId: 1,
		rating: 5,
		comment: "Absolutely stunning place! The service was impeccable.",
		createdAt: "2023-05-10T12:00:00Z",
		user: { fullName: "Sarah Jenkins", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
	},
	{
		id: 2,
		userId: "3",
		listingId: 1,
		rating: 4,
		comment: "Great location, but the wifi was a bit slow in the room.",
		createdAt: "2023-06-15T09:30:00Z",
		user: { fullName: "David M.", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" }
	}
];

export const MOCK_BOOKINGS = []; 
