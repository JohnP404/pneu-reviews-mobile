import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Auth } from "@/store/Auth";

import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/button";
import { router, useLocalSearchParams } from "expo-router";
import FormInput from "@/components/FormInput";
import { updateReview, writeReview } from "@/db/write";
import { getReview } from "@/db/read";

type InputTypes = {
	title: string;
	tags: string | string[];
	review: string;
};

const init = {
	title: "",
	tags: "",
	review: "",
};

type InputName = "title" | "tags" | "review";

export default function UploadPage() {
	const [inputs, setInputs] = useState<InputTypes>(init);
	const [image, setImage] = useState("");
	const { user } = Auth();
	const { reviewId } = useLocalSearchParams<{ reviewId: string }>();

	useEffect(() => {
		async function fetchReview() {
			const data: Review = await getReview(reviewId!);
			const reviewData = {
				title: data.title,
				tags: data.tags.join(","),
				review: data.review,
			};
			setImage(data.image);
			setInputs(reviewData);
		}
		if (reviewId) {
			fetchReview();
		} else {
			setInputs(init);
			setImage("");
		}
	}, [reviewId]);

	if (!user) return null;

	function inputChangeHandler(name: InputName, value: string) {
		setInputs((state) => {
			state[name] = value;

			const newState = { ...state };
			return newState;
		});
	}

	function submitReview() {
		const tags = inputs.tags as string;
		inputs.tags = tags.split(",");

		const data = { ...inputs, image };
		if (reviewId) {
			updateReview(reviewId!, data as Review);
		} else {
			writeReview(data as Review);
		}
		router.replace("/reviews");
	}

	return (
		<ScrollView className="bg-black">
			<SafeAreaView className="items-center justify-center">
				<View className="border border-gray-400 w-[150px] h-[200px] mb-10">
					<Image source={{ uri: image }} width={150} height={200} />
				</View>
				<View className="w-[350px]">
					<FormInput
						value={image}
						onChangeText={(text) => setImage(text)}
						label="URL da Imagem"
						placeholder="https://imagem.png"
					/>
					<FormInput
						value={inputs.title}
						label="Título"
						onChangeText={(text) =>
							inputChangeHandler("title", text)
						}
					/>
					<FormInput
						value={inputs.tags as string}
						label="Tags"
						placeholder="Ex: ação,aventura"
						onBlur={() =>
							inputChangeHandler("tags", inputs.tags as string)
						}
						onChangeText={(text) =>
							inputChangeHandler("tags", text)
						}
					/>
					<FormInput
						multiline
						value={inputs.review}
						label="Review"
						placeholder="Escreva sua review"
						styles="h-[100px]"
						verticalAlign="top"
						onChangeText={(text) =>
							inputChangeHandler("review", text)
						}
					/>
					<Button onPress={submitReview} styles="px-6 py-2">
						<Text className="text-white font-[Poppins-SemiBold] text-base">
							Upload
						</Text>
					</Button>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}
