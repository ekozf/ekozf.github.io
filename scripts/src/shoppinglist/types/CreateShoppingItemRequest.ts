type CreateShoppingItemRequest = {
	name: string;
	description: string;
	quantity: number;
	unit: number;
	store: number;
	category: number;
	image: string;
	price: number;
	familyCode: string;
	requestingUserId: string;
};
