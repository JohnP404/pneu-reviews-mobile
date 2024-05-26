import { View, Text } from "react-native";
import { Button } from "./button";
import { EvilIcons } from "@expo/vector-icons";
import { AppContext } from "@/store/AppStore";
import { router } from "expo-router";
export default function ReviewOptions() {
	const { showPopup, reviewId } = AppContext();

	function editHandler() {
		router.navigate({ pathname: "/upload", params: { reviewId } });
	}

	return (
		<View className="self-end z-20 items-center absolute top-0 bg-slate-900/80 rounded-bl-md">
			<Button
				onPress={() => showPopup(true)}
				styles="bg-transparent flex-row"
			>
				<EvilIcons name="trash" color={"red"} size={20} />
				<Text className="font-[Poppins] text-red-600">Deletar</Text>
			</Button>
			<Button onPress={editHandler} styles="bg-transparent flex-row item">
				<EvilIcons name="pencil" color={"rgb(0,194,255)"} size={20} />
				<Text className="font-[Poppins] text-cyan-500">Editar</Text>
			</Button>
		</View>
	);
}
