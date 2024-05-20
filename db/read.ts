import { firebase } from "@react-native-firebase/database";

export const db = firebase
	.app()
	.database("https://pneuzin-reviews-default-rtdb.firebaseio.com");

export async function getReviews() {
	try {
		const snapshot = await db.ref("/reviews").once("value");
		if (!snapshot.exists()) console.log("No data");
		return snapshot.val();
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

export function getUser(id: string) {
	let user;
	db.ref(`/users/${id}`).once("value", (userData) => {
		if (userData.exists()) {
			user = userData;
		}
	});
	return user;
}
