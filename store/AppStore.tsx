import { ReactNode, createContext, useContext, useState } from "react";

type CurrentComment = {
	id: string;
	value: string;
};

type AppContext = {
	inputValue: string;
	reviewId: string;
	currentComment: CurrentComment;
	editingCommentId: string;
	popupShown: boolean;
	setComment: (curr: CurrentComment) => void;
	setReview: (ids: string) => void;
	setInput: (val: string) => void;
	showPopup: (bool: boolean) => void;
	setEditing: (commentId: string) => void;
};

const appContext = createContext<AppContext | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
	const [currentComment, setCurrentComment] = useState<
		CurrentComment | any
	>();
	const [popupShown, setShowDeletePopup] = useState(false);
	const [reviewId, setReviewId] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [editingCommentId, setEditingCommentId] = useState("");

	function setComment(curr: CurrentComment) {
		setCurrentComment(curr);
	}

	function setReview(id: string) {
		setReviewId(id);
	}

	function setInput(val: string) {
		setInputValue(val);
	}

	function setEditing(commentId: string) {
		setEditingCommentId(commentId);
	}

	function showPopup(bool: boolean) {
		setShowDeletePopup(bool);
	}

	const value = {
		currentComment,
		reviewId,
		inputValue,
		editingCommentId,
		popupShown,
		showPopup,
		setComment,
		setReview,
		setInput,
		setEditing,
	};

	return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

export const AppContext = () => useContext(appContext) as AppContext;
