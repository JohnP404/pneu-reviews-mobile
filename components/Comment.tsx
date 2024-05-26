import { View, Text, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Auth } from "@/store/Auth";
import { AppContext } from "@/store/AppStore";

type Props = {
	data: ReviewComment;
};

export default function Comment({ data }: Props) {
	const { user } = Auth();
	const { editingCommentId, setEditing, showPopup, setInput, setComment } =
		AppContext();

	function setCurrentComment() {
		setComment({ id: data.id, value: data.comment });
		showPopup(true);
	}

	function editHandler() {
		if (editingCommentId) {
			setEditing("");
		} else {
			setEditing(data.id);
		}
		setComment({ id: data.id, value: data.comment });
		setInput(editingCommentId === data.id ? "" : data.comment);
	}

	return (
		<View
			className={`${
				editingCommentId === data.id ? "bg-slate-600" : "bg-slate-800"
			} p-3 rounded-md mb-2`}
		>
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
							onPress={setCurrentComment}
							className="flex-row items-center"
						>
							<Entypo name="trash" color={"red"} />
							<Text className="text-red-600 ml-1">Deletar</Text>
						</Pressable>
						<Pressable
							onPress={editHandler}
							className="flex-row items-center"
						>
							<Entypo name="pencil" color={"rgb(0,150,255)"} />
							<Text className="text-blue-400 ml-1">
								{editingCommentId === data.id
									? "Cancelar"
									: "Editar"}
							</Text>
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
