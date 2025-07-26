import type { ILogo } from '@/types';

type IRawLogo = Omit<ILogo, 'id' | 'order'>;

export const logos: IRawLogo[] = [
    // Commercial Banks
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

    // Other (NGX-listed, etc.)
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
    },
    {
        title: 'Abbey Mortgage Bank PLC',
        categories: ['Commercial Bank'],
        route: '/logos/abbeybds.svg',
        url: 'https://www.abbeymortgagebank.com/',
        ticker: 'ABBEYBDS'
    },
    {
        title: 'ABC Transport PLC',
        categories: ['Other'],
        route: '/logos/abctrans.svg',
        url: 'https://www.abctransport.com/',
        ticker: 'ABCTRANS'
    },
    {
        title: 'Academy Press PLC',
        categories: ['Other'],
        route: '/logos/academy.svg',
        url: 'http://www.academypress-plc.com/',
        ticker: 'ACADEMY'
    },
    {
        title: 'African Alliance Insurance PLC',
        categories: ['Insurtech'],
        route: '/logos/afrinsure.svg',
        url: 'https://www.africanallianceplc.com/',
        ticker: 'AFRINSURE'
    },
    {
        title: 'Africa Prudential PLC',
        categories: ['Other'],
        route: '/logos/afriprud.svg',
        url: 'https://africaprudential.com/',
        ticker: 'AFRIPRUD'
    },
    {
        title: 'Afromedia PLC',
        categories: ['Other'],
        route: '/logos/afromedia.svg',
        url: 'http://www.afromediaplc.com/',
        ticker: 'AFROMEDIA'
    },
    {
        title: 'Airtel Africa PLC',
        categories: ['Other'],
        route: '/logos/airtelafri.svg',
        url: 'https://airtel.africa/',
        ticker: 'AIRTELAFRI'
    },
    {
        title: 'Berger Paints Nigeria PLC',
        categories: ['Other'],
        route: '/logos/berger.svg',
        url: 'https://bergerpaintsnig.com/',
        ticker: 'BERGER'
    },
    {
        title: 'Beta Glass PLC',
        categories: ['Other'],
        route: '/logos/betaglas.svg',
        url: 'https://www.beta-glass.com/',
        ticker: 'BETAGLAS'
    },
    {
        title: 'Cadbury Nigeria PLC',
        categories: ['Other'],
        route: '/logos/cadbury.svg',
        url: 'https://www.cadburynigeria.com/',
        ticker: 'CADBURY'
    },
    {
        title: 'CAP PLC',
        categories: ['Other'],
        route: '/logos/cap.svg',
        url: 'https://www.capplc.com/',
        ticker: 'CAP'
    },
    {
        title: 'Caverton Offshore Support Group PLC',
        categories: ['Other'],
        route: '/logos/caverton.svg',
        url: 'https://www.caverton-offshore.com/',
        ticker: 'CAVERTON'
    },
    {
        title: 'Champion Breweries PLC',
        categories: ['Other'],
        route: '/logos/champion.svg',
        url: 'https://championbreweries.com/',
        ticker: 'CHAMPION'
    },
    {
        title: 'Chams Holding Company PLC',
        categories: ['Other', 'Fintech'],
        route: '/logos/chams.svg',
        url: 'https://chamsplc.com/',
        ticker: 'CHAMS'
    },
    {
        title: 'C & I Leasing PLC',
        categories: ['Other'],
        route: '/logos/cileasing.svg',
        url: 'https://www.c-ileasing.com/',
        ticker: 'CILEASING'
    },
    {
        title: 'Conoil PLC',
        categories: ['Other'],
        route: '/logos/conoil.svg',
        url: 'http://www.conoilplc.com/',
        ticker: 'CONOIL'
    },
    {
        title: 'Custodian Investment PLC',
        categories: ['Investment', 'Insurtech'],
        route: '/logos/custodian.svg',
        url: 'https://custodianplc.com.ng/',
        ticker: 'CUSTODIAN'
    },
    {
        title: 'Cutix PLC',
        categories: ['Other'],
        route: '/logos/cutix.svg',
        url: 'https://www.cutixplc.com.ng/',
        ticker: 'CUTIX'
    },
    {
        title: 'CWG PLC',
        categories: ['Other'],
        route: '/logos/cwg.svg',
        url: 'https://cwg-plc.com/',
        ticker: 'CWG'
    },
    {
        title: 'Dangote Sugar Refinery PLC',
        categories: ['Other'],
        route: '/logos/dangsugar.svg',
        url: 'https://www.dangotesugar.com.ng/',
        ticker: 'DANGSUGAR'
    },
    {
        title: 'Eterna PLC',
        categories: ['Other'],
        route: '/logos/eterna.svg',
        url: 'https://www.eternaplc.com/',
        ticker: 'ETERNA'
    },
    {
        title: 'Fidson Healthcare PLC',
        categories: ['Other'],
        route: '/logos/fidson.svg',
        url: 'https://www.fidson.com/',
        ticker: 'FIDSON'
    },
    {
        title: 'Geregu Power PLC',
        categories: ['Other'],
        route: '/logos/geregu.svg',
        url: 'https://geregupowerplc.com/',
        ticker: 'GEREGU'
    },
    {
        title: 'Guinness Nigeria PLC',
        categories: ['Other'],
        route: '/logos/guinness.svg',
        url: 'https://www.guinness-nigeria.com/',
        ticker: 'GUINNESS'
    },
    {
        title: 'Honeywell Flour Mills PLC',
        categories: ['Other'],
        route: '/logos/honyflour.svg',
        url: 'https://www.honeywellflour.com/',
        ticker: 'HONYFLOUR'
    },
    {
        title: 'Ikeja Hotel PLC',
        categories: ['Other'],
        route: '/logos/ikejahotel.svg',
        url: 'https://ikejahotelplc.com/',
        ticker: 'IKEJAHOTEL'
    },
    {
        title: 'International Breweries PLC',
        categories: ['Other'],
        route: '/logos/intbrew.svg',
        url: 'https://www.ab-inbev.com/',
        ticker: 'INTBREW'
    },
    {
        title: 'Japaul Gold & Ventures PLC',
        categories: ['Other'],
        route: '/logos/japaulgold.svg',
        url: 'https://japaulgroup.com/',
        ticker: 'JAPAULGOLD'
    },
    {
        title: 'Julius Berger Nigeria PLC',
        categories: ['Other'],
        route: '/logos/jberger.svg',
        url: 'https://www.julius-berger.com/',
        ticker: 'JBERGER'
    },
    {
        title: 'Lafarge Africa PLC',
        categories: ['Other'],
        route: '/logos/wapco.svg',
        url: 'https://www.lafarge.com.ng/',
        ticker: 'WAPCO'
    },
    {
        title: 'Linkage Assurance PLC',
        categories: ['Insurtech'],
        route: '/logos/linkassure.svg',
        url: 'https://www.linkageassurance.com/',
        ticker: 'LINKASSURE'
    },
    {
        title: 'Livestock Feeds PLC',
        categories: ['Other'],
        route: '/logos/livestock.svg',
        url: 'http://www.livestockfeedsplc.com/',
        ticker: 'LIVESTOCK'
    },
    {
        title: 'May & Baker Nigeria PLC',
        categories: ['Other'],
        route: '/logos/maybaker.svg',
        url: 'https://www.may-baker.com/',
        ticker: 'MAYBAKER'
    },
    {
        title: 'MRS Oil Nigeria PLC',
        categories: ['Other'],
        route: '/logos/mrs.svg',
        url: 'https://mrsholdings.com/',
        ticker: 'MRS'
    },
    {
        title: 'NAHCO Aviance PLC',
        categories: ['Other'],
        route: '/logos/nahco.svg',
        url: 'https://www.nahcoaviance.com/',
        ticker: 'NAHCO'
    },
    {
        title: 'NASCON Allied Industries PLC',
        categories: ['Other'],
        route: '/logos/nascon.svg',
        url: 'https://www.nasconplc.com/',
        ticker: 'NASCON'
    },
    {
        title: 'Nigerian Breweries PLC',
        categories: ['Other'],
        route: '/logos/nb.svg',
        url: 'https://nbplc.com/',
        ticker: 'NB'
    },
    {
        title: 'Neimeth International Pharmaceuticals PLC',
        categories: ['Other'],
        route: '/logos/neimeth.svg',
        url: 'https://www.neimethplc.com.ng/',
        ticker: 'NEIMETH'
    },
    {
        title: 'Nestle Nigeria PLC',
        categories: ['Other'],
        route: '/logos/nestle.svg',
        url: 'https://www.nestle-cwa.com/en/nigeria',
        ticker: 'NESTLE'
    },
    {
        title: 'NGX Group PLC',
        categories: ['Investment', 'Other'],
        route: '/logos/ngxgroup.svg',
        url: 'https://ngxgroup.com/',
        ticker: 'NGXGROUP'
    },
    {
        title: 'NPF Microfinance Bank PLC',
        categories: ['Commercial Bank'],
        route: '/logos/npfmcrfbk.svg',
        url: 'https://www.npfmicrofinancebank.com/',
        ticker: 'NPFMCRFBK'
    },
    {
        title: 'Oando PLC',
        categories: ['Other'],
        route: '/logos/oando.svg',
        url: 'https://www.oandoplc.com/',
        ticker: 'OANDO'
    },
    {
        title: 'Okomu Oil Palm PLC',
        categories: ['Other'],
        route: '/logos/okomuoil.svg',
        url: 'https://www.okomunigeria.com/',
        ticker: 'OKOMUOIL'
    },
    {
        title: 'Presco PLC',
        categories: ['Other'],
        route: '/logos/presco.svg',
        url: 'https://www.presco-plc.com/',
        ticker: 'PRESCO'
    },
    {
        title: 'PZ Cussons Nigeria PLC',
        categories: ['Other'],
        route: '/logos/pz.svg',
        url: 'https://www.pzcussons.com/nigeria/',
        ticker: 'PZ'
    },
    {
        title: 'Red Star Express PLC',
        categories: ['Other'],
        route: '/logos/redstarex.svg',
        url: 'https://redstarplc.com/',
        ticker: 'REDSTAREX'
    },
    {
        title: 'Transcorp Hotels PLC',
        categories: ['Other'],
        route: '/logos/transcohot.svg',
        url: 'https://www.transcorphotels.com/',
        ticker: 'TRANSCOHOT'
    },
    {
        title: 'Transnational Corporation of Nigeria PLC',
        categories: ['Other'],
        route: '/logos/transcorp.svg',
        url: 'https://www.transcorpgroup.com/',
        ticker: 'TRANSCORP'
    },
    {
        title: 'UAC of Nigeria PLC',
        categories: ['Other'],
        route: '/logos/uacn.svg',
        url: 'https://www.uacnofnigeria.com/',
        ticker: 'UACN'
    },
    {
        title: 'Unilever Nigeria PLC',
        categories: ['Other'],
        route: '/logos/unilever.svg',
        url: 'https://www.unilever-ewa.com/countries/nigeria/',
        ticker: 'UNILEVER'
    },
    {
        title: 'UPDC PLC',
        categories: ['Other'],
        route: '/logos/updc.svg',
        url: 'https://www.updcplc.com/',
        ticker: 'UPDC'
    },
    {
        title: 'Vitafoam Nigeria PLC',
        categories: ['Other'],
        route: '/logos/vitafoam.svg',
        url: 'https://www.vitafoamng.com/',
        ticker: 'VITAFOAM'
    }
];
