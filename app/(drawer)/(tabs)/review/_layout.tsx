import React from "react";
import { Stack } from "expo-router";
import { CommentsProvider } from "@/store/CommentStore";

export default function ReviewStackLayout() {
	return (
		<CommentsProvider>
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
		</CommentsProvider>
	);
}
