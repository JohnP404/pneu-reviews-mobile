import { Button } from "@/components/button";
import { Auth } from "@/store/Auth";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { SplashScreen, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function Page() {
	const { user, signIn } = Auth();
	const [fontsLoaded, fontError] = useFonts({
		Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
		"Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
		"Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	async function authHandler() {
		if (!user) await signIn();
		router.replace("(tabs)/reviews");
	}

	return (
		<SafeAreaView onLayout={onLayoutRootView}>
			<ImageBackground
				className="min-h-screen"
				source={require("../assets/images/hero-bg.jpg")}
			>
				<StatusBar style="dark" />
				<LinearGradient
					className="flex-1"
					colors={["rgba(0,0,0,0.85)", "rgba(150,0,0,0.85)"]}
					start={{ x: 0, y: 0.5 }}
				>
					<View className="px-8 flex-1 justify-center">
						<Text className="text-4xl text-white font-[Poppins-Bold] mb-2">
							As <Text className="text-red-600">melhores</Text>{" "}
							reviews de jogos e filmes em um só lugar.
						</Text>
						<Text className="text-xs text-gray-200 font-[Poppins] text-justify mb-4">
							Ficou na dúvida se um jogo ou filme realmente vale a
							pena e é pra você? Relaxe meu nobre, você acaba de
							vir ao lugar perfeito. Aqui você encontra reviews
							precisas dos mais diversos filmes e jogos escritas
							por um dos mais renomados críticos de games e cinema
							do Brasil e da atualidade.
						</Text>
						<Button onPress={authHandler}>
							<Text className="text-white font-[Poppins-Medium]">
								{user ? "Ver Reviews" : "Inscreva-se"}
							</Text>
						</Button>
					</View>
				</LinearGradient>
			</ImageBackground>
		</SafeAreaView>
	);
}
