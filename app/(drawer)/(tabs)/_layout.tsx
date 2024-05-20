import { BackBtn } from "@/components/backBtn";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, router, usePathname } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function TabLayout() {
	const path = usePathname();
	return (
		<Tabs
			screenOptions={{
				headerTitle: "Pneu Reviews",
				headerTintColor: "white",
				headerTitleStyle: { fontFamily: "Poppins-SemiBold" },
				headerStyle: {
					backgroundColor: "#0f172a",
					borderBottomColor: "#991b1b",
					borderBottomWidth: 1,
				},
				tabBarActiveTintColor: "#991b1b",
				tabBarInactiveTintColor: "white",
				tabBarStyle: {
					backgroundColor: "#0f172a",
					borderTopColor: "#991b1b",
					borderTopWidth: 1,
				},
				headerLeft: () => <DrawerToggleButton tintColor="white" />,
			}}
		>
			<Tabs.Screen name="reviews" options={{ title: "Reviews" }} />
			<Tabs.Screen name="review" options={{ href: null }} />
		</Tabs>
	);
}
