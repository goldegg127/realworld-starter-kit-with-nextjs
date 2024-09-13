import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { User } from '@/type';

type AuthState = {
    userInfo: User | null;
    token: string | null;
    isLoggedIn: boolean;
    login: (user: User) => void;
    logout: () => void;
};

const useAuthStore = create<AuthState>()(
    persist<AuthState>(
        set => ({
            token: null,
            userInfo: null,
            isLoggedIn: false,
            login: (userInfo: User) => {
                const { token } = userInfo;

                Cookies.set('real-world-token', token, {
                    secure: true,
                    sameSite: 'Strict',
                    expires: 7,
                });

                set({ token, userInfo, isLoggedIn: true });
            },
            logout: () => {
                Cookies.remove('real-world-token', {
                    secure: true,
                    sameSite: 'Strict',
                });
                set({ token: null, isLoggedIn: false });
            },
        }),
        {
            name: 'auth-storage', // 로컬 스토리지에 저장할 이름
            getStorage: () => localStorage,
        },
    ),
);

export default useAuthStore;
