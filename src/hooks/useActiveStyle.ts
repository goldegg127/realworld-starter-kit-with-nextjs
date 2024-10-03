'use client';

import { usePathname } from 'next/navigation';

function useActiveStyle() {
    const pathname = usePathname();

    const activeNav = (navName: string, path: string) => {
        if (navName === 'Logout') {
            return '';
        }

        return pathname === path ? ' active' : '';
    };

    return { activeNav };
}

export { useActiveStyle };
