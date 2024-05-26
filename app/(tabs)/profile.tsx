import { Button } from "@/components/button";
import { Auth } from "@/store/Auth";
import { router } from "expo-router";
import { View, Text, Image } from "react-native";
export default function profile() {
	const { user, signOut } = Auth();

	function logoutHandler() {
		signOut();
		router.replace("/");
	}

	return (
		<View className="flex-1 items-center justify-center bg-black">
			<Image
				source={{ uri: user?.photoURL! }}
				width={80}
				height={80}
				className="rounded-full"
			/>
			<Text className="font-[Poppins-SemiBold] text-white text-3xl mt-3">
				{user?.displayName}
			</Text>
			<Text className="font-[Poppins] text-white mt-1">
				Email: {user?.email}
			</Text>
			<View>
				<Button onPress={logoutHandler} styles="w-full px-6 py-2 mt-5">
					<Text className="font-[Poppins] text-white text-base">
						Sair
					</Text>
				</Button>
			</View>
		</View>
	);
}
