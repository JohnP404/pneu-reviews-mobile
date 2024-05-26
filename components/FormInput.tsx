import { Text, View, TextInput } from "react-native";
type Props = {
	value: string;
	multiline?: boolean;
	styles?: string;
	label: string;
	placeholder?: string;
	verticalAlign?: "auto" | "bottom" | "top" | "center";
	onChangeText?: (text: string) => void;
	onBlur?: (val: any) => void;
};

export default function FormInput({
	styles,
	placeholder,
	label,
	value,
	verticalAlign,
	multiline,
	onChangeText,
	onBlur,
}: Props) {
	return (
		<View className="mb-4">
			<Text className="font-[Poppins] text-base text-white">{label}</Text>
			<TextInput
				multiline={!!multiline}
				value={value}
				onBlur={onBlur}
				onChangeText={onChangeText}
				textAlignVertical={verticalAlign || "auto"}
				placeholder={placeholder || ""}
				placeholderTextColor={"rgb(156 163 175)"}
				className={`${
					styles || ""
				} border-[1px] border-gray-400 rounded-md p-2 text-white font-[Poppins]`}
			/>
		</View>
	);
}
