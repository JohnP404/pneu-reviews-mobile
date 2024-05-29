import { router, useLocalSearchParams, usePathname } from "expo-router";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import Error from "@/components/error";
import { BackBtn } from "@/components/backBtn";
import DisplayComment from "@/components/DisplayComment";
import { getReview } from "@/db/read";

// const MOCK_DATA = {
// 	image: "https://source.unsplash.com/random",
// 	review: "É possível fazer uma associação entre um pneu e o fascismo japonês através de um contexto histórico específico. Durante a Segunda Guerra Mundial, o Japão estava sob um regime fascista liderado pelo partido político militarista conhecido como o Partido da Associação de Assistência Nacional. Durante esse período, a economia japonesa estava voltada para a produção de bens militares e para o apoio à máquina de guerra imperial.\n\nRelacionar um pneu com o fascismo japonês poderia ser feito através do papel da indústria de pneus durante a guerra. No contexto da mobilização para a guerra, as indústrias japonesas, incluindo as de pneus, foram direcionadas para apoiar os esforços militares do país. Poderíamos, então, associar um pneu ao fascismo japonês como um símbolo da economia de guerra, onde os recursos e a produção industrial estavam a serviço do regime autoritário e expansionista do Japão durante aquele período.\n\nAlém disso, é importante notar que o Japão expandiu agressivamente seu império durante os anos 1930 e início dos anos 1940, invadindo e colonizando várias regiões da Ásia e do Pacífico. Essa expansão imperialista estava intimamente ligada à ideologia do fascismo japonês, que buscava dominar territórios vizinhos e impor seu domínio sobre eles. Enquanto o império japonês avançava, poderia-se argumentar metaforicamente que era como um pneu que esmaga tudo em seu caminho, uma representação da brutalidade e da dominação associadas ao fascismo japonês durante a Segunda Guerra Mundial.",
// 	tags: ["Pneu", "China", "Japonês", "Chinês", "Coreia", "Asiático"],
// 	title: "Test",
// };

// export const MOCK_COMMENTS = [
// 	{
// 		comment:
// 			"Incrível a semelhança que eu tenho com o Pneu de China Adventures, além de sermos literalmente iguais... temos o mesmo mindset, ambos somos extremamente frios e estrategistas em nossa forma de pensar e agir... bizarro '-' ele me representa muito, somos dois deuses nesse mundo.",
// 		user: {
// 			displayName: "Andrey Henrique",
// 			email: "andreybritohenrique321@gmail.com",
// 			photoURL:
// 				"https://lh3.googleusercontent.com/a/ACg8ocIoAxwvtil-BVES2l1gVY3CP_Y69DncY31EMPcom-l7ENs=s96-c",
// 		},
// 		id: "comment1",
// 		reviewId: "-Nr7yy_qTlhWji_39wNg",
// 	},
// 	{
// 		comment: "KKKKKKKKKKKKKKKKKKKKK",
// 		user: {
// 			displayName: "Jonathan",
// 			email: "jonathanpetersen2016@gmail.com",
// 			photoURL:
// 				"https://lh3.googleusercontent.com/a/ACg8ocL5GYhYZBczhO8x5voh-CtHD0_enngi3WpydEzLTK9vHPQ=s96-c",
// 		},
// 		id: "comment2",
// 		reviewId: "-Nr7yy_qTlhWji_39wNg",
// 	},
// 	{
// 		comment: "lkkkkkk",
// 		user: {
// 			displayName: "Fred",
// 			email: "fredbomdepica@gmail.com",
// 			photoURL:
// 				"https://lh3.googleusercontent.com/a/ACg8ocLLwxt8IRefm4FFzo-lyptcrjMg4W9Jzt-MjS5VRpY=s96-c",
// 		},
// 		id: "comment3",
// 		reviewId: "-Nr7yy_qTlhWji_39wNg",
// 	},
// 	{
// 		comment: "Teste mobile ",
// 		user: {
// 			displayName: "Yo Dayo",
// 			email: "yodayo916@gmail.com",
// 			photoURL:
// 				"https://lh3.googleusercontent.com/a/ACg8ocI6Vs4jPKR8fPKLf76iFeQC2AF2J-8dDjmlUZrzFmkOT9-3=s96-c",
// 		},
// 		id: "comment4",
// 		reviewId: "-Nr7yy_qTlhWji_39wNg",
// 	},
// ];

export default function Review() {
	const { id } = useLocalSearchParams();
	const pathname = usePathname();
	const [review, setReview] = useState<Review>();
	const [comments, setComments] = useState<ReviewComment[] | null>(null);
	const [loading, setloading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setloading(true);
		try {
			const fetchReviews = async () => {
				const reviewData: Review = await getReview(id as string);
				setReview(reviewData);
				if (reviewData.comments) {
					const commentsData = reviewData.comments;
					const keys = Object.keys(commentsData);
					const parsedComments = keys.map(
						(key: any) => commentsData[key]
					);
					setComments(parsedComments);
				} else {
					setComments(null);
				}
				setloading(false);
			};
			fetchReviews();
		} catch (error) {
			setError(true);
		}
	}, [pathname]);

	if (loading || !review) return <Loading />;
	if (error) return <Error />;

	return (
		<ScrollView stickyHeaderIndices={[0]} className="bg-black p-4">
			<View className="blur-md bg-red-600/50 rounded-full p-1 self-start">
				<BackBtn goBackTo="/reviews" />
			</View>

			<Image
				className="rounded-md -mt-10"
				source={{ uri: review.image }}
				height={300}
			/>
			<View className="items-center p-2">
				<Text className="text-3xl text-white font-[Poppins-Bold] text-justify mt-2">
					{review.title}
				</Text>
				<Text className="text-gray-200 text-sm text-justify mt-2 p-2 font-[Poppins] mb-1">
					{review.review}
				</Text>
			</View>
			<View className="bg-red-900 w-full h-px mb-4" />
			<Text className="text-lg font-[Poppins-SemiBold] text-white mb-2">
				Comentários
			</Text>
			{!comments && (
				<Pressable
					className="mb-6"
					onPress={() => router.push(`review/${id}/comments`)}
				>
					<Text className="text-white text-base bg-slate-800 p-2 rounded-md">
						Seja o primeiro a comentar!
					</Text>
				</Pressable>
			)}
			{comments && (
				<Pressable
					onPress={() => router.push(`review/${id}/comments`)}
					className="mb-6 p-2 pb-0 rounded-md bg-slate-600 justify-center"
				>
					<DisplayComment data={comments[0]} />
				</Pressable>
			)}
		</ScrollView>
	);
}
