import { ReactNode } from "react";
import { Pressable } from "react-native";

type Props = {
	children: ReactNode;
	styles?: string;
	onPress?: () => void;
};

export function Button({ children, styles, onPress }: Props) {
	return (
		<Pressable
			onPress={onPress}
			className={`bg-red-600 px-2 py-1 self-start rounded-md ${
				styles || ""
			}`}
		>
			{children}
		</Pressable>
	);
}
