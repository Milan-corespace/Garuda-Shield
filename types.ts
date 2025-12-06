export enum Language {
  EN = 'en', // English
  HI = 'hi', // Hindi
  TA = 'ta', // Tamil
  BN = 'bn', // Bengali
  MR = 'mr', // Marathi
  TE = 'te', // Telugu
  KN = 'kn', // Kannada
  OR = 'or', // Odia
  PA = 'pa', // Punjabi
  GU = 'gu', // Gujarati
  ML = 'ml', // Malayalam
}

export enum Tab {
  HOME = 'home',
  LEDGER = 'ledger',
  CONSENT = 'consent',
  PROFILE = 'profile',
  BANKS = 'banks',
  GUIDE = 'guide',
  TRANSACT = 'transact',
  FAMILY = 'family',
  B2B = 'b2b',
  IMPACT = 'impact',
  ETHICS = 'ethics'
}

export interface UserState {
  isLoggedIn: boolean;
  linkedBankId: string | null; // ID of the bank selected
  accountName: string | null;
  accountNumber: string | null;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'approved' | 'blocked' | 'flagged' | 'pending'; // Added pending
  aiReason: string; // The technical reason
  garudaView?: string; // The human-readable explanation shown on hover
  humanExplanation?: string; // Populated by AI
  safetyAdvice?: string; // Populated by AI
  recommendedApp?: string; // Populated by AI
  category: string;
  merchant: string;
  isCoolingOff?: boolean; // For the undo timer
}

export interface ConsentItem {
  id: string;
  title: string;
  description: string;
  isGranted: boolean;
  lastUpdated: string;
  category: 'marketing' | 'security' | 'third-party';
}

export interface CreditFactor {
  subject: string;
  A: number; // User score
  fullMark: number;
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  trustScore: number;
  incomeStability: 'High' | 'Medium' | 'Low';
  spendingRisk: 'High' | 'Medium' | 'Low';
  aiNote: string;
  factors: CreditFactor[];
}

export interface LoanProduct {
  id: string;
  name: string;
  interestRate: number;
  type: 'Home' | 'Personal' | 'Auto' | 'Gold';
  minTenure: number; // months
  description: string;
}

export interface Bank {
  id: string;
  name: string;
  logo: string; // initial or simple text
  color: string;
  ussdCode: string; // For offline transactions
  loans: LoanProduct[];
  // Mock user data for the "My Bank" view
  mockBalance?: number;
  activePlan?: string;
}

export interface CommitteeMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface BlogPost {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  safetyStatus: 'safe' | 'risk' | 'critical';
  lastActivity: string;
  alerts: number;
}

export interface ErrorCode {
  code: string;
  technical: string;
  human: string;
  action: string;
}

export interface Subscription {
  id: string;
  serviceName: string;
  amount: number;
  frequency: 'Monthly' | 'Yearly';
  nextDueDate: string;
  isTrial: boolean;
  logo: string;
}

export interface ScamAlert {
  id: string;
  title: string;
  description: string;
  image: string; // Placeholder URL
  severity: 'High' | 'Medium';
}

export interface SearchIntent {
  keywords: string[];
  actionLabel: string;
  targetTab: Tab;
}

export type SystemStatus = 'normal' | 'slow' | 'down';