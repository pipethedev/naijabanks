import type { ILogo } from '@/types';

import { create } from 'zustand';

interface ModalState {
    logo: ILogo | null;
    openModal: (logo: ILogo) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    logo: null,
    openModal: (logo) => set({ logo }),
    closeModal: () => set({ logo: null })
}));
