import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { User } from '@/type';

type AuthState = {
    userInfo: User | null;
    token: string | null;
    isLoggedIn: boolean;
    login: (user: User) => void;
    logout: () => void;
};

// 비동기 localStorage 구현
const localStoragePersist: PersistStorage<AuthState> = {
    getItem: name => Promise.resolve(localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)!) : null),
    setItem: (name, value) => Promise.resolve(localStorage.setItem(name, JSON.stringify(value))),
    removeItem: name => Promise.resolve(localStorage.removeItem(name)),
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
            name: 'auth-storage',
            storage: localStoragePersist,
        },
    ),
);

export { useAuthStore };
