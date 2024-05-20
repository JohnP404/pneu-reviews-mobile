import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleProp, TextStyle } from "react-native";

type Props = {
	path?: string;
	goBackTo: string;
	styles?: StyleProp<TextStyle>;
};

export function BackBtn({ path, goBackTo, styles }: Props) {
	function navHandler() {
		return router.replace(`${goBackTo}`);
	}

	return (
		<Ionicons
			name="arrow-back"
			size={30}
			color={"white"}
			style={styles}
			onPress={navHandler}
		/>
	);
}
