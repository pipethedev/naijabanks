import type { ILogo } from '@/types';

type IRawLogo = Omit<ILogo, 'id' | 'order'>;

export const logos: IRawLogo[] = [
    {
        title: 'Access Holdings PLC',
        categories: ['Commercial Bank'],
        route: '/logos/accesscorp.svg',
        url: 'https://www.accessbankplc.com/',
        ticker: 'ACCESSCORP'
    },
    {
        title: 'Guaranty Trust Holding Company PLC',
        categories: ['Commercial Bank', 'Investment'],
        route: '/logos/gtco.svg',
        url: 'https://www.gtcoplc.com/',
        ticker: 'GTCO'
    },
    {
        title: 'Zenith Bank PLC',
        categories: ['Commercial Bank'],
        route: '/logos/zenithbank.svg',
        url: 'https://www.zenithbank.com/',
        ticker: 'ZENITHBANK'
    },
    {
        title: 'United Bank for Africa PLC',
        categories: ['Commercial Bank'],
        route: '/logos/uba.svg',
        url: 'https://www.ubagroup.com/',
        ticker: 'UBA'
    },
    {
        title: 'FBN Holdings PLC',
        categories: ['Commercial Bank'],
        route: '/logos/fbnh.svg',
        url: 'https://www.fbnholdings.com/',
        ticker: 'FBNH'
    },
    {
        title: 'Fidelity Bank PLC',
        categories: ['Commercial Bank'],
        route: '/logos/fidelitybk.svg',
        url: 'https://www.fidelitybank.ng/',
        ticker: 'FIDELITYBK'
    },
    {
        title: 'Stanbic IBTC Holdings PLC',
        categories: ['Commercial Bank', 'Investment'],
        route: '/logos/stanbic.svg',
        url: 'https://www.stanbicibtc.com/',
        ticker: 'STANBIC'
    },
    {
        title: 'Ecobank Transnational Incorporated',
        categories: ['Commercial Bank'],
        route: '/logos/eti.svg',
        url: 'https://ecobank.com/',
        ticker: 'ETI'
    },
    {
        title: 'Sterling Financial Holdings Company PLC',
        categories: ['Commercial Bank'],
        route: '/logos/sterlingng.svg',
        url: 'https://sterling.ng/',
        ticker: 'STERLINGNG'
    },
    {
        title: 'Wema Bank PLC',
        categories: ['Commercial Bank'],
        route: '/logos/wemabank.svg',
        url: 'https://www.wemabank.com/',
        ticker: 'WEMABANK'
    },
    {
        title: 'Union Bank of Nigeria PLC',
        categories: ['Commercial Bank'],
        route: '/logos/ubn.svg',
        url: 'https://www.unionbankng.com/',
        ticker: 'UBN'
    },
    {
        title: 'Polaris Bank',
        categories: ['Commercial Bank'],
        route: '/logos/polaris-bank.svg',
        url: 'https://www.polarisbankltd.com/'
    },
    {
        title: 'FCMB Group Plc',
        categories: ['Commercial Bank'],
        route: '/logos/fcmb.svg',
        url: 'https://www.fcmb.com/',
        ticker: 'FCMB'
    },
    {
        title: 'Jaiz Bank PLC',
        categories: ['Commercial Bank'],
        route: '/logos/jaizbank.svg',
        url: 'https://jaizbankplc.com/',
        ticker: 'JAIZBANK'
    },
    {
        title: 'Unity Bank PLC',
        categories: ['Commercial Bank'],
        route: '/logos/unitybnk.svg',
        url: 'https://www.unitybankng.com/',
        ticker: 'UNITYBNK'
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

    // Investment & WealthTech (7)
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
    {
        title: 'United Capital PLC',
        categories: ['Investment'],
        route: '/logos/ucap.svg',
        url: 'https://www.unitedcapitalplcgroup.com/',
        ticker: 'UCAP'
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
        title: 'eTranzact International PLC',
        categories: ['Payment Gateway', 'Fintech'],
        route: '/logos/etranzact.svg',
        url: 'https://www.etranzact.com/',
        ticker: 'ETRANZACT'
    },

    // Insurtech (8)
    {
        title: 'AXA Mansard Insurance PLC',
        categories: ['Insurtech'],
        route: '/logos/mansard.svg',
        url: 'https://www.axamansard.com/',
        ticker: 'MANSARD'
    },
    {
        title: 'Leadway Assurance',
        categories: ['Insurtech'],
        route: '/logos/leadway.svg',
        url: 'https://www.leadway.com/'
    },
    {
        title: 'AIICO Insurance PLC',
        categories: ['Insurtech'],
        route: '/logos/aiico.svg',
        url: 'https://www.aiicoplc.com/',
        ticker: 'AIICO'
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
    {
        title: 'NEM Insurance PLC',
        categories: ['Insurtech'],
        route: '/logos/nem.svg',
        url: 'https://nem-insurance.com/',
        ticker: 'NEM'
    },
    {
        title: 'Cornerstone Insurance PLC',
        categories: ['Insurtech'],
        route: '/logos/cornerst.svg',
        url: 'https://www.cornerstone.com.ng/',
        ticker: 'CORNERST'
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

    // Other (NGX-listed non-financials, etc.) (10)
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
        title: 'FMDQ Group',
        categories: ['Other'],
        route: '/logos/fmdq.svg',
        url: 'https://fmdqgroup.com/',
        ticker: 'FMDQ'
    },
    {
        title: 'Dangote Cement PLC',
        categories: ['Other'],
        route: '/logos/dangcem.svg',
        url: 'https://www.dangotecement.com/',
        ticker: 'DANGCEM'
    },
    {
        title: 'MTN Nigeria Communications PLC',
        categories: ['Other'],
        route: '/logos/mtnn.svg',
        url: 'https://www.mtn.ng/',
        ticker: 'MTNN'
    },
    {
        title: 'BUA Cement PLC',
        categories: ['Other'],
        route: '/logos/buacement.svg',
        url: 'https://www.buacement.com/',
        ticker: 'BUACEMENT'
    },
    {
        title: 'BUA Foods PLC',
        categories: ['Other'],
        route: '/logos/buafoods.svg',
        url: 'https://www.buafoodsplc.com/',
        ticker: 'BUAFOODS'
    },
    {
        title: 'Seplat Energy PLC',
        categories: ['Other'],
        route: '/logos/seplat.svg',
        url: 'https://www.seplatenergy.com/',
        ticker: 'SEPLAT'
    }
];
