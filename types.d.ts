type Review = {
	comments?: ReviewComment[];
	image: string;
	review: string;
	tags: string[];
	title: string;
	uid?: string;
};

type ReviewComment = {
	comment: string;
	user: {
		displayName: string;
		email: string;
		photoURL: string;
	};
	id: string;
	reviewId: string;
};

type Ids = {
	reviewId: string;
	commentId: string;
};
