import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
	return (
		<GestureHandlerRootView>
			<Drawer
				screenOptions={{
					headerShown: false,
					swipeEdgeWidth: 50,
					drawerLabelStyle: { color: "white", fontSize: 20 },
					drawerStyle: { backgroundColor: "#0f172a" },
				}}
			>
				<Drawer.Screen
					name="index"
					options={{
						drawerLabel: "Perfil",
					}}
				/>
				<Drawer.Screen
					name="(tabs)"
					options={{
						drawerItemStyle: { height: 0 },
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
