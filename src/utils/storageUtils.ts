import { PersistStorage } from 'zustand/middleware';

// 비동기 localStorage 구현을 모듈화
export const localStoragePersist: PersistStorage<any> = {
    getItem: name => Promise.resolve(localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)!) : null),
    setItem: (name, value) => Promise.resolve(localStorage.setItem(name, JSON.stringify(value))),
    removeItem: name => Promise.resolve(localStorage.removeItem(name)),
};
