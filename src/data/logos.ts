import type { ILogo } from '@/types';

type IRawLogo = Omit<ILogo, 'id' | 'order'>;

export const logos: IRawLogo[] = [
    // Commercial Banks (12)
    {
        title: 'Access Bank',
        categories: ['Commercial Bank'],
        route: '/logos/access-bank.svg',
        url: 'https://www.accessbankplc.com/'
    },
    {
        title: 'GTBank',
        categories: ['Commercial Bank'],
        route: '/logos/gtbank.svg',
        url: 'https://www.gtbank.com/'
    },
    {
        title: 'Zenith Bank',
        categories: ['Commercial Bank'],
        route: '/logos/zenith-bank.svg',
        url: 'https://www.zenithbank.com/'
    },
    {
        title: 'UBA',
        categories: ['Commercial Bank'],
        route: '/logos/uba.svg',
        url: 'https://www.ubagroup.com/'
    },
    {
        title: 'First Bank',
        categories: ['Commercial Bank'],
        route: '/logos/first-bank.svg',
        url: 'https://www.firstbanknigeria.com/'
    },
    {
        title: 'Fidelity Bank',
        categories: ['Commercial Bank'],
        route: '/logos/fidelity-bank.svg',
        url: 'https://www.fidelitybank.ng/'
    },
    {
        title: 'Stanbic IBTC Bank',
        categories: ['Commercial Bank'],
        route: '/logos/stanbic-ibtc.svg',
        url: 'https://www.stanbicibtcbank.com/'
    },
    {
        title: 'Ecobank',
        categories: ['Commercial Bank'],
        route: '/logos/ecobank.svg',
        url: 'https://ecobank.com/'
    },
    {
        title: 'Sterling Bank',
        categories: ['Commercial Bank'],
        route: '/logos/sterling-bank.svg',
        url: 'https://sterling.ng/'
    },
    {
        title: 'Wema Bank',
        categories: ['Commercial Bank'],
        route: '/logos/wema-bank.svg',
        url: 'https://www.wemabank.com/'
    },
    {
        title: 'Union Bank',
        categories: ['Commercial Bank'],
        route: '/logos/union-bank.svg',
        url: 'https://www.unionbankng.com/'
    },
    {
        title: 'Polaris Bank',
        categories: ['Commercial Bank'],
        route: '/logos/polaris-bank.svg',
        url: 'https://www.polarisbankltd.com/'
    },

    // Fintech & Digital Banks (12)
    {
        title: 'Paystack',
        categories: ['Fintech', 'Payment Gateway'],
        route: '/logos/paystack.svg',
        url: 'https://paystack.com/'
    },
    {
        title: 'Flutterwave',
        categories: ['Fintech', 'Payment Gateway'],
        route: '/logos/flutterwave.svg',
        url: 'https://flutterwave.com/'
    },
    {
        title: 'Opay',
        categories: ['Fintech', 'Digital Bank'],
        route: '/logos/opay.svg',
        url: 'https://opayweb.com/'
    },
    {
        title: 'Kuda Bank',
        categories: ['Fintech', 'Digital Bank'],
        route: '/logos/kuda-bank.svg',
        url: 'https://kuda.com/'
    },
    {
        title: 'Moniepoint',
        categories: ['Fintech', 'Digital Bank'],
        route: '/logos/moniepoint.svg',
        url: 'https://moniepoint.com/'
    },
    {
        title: 'Palmpay',
        categories: ['Fintech', 'Digital Bank'],
        route: '/logos/palmpay.svg',
        url: 'https://www.palmpay.com/'
    },
    {
        title: 'Carbon',
        categories: ['Fintech'],
        route: '/logos/carbon.svg',
        url: 'https://getcarbon.co/'
    },
    {
        title: 'Fairmoney',
        categories: ['Fintech', 'Digital Bank'],
        route: '/logos/fairmoney.svg',
        url: 'https://fairmoney.io/'
    },
    {
        title: 'VFD Microfinance Bank',
        categories: ['Digital Bank'],
        route: '/logos/vfd-bank.svg',
        url: 'https://vbank.ng/'
    },
    {
        title: 'Paga',
        categories: ['Fintech', 'Payment Gateway'],
        route: '/logos/paga.svg',
        url: 'https://www.paga.com/'
    },
    {
        title: 'TeamApt',
        categories: ['Fintech'],
        route: '/logos/teamapt.svg',
        url: 'https://www.teamapt.com/'
    },
    {
        title: 'Chipper Cash',
        categories: ['Fintech', 'Payment Gateway'],
        route: '/logos/chipper-cash.svg',
        url: 'https://chippercash.com/'
    },

    // Investment & WealthTech (6)
    {
        title: 'PiggyVest',
        categories: ['Fintech', 'Investment'],
        route: '/logos/piggyvest.svg',
        url: 'https://www.piggyvest.com/'
    },
    {
        title: 'Cowrywise',
        categories: ['Fintech', 'Investment'],
        route: '/logos/cowrywise.svg',
        url: 'https://cowrywise.com/'
    },
    {
        title: 'Bamboo',
        categories: ['Fintech', 'Investment'],
        route: '/logos/bamboo.svg',
        url: 'https://investbamboo.com/'
    },
    {
        title: 'Risevest',
        categories: ['Fintech', 'Investment'],
        route: '/logos/risevest.svg',
        url: 'https://risevest.com/'
    },
    {
        title: 'Trove',
        categories: ['Fintech', 'Investment'],
        route: '/logos/trove.svg',
        url: 'https://troveapp.co/'
    },
    {
        title: 'Chaka',
        categories: ['Fintech', 'Investment'],
        route: '/logos/chaka.svg',
        url: 'https://www.chaka.com/'
    },

    // Payment Gateways (5)
    {
        title: 'Interswitch',
        categories: ['Payment Gateway'],
        route: '/logos/interswitch.svg',
        url: 'https://www.interswitchgroup.com/'
    },
    {
        title: 'Remita',
        categories: ['Payment Gateway'],
        route: '/logos/remita.svg',
        url: 'https://www.remita.net/'
    },
    {
        title: 'VoguePay',
        categories: ['Payment Gateway'],
        route: '/logos/voguepay.svg',
        url: 'https://voguepay.com/'
    },
    {
        title: 'Global Accelerex',
        categories: ['Payment Gateway'],
        route: '/logos/global-accelerex.svg',
        url: 'https://www.globalaccelerex.com/'
    },
    {
        title: 'eTranzact',
        categories: ['Payment Gateway'],
        route: '/logos/etranzact.svg',
        url: 'https://www.etranzact.com/'
    },

    // Insurtech (6)
    {
        title: 'AXA Mansard',
        categories: ['Insurtech'],
        route: '/logos/axa-mansard.svg',
        url: 'https://www.axamansard.com/'
    },
    {
        title: 'Leadway Assurance',
        categories: ['Insurtech'],
        route: '/logos/leadway.svg',
        url: 'https://www.leadway.com/'
    },
    {
        title: 'AIICO Insurance',
        categories: ['Insurtech'],
        route: '/logos/aiico.svg',
        url: 'https://www.aiicoplc.com/'
    },
    {
        title: 'Casava',
        categories: ['Insurtech', 'Fintech'],
        route: '/logos/casava.svg',
        url: 'https://casava.com/'
    },
    {
        title: 'Curacel',
        categories: ['Insurtech', 'Fintech'],
        route: '/logos/curacel.svg',
        url: 'https://curacel.co/'
    },
    {
        title: 'MyCoverGenius',
        categories: ['Insurtech', 'Fintech'],
        route: '/logos/mycovergenius.svg',
        url: 'https://mycovergenius.com/'
    },

    // Regulatory Bodies (4)
    {
        title: 'Central Bank of Nigeria',
        categories: ['Regulatory Body'],
        route: '/logos/cbn.svg',
        url: 'https://www.cbn.gov.ng/'
    },
    {
        title: 'NDIC',
        categories: ['Regulatory Body'],
        route: '/logos/ndic.svg',
        url: 'https://ndic.gov.ng/'
    },
    {
        title: 'SEC Nigeria',
        categories: ['Regulatory Body'],
        route: '/logos/sec-nigeria.svg',
        url: 'https://sec.gov.ng/'
    },
    {
        title: 'PenCom',
        categories: ['Regulatory Body'],
        route: '/logos/pencom.svg',
        url: 'https://www.pencom.gov.ng/'
    },

    // Other (5)
    {
        title: 'NIBSS',
        categories: ['Other'],
        route: '/logos/nibss.svg',
        url: 'https://nibss-plc.com.ng/'
    },
    {
        title: 'SystemSpecs',
        categories: ['Other', 'Fintech'],
        route: '/logos/systemspecs.svg',
        url: 'https://systemspecs.com.ng/'
    },
    {
        title: 'Bank of Industry',
        categories: ['Other'],
        route: '/logos/boi.svg',
        url: 'https://www.boi.ng/'
    },
    {
        title: 'AMCON',
        categories: ['Other'],
        route: '/logos/amcon.svg',
        url: 'https://amcon.com.ng/'
    },
    {
        title: 'FMDQ',
        categories: ['Other'],
        route: '/logos/fmdq.svg',
        url: 'https://fmdqgroup.com/'
    }
];
