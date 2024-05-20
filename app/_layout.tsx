import { AuthProvider } from "@/store/Auth";
import { Slot } from "expo-router";
import { Stack } from "expo-router/stack";

export default function AppLayout() {
	return (
		<AuthProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
			</Stack>
		</AuthProvider>
	);
}
