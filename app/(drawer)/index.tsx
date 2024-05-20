import { View, Text, Image } from "react-native";
import React from "react";
import { Auth } from "@/store/Auth";

import { SafeAreaView } from "react-native-safe-area-context";

export default function StartPage() {
	const { user } = Auth();
	if (!user) return null;
	return (
		<SafeAreaView className="justify-center items-center flex-1">
			<Image
				source={{ uri: user.photoURL! }}
				width={80}
				height={80}
				className="rounded-full"
			/>
			<Text className="text-black font-[Poppins-SemiBold] text-2xl mt-2">
				{user.displayName}
			</Text>
		</SafeAreaView>
	);
}
