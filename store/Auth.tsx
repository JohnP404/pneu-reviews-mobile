import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { User } from "firebase/auth";
type Props = {
	children: ReactNode;
};
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { writeUser } from "@/db/write";
import { getUser } from "@/db/read";

type Context = {
	user: User | null;
	isAdmin: boolean;
	signIn: () => Promise<FirebaseAuthTypes.UserCredential>;
	signOut: () => Promise<void>;
};

GoogleSignin.configure({
	webClientId:
		"578192099583-t3fou6666f9338k1qs62psfkbodi6aie.apps.googleusercontent.com",
});
const authContext = createContext<Context | null>(null);

export function AuthProvider({ children }: Props) {
	const [user, setUser] = useState<User | any>(null);
	const [initializing, setInitializing] = useState(true);
	const [isAdmin, setAdmin] = useState(false);

	async function onAuthStateChanged(user: any) {
		if (user) {
			setUser(user);
			const firebaseUser = await getUser(user.uid);
			setAdmin(!!firebaseUser?.isAdmin);
			writeUser(user);
		}
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	async function signIn() {
		await GoogleSignin.hasPlayServices({
			showPlayServicesUpdateDialog: true,
		});
		const { idToken } = await GoogleSignin.signIn();
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		return auth().signInWithCredential(googleCredential);
	}

	async function signOut() {
		await auth().signOut();
	}

	return (
		<authContext.Provider value={{ user, isAdmin, signIn, signOut }}>
			{children}
		</authContext.Provider>
	);
}

export const Auth = () => useContext(authContext) as Context;
