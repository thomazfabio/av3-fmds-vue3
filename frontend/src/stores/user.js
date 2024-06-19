import { defineStore } from 'pinia'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import router from '@/router'
import { ref } from 'vue';

const provider = new GoogleAuthProvider();

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        userAlert: { status: false, message: '' },
    }),

    getters: {
        getIsLogged: (state) => {
            return !!state.user;
        },

        getUserProfile: (state) => {
            if (!state.user) {
                return null; // ou um objeto vazio ou padrão
            }
            return {
                name: state.user.displayName,
                email: state.user.email,
                photo: state.user.photoURL,
                id: state.user.uid,
                accessToken: state.user.accessToken
            };
        },
        getUserAlert: (state) => {
            return state.userAlert;
        },
    },
    actions: {
        loginGoogle() {
            const auth = getAuth();
            signInWithPopup(auth, provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                this.user = user;
                router.push('/dashboard');
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode);
                console.log(errorMessage);
                console.log(email);
                console.log(credential);
            });
        },

        checkAuth() {
            return new Promise((resolve, reject) => {
                const auth = getAuth();
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        console.log('User is signed in');
                        this.user = await user;
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                });
            })
        },

        async register(user) {
            // Register the user
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
                // Signed in
                const user = userCredential.user;

            }).then(() => {
                updateProfile(auth.currentUser, {
                    displayName: user.name,
                }).then(async () => {
                    // Profile updated!
                    this.user = await  auth.currentUser;
                    router.push('/dashboard');
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        },
        async login(user) {
            // Login the user
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                this.user = user;
            }).then(() => {
                router.push('/dashboard');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                this.userAlert = { status: true, message: errorMessage }
                console.log(errorCode);
                console.log(errorMessage);
            });
        },
        async logoutFirebase() {
            // Logout the user
            const auth = getAuth();
            await auth.signOut();
            this.user = null;
            router.push('/login');
        },
        async clearAlert() {
            this.userAlert = { status: false, message: '' };
        }
    },
})