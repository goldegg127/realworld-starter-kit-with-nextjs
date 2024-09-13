import { create } from 'zustand';
import Cookies from 'js-cookie';

type AuthState = {
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
};

const useAuthStore = create<AuthState>(set => ({
    token: null,
    isLoggedIn: false,
    login: token => {
        Cookies.set('real-world-token', token, {
            secure: true,
            sameSite: 'Strict',
            expires: 7,
        });
        set({ token, isLoggedIn: true });
    },
    logout: () => {
        Cookies.remove('real-world-token', {
            secure: true,
            sameSite: 'Strict',
        });
        set({ token: null, isLoggedIn: false });
    },
}));

export default useAuthStore;
