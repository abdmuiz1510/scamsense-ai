/**
 * ScamSense AI - Realistic Fictional Test Samples
 * Malaysian Context (Bahasa Malaysia & English)
 */

import { SampleMessage } from '@/types/analysis';

export const SAMPLE_MESSAGES: SampleMessage[] = [
  {
    id: 'sample-maybank-tac',
    title: 'Bank TAC/OTP Phishing Scam',
    category: 'Banking Impersonation',
    language: 'Bilingual',
    badge: 'Scam Example',
    description: 'Fake Maybank security alert claiming unauthorized purchase, urging immediate reply with 6-digit TAC code.',
    text: `[MAYBANK ALERT]: Transaksi RM1,890.00 di Shopee Pay telah dikesan pada akaun anda. Jika ini BUKAN anda, sila batalkan segera dalam tempoh 15 minit. Sila balas mesej ini dengan nombor TAC 6-digit anda atau klik https://maybank2u-security-update.xyz/login untuk mengelakkan akaun anda disekat serta-merta.`
  },
  {
    id: 'sample-pos-parcel',
    title: 'Pos Malaysia Parcel Delivery Fee',
    category: 'Courier & Delivery Scam',
    language: 'Bahasa Malaysia',
    badge: 'Scam Example',
    description: 'Fake parcel delivery notification requiring an urgent clearance fee payment via a masked link.',
    text: `Pos Malaysia: Bungkusan anda #MY940218824 tidak dapat dihantar kerana alamat penerima tidak lengkap. Sila klik pautan http://bit.ly/poslaju-redelivery-caj untuk mengemaskini butiran alamat dan membuat bayaran caj penghantaran semula sebanyak RM2.50 dalam tempoh 24 jam sebelum bungkusan dilupuskan.`
  },
  {
    id: 'sample-lhdn-warrant',
    title: 'LHDN Tax Arrears Legal Threat',
    category: 'Government Impersonation (LHDN/PDRM/JPJ)',
    language: 'Bahasa Malaysia',
    badge: 'Scam Example',
    description: 'Impersonation of the Inland Revenue Board (LHDN) threatening immediate court arrest warrant.',
    text: `PERINGATAN LHDN: Encik/Puan mempunyai tunggakan cukai pendapatan sebanyak RM3,420.50 bagi tahun taksiran 2024. Tindakan undang-undang dan waran tangkap Mahkamah telah dikeluarkan atas nama anda. Sila pindahkan wang kompaun ke akaun audit sementara atau hubungi Pegawai Penguatkuasa En. Rosli di WhatsApp wasap.my/601123456789 dengan segera.`
  },
  {
    id: 'sample-tng-subsidy',
    title: 'Touch \'n Go eWallet Lucky Draw Prize',
    category: 'Prize & Lucky Draw Scam',
    language: 'Bahasa Malaysia',
    badge: 'Scam Example',
    description: 'Fake subsidy claim and lucky draw lure asking for login credentials and IC number.',
    text: `Tahniah! Nombor telefon anda telah terpilih sebagai pemenang Cabutan Bertuah Touch 'n Go eWallet bernilai RM1,500. Sila layari pautan https://tng-claim-subsidi.online/bonus dan masukkan kata laluan serta nombor kad pengenalan MyKad anda untuk proses penebusan wang tunai sebelum tamat tempoh malam ini.`
  },
  {
    id: 'sample-cimb-safe',
    title: 'CIMB "Safe Account" Fund Transfer',
    category: 'Banking Impersonation',
    language: 'English',
    badge: 'Scam Example',
    description: 'Impersonation of CIMB Fraud Squad instructing the victim to transfer funds to a "safe account".',
    text: `URGENT NOTICE FROM CIMB FRAUD PREVENTION DEPT: We have identified ongoing unauthorized withdrawals from your savings balance. To safeguard your funds, transfer your remaining balance ($8,500) into our official safe account / holding vault immediately. Do not disclose this to branch staff as they are under internal investigation. Call +6011-9876-5432 now.`
  },
  {
    id: 'sample-legitimate-bank',
    title: 'Legitimate Bank Transaction Notification',
    category: 'Legitimate Standard Alert',
    language: 'Bilingual',
    badge: 'Safe Example',
    description: 'Actual format of a legitimate bank notification containing zero links and explicit anti-phishing advisory.',
    text: `RM0.00 Maybank: RM150.00 debited from a/c *4091 on 14/11/26 11:42AM at PETRONAS TTDI. If unauthorized, call the fraud hotline on the back of your card immediately. 

Reminder: Maybank will NEVER call or SMS you asking for your password, PIN, or 6-digit TAC code. Never click any links in SMS.`
  }
];
