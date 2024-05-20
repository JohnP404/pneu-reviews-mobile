import { View, ActivityIndicator } from "react-native";

export default function Loading() {
	return (
		<View className="flex-1 bg-black">
			<ActivityIndicator size={50} className="m-auto" color={"red"} />
		</View>
	);
}
