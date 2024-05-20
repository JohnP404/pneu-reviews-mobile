import { View, Text, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Auth } from "@/store/Auth";

type Props = {
	data: ReviewComment;
	toggleDeletePopup: () => void;
	setCurrentComment: (ids: Ids) => void;
};

export default function Comment({
	data,
	toggleDeletePopup,
	setCurrentComment,
}: Props) {
	const { user } = Auth();

	function deleteHandler() {
		setCurrentComment({ reviewId: data.reviewId, commentId: data.id });
		toggleDeletePopup();
	}

	return (
		<View className="bg-slate-800 p-3 rounded-md mb-2">
			<View className="flex-row items-center mb-2">
				<Image
					className="rounded-full mr-2"
					source={{
						uri: data.user.photoURL,
					}}
					width={40}
					height={40}
				/>
				<Text className="text-gray-200 text-base font-[Poppins]">
					{data.user.displayName}
				</Text>
				{data.user.email === user?.email && (
					<View className="flex-row items-center gap-3 ml-auto self-start">
						<Pressable
							onPress={deleteHandler}
							className="flex-row items-center"
						>
							<Entypo name="trash" color={"red"} />
							<Text className="text-red-600 ml-1">Deletar</Text>
						</Pressable>
						<Pressable className="flex-row items-center">
							<Entypo name="pencil" color={"rgb(0,150,255)"} />
							<Text className="text-blue-400 ml-1">Editar</Text>
						</Pressable>
					</View>
				)}
			</View>
			<Text className="text-gray-200 text-sm font-[Poppins]">
				{data.comment}
			</Text>
		</View>
	);
}
