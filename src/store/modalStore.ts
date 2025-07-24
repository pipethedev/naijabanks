import type { Logo } from '@/types';

import { create } from 'zustand';

interface ModalState {
    logo: Logo | null;
    openModal: (logo: Logo) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    logo: null,
    openModal: (logo) => set({ logo }),
    closeModal: () => set({ logo: null })
}));
