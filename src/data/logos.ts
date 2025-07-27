import type { IRawLogo } from '@/types';

import {
    commercialBank,
    digitalBank,
    fintech,
    insurtech,
    investment,
    other,
    paymentGateway,
    regulatoryBody
} from './category';

export const logos: IRawLogo[] = [
    ...commercialBank,
    ...digitalBank,
    ...fintech,
    ...investment,
    ...paymentGateway,
    ...regulatoryBody,
    ...insurtech,
    ...other
];
