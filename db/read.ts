import { firebase } from "@react-native-firebase/database";
import { User } from "firebase/auth";

export const db = firebase
	.app()
	.database("https://pneuzin-reviews-default-rtdb.firebaseio.com");

export function getReviews() {
	let val: Review[] = [];
	try {
		db.ref("/reviews").on("value", (data) => {
			if (data.exists()) {
				const reviewData = data.val();
				const keys = Object.keys(reviewData);
				val = keys.map((key) => reviewData[key]);
			}
		});
		return val;
	} catch (err) {
		console.log(err);
	}
}

export async function getReview(id: string) {
	try {
		const snapshot = await db.ref(`/reviews/${id}`).once("value");

		return snapshot.val();
	} catch (err) {
		console.log(err);
	}
}

export function getComments(id: string) {
	let val: ReviewComment[] = [];
	db.ref(`/reviews/${id}/comments`).on("value", (data) => {
		if (data.exists()) {
			const commentsData = data.val();
			const keys = Object.keys(commentsData);
			val = keys.map((key) => commentsData[key]);
		}
	});
	return val;
}

export async function getUser(id: string) {
	let user: any;
	await db.ref(`/users/${id}`).once("value", (userData) => {
		if (userData.exists()) {
			user = userData.val();
		}
	});
	return user;
}
