type ShoppingItemModel = {
	id: string;
	name: string;
	isChecked: boolean;
	createdDate: Date;
	description: string;
	image: string;
	store: number;
	category: number;
	requestingUserId: string;
	otherRequesters: string[];
	quantity: number;
	unit: number;
	price: number;
	familyCode: string;
};
