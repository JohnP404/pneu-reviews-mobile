import { View, Text } from "react-native";
import { Button } from "./button";
import { deleteComment } from "@/db/write";

type Props = {
	toggleDeletePopup: () => void;
	id: Ids;
	confirmationText: string;
};

export default function ConfirmationPopup({
	toggleDeletePopup,
	confirmationText,
	id,
}: Props) {
	function deleteHandler() {
		const { reviewId, commentId } = id;
		deleteComment(reviewId, commentId);
		toggleDeletePopup();
	}
	return (
		<>
			<View className="z-20 absolute top-0 bottom-0 right-0 left-0 bg-black/70" />
			<View className="p-6 rounded-md bg-red-900/90 blur-md absolute z-40 top-[40%] self-center">
				<Text className="text-white text-center text-2xl font-[Poppins] mb-2">
					Tem certeza?
				</Text>
				<Text className="text-white font-[Poppins] w-[250px] text-left">
					{confirmationText}
				</Text>
				<View className="flex-row justify-center items-center mt-4">
					<Button onPress={deleteHandler}>
						<Text className="text-white">Deletar</Text>
					</Button>
					<Button
						onPress={toggleDeletePopup}
						styles="bg-blue-500 ml-4"
					>
						<Text className="text-white">Cancelar</Text>
					</Button>
				</View>
			</View>
		</>
	);
}
