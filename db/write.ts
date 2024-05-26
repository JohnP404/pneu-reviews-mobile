import { User } from "firebase/auth";
import { getUser } from "./read";
import { db } from "./read";

const placeholderPhotoURL =
	"https://cdn.discordapp.com/attachments/1238527767323086942/1238527781802086531/depositphotos_137014128-stock-illustration-user-profile-icon.png?ex=663f9c61&is=663e4ae1&hm=c364bef3db7c10e01764668548d8e5d9218e4ad64f48eeb30144b7112358e273&";

export function writeUser(data: User) {
	const userExists = getUser(data.uid);
	if (userExists) return;
	const userData = {
		displayName: data.displayName,
		email: data.email,
		photoURL: data.photoURL,
		uid: data.uid,
	};
	try {
		const updates = {};
		//@ts-ignore
		updates["/users/" + userData.uid] = userData;
		return db.ref().update(updates);
	} catch (error: any) {
		console.log(error);
	}
}

export function writeReview(data: Review) {
	try {
		const updates = {};
		const reviewKey = db.ref().child("reviews").push().key;
		//@ts-ignore
		updates[`/reviews/${reviewKey}`] = data;
		return db.ref().update(updates);
	} catch (error) {
		console.log(error);
	}
}

export function deleteReview(reviewId: string) {
	try {
		const updates = {};
		//@ts-ignore
		updates[`/reviews/${reviewId}`] = null;
		return db.ref().update(updates);
	} catch (error) {
		console.log(error);
	}
}

export function updateReview(reviewId: string, data: Review) {
	try {
		const updates = {};
		//@ts-ignore
		updates[`/reviews/${reviewId}`] = data;
		return db.ref().update(updates);
	} catch (error) {
		console.log(error);
	}
}

export function writeComment(reviewId: string, user: User, comment: string) {
	const commentData = {
		comment,
		user: {
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
		},
	};
	try {
		const updates = {};
		const commentKey = db.ref().child("reviews").push().key;
		//@ts-ignore
		updates[`/reviews/${reviewId}/comments/${commentKey}`] = commentData;
		return db.ref().update(updates);
	} catch (error) {
		console.log(error);
	}
}

export function updateComment(
	reviewId: string,
	commentId: string,
	comment: string
) {
	try {
		const updates = {};
		//@ts-ignore
		updates[`/reviews/${reviewId}/comments/${commentId}/comment`] = comment;
		return db.ref().update(updates);
	} catch (error) {
		console.log(error);
	}
}

export function deleteComment(reviewId: string, commentId: string) {
	try {
		const updates = {};
		//@ts-ignore
		updates[`/reviews/${reviewId}/comments/${commentId}`] = null;
		return db.ref().update(updates);
	} catch (error) {
		console.log(error);
	}
}
