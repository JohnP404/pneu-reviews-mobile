import { Auth } from "@/store/Auth";
import { Image, Text, View } from "react-native";
import { Button } from "./button";

export default function DrawerIcon() {
	const { user } = Auth();

	return (
		<View>
			<View className="flex-row items-center">
				<Image
					source={{ uri: user?.photoURL! }}
					className="rounded-full -mr-4"
					width={50}
					height={50}
				/>
				<Text className="text-xl text-white font-[Poppins-SemiBold]">
					{user?.displayName!}
				</Text>
			</View>
			<Button styles="mt-5 px-5 py-2">
				<Text className="text-white text-base font-[Poppins]">
					Logout
				</Text>
			</Button>
		</View>
	);
}
