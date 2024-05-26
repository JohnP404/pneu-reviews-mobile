import { Tabs, router } from "expo-router";
import { Image, Pressable } from "react-native";
import { Auth } from "@/store/Auth";
import { AppContextProvider } from "@/store/AppStore";
import { Entypo } from "@expo/vector-icons";

export default function TabLayout() {
	const { user, isAdmin } = Auth();
	return (
		<AppContextProvider>
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
					headerRight: () => (
						<Pressable onPress={() => router.push("/profile")}>
							<Image
								source={{ uri: user?.photoURL! }}
								width={40}
								height={40}
								className="rounded-full mr-5"
							/>
						</Pressable>
					),
				}}
			>
				<Tabs.Screen
					name="reviews"
					options={{
						tabBarIcon: ({ color }) => (
							<Entypo
								name="open-book"
								style={{ color }}
								size={20}
							/>
						),
						title: "Reviews",
					}}
				/>
				<Tabs.Screen
					name="upload"
					options={{
						tabBarIcon: ({ color }) => (
							<Entypo name="upload" style={{ color }} size={20} />
						),
						title: "Postar review",
						href: isAdmin ? "/upload" : null,
					}}
				/>
				<Tabs.Screen name="review" options={{ href: null }} />
				<Tabs.Screen name="profile" options={{ href: null }} />
			</Tabs>
		</AppContextProvider>
	);
}
