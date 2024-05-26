import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import ReviewOptions from "./ReviewOptions";
import { AppContext } from "@/store/AppStore";

type Props = {
	data: Review;
};

export function ReviewThumb({ data }: Props) {
	const [pressed, setPressed] = useState(false);
	const [longPressed, setLongPressed] = useState(false);
	const { image, title, tags, uid } = data;
	const { setReview } = AppContext();

	function longPressHandler() {
		if (uid) {
			setReview(uid);
			setLongPressed((state) => !state);
		}
	}

	return (
		<View
			className={`p-4 rounded-md border ${
				pressed
					? "bg-slate-800 border-slate-500"
					: "bg-slate-900 border-slate-600"
			}  mb-6`}
		>
			<Pressable
				onLongPress={longPressHandler}
				onPress={() => {
					router.push({
						pathname: "review/[id]",
						params: { id: uid },
					});
				}}
				onPressIn={() => setPressed(true)}
				onPressOut={() => setPressed(false)}
			>
				{longPressed && <ReviewOptions />}
				<Image
					className="rounded-t-md"
					source={{ uri: image }}
					height={200}
				/>
				<View className="p-4">
					<Text className="text-white text-xl font-[Poppins-Bold] text-center">
						{title}
					</Text>
				</View>
			</Pressable>
			<ScrollView className="pb-1" horizontal={true}>
				{tags.map((tag) => (
					<Text
						key={tag + Math.floor(Math.random() * 100000)}
						className="text-white text-sm font-[Poppins] bg-red-600 py-1 px-2 mr-2 rounded-md"
					>
						{tag}
					</Text>
				))}
			</ScrollView>
		</View>
	);
}
