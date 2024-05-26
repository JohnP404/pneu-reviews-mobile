import { View, Text } from "react-native";
import React from "react";

export default function Error() {
	return (
		<View className="bg-black flex-1 items-center justify-center">
			<Text className="text-red-600 text-2xl text-center">
				Algo deu errado, reinicie o app ou tente logar novamente😵
			</Text>
		</View>
	);
}
