import { View, Text, Image } from "react-native";

type Props = {
	data: ReviewComment;
};

export default function DisplayComment({ data }: Props) {
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
			</View>
			<Text className="text-gray-200 text-sm font-[Poppins]">
				{data.comment}
			</Text>
		</View>
	);
}
