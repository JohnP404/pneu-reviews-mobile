import React from "react";
import { Stack } from "expo-router";

export default function ReviewStackLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="[id]/index"
				getId={({ params }) => params!.id}
			/>
			<Stack.Screen
				name="[id]/comments"
				getId={({ params }) => params!.id}
			/>
		</Stack>
	);
}
