import { View, Text, FlatList, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Comment from "@/components/Comment";
import { Button } from "@/components/button";
import { db } from "@/db/read";
import { useLocalSearchParams } from "expo-router";
import { updateComment, writeComment } from "@/db/write";
import { Auth } from "@/store/Auth";
import { MOCK_COMMENTS } from ".";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import { CommentsContext } from "@/store/CommentStore";

export default function comments() {
	const [comments, setComments] = useState<ReviewComment[]>(MOCK_COMMENTS);

	const {
		editingCommentId,
		currentComment,
		popupShown,
		inputValue,
		setReview,
		setInput,
		setEditing,
	} = CommentsContext();

	const { user } = Auth();
	const { id } = useLocalSearchParams();

	useEffect(() => {
		setReview(id as string);
		db.ref(`/reviews/${id}/comments`).on("value", (data) => {
			if (data.exists()) {
				const commentsData = data.val();
				const keys = Object.keys(commentsData);
				const parsedComments = keys.map((key) => {
					commentsData[key].id = key;
					commentsData[key].reviewId = id;
					return commentsData[key];
				});
				setComments(parsedComments);
			}
		});
	}, []);

	function uploadComment() {
		if (!(typeof id === "string") || !user) return;

		if (editingCommentId) {
			updateComment(id, currentComment.id, inputValue);
			setEditing("");
		} else {
			writeComment(id, user, inputValue);
		}
		setInput("");
	}

	return (
		<View className="p-4 bg-black flex-1 relative">
			{popupShown && (
				<ConfirmationPopup confirmationText="Seu comentário será deletado para sempre" />
			)}
			<FlatList
				data={comments}
				renderItem={({ item, index }) => (
					<Comment data={item} key={index} />
				)}
			/>
			<View className="flex-row justify-between">
				<View className="flex-1">
					<TextInput
						value={inputValue}
						onChangeText={(txt) => setInput(txt)}
						placeholder="Digite seu comentário..."
						placeholderTextColor={"rgb(156 163 175)"}
						className="border-[1px] border-gray-400 rounded-md p-2 text-white font-[Poppins]"
					/>
				</View>
				<Button onPress={uploadComment} styles="ml-2 self-center py-3">
					<Text className="text-white text-[Poppins]">Comentar</Text>
				</Button>
			</View>
		</View>
	);
}
