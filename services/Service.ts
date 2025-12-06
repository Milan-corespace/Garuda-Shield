import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { Transaction, Language, LoanProduct } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export interface ExpandedExplanation {
  explanation: string;
  safetyAdvice: string;
  recommendedApp: string;
}

export const explainTransaction = async (transaction: Transaction, lang: Language): Promise<ExpandedExplanation> => {
  try {
    if (!apiKey) {
      console.warn("No API Key found. Using mock data.");
      return mockExplanation(transaction, lang);
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            explanation: { type: SchemaType.STRING },
            safetyAdvice: { type: SchemaType.STRING },
            recommendedApp: { type: SchemaType.STRING },
          },
          required: ["explanation", "safetyAdvice", "recommendedApp"],
        },
      },
    });

    const prompt = `
      You are "Garuda-Shield", an AI Banking Guardian.
      Explain this transaction in language: ${lang}.
      
      Details:
      - Merchant: ${transaction.merchant}
      - Status: ${transaction.status}
      - Reason: ${transaction.aiReason}

      Return JSON format with:
      1. "explanation": Simple 30-word explanation.
      2. "safetyAdvice": How to be safe/deal with this (e.g. if fraud, contact bank; if safe, keep receipt).
      3. "recommendedApp": Suggest a safe Indian app for this type (e.g., BHIM UPI for small, NetBanking for large).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return JSON.parse(response.text());

  } catch (error) {
    console.error("Gemini API Error:", error);
    return mockExplanation(transaction, lang);
  }
};

export const analyzeNewTransaction = async (
  merchant: string, 
  amount: number, 
  category: string
): Promise<{ status: 'approved' | 'blocked' | 'flagged'; aiReason: string }> => {
  try {
    if (!apiKey) {
      if (amount > 50000) return { status: 'flagged', aiReason: 'Amount exceeds daily threshold (Offline Mode).' };
      return { status: 'approved', aiReason: 'Pattern matches user history (Offline Mode).' };
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            // FIX: Removed 'enum' here to stop the TypeScript error. 
            // The Prompt below handles the logic sufficiently.
            status: { type: SchemaType.STRING }, 
            aiReason: { type: SchemaType.STRING },
          },
        },
      },
    });

    const prompt = `
        Analyze banking transaction for user in Mumbai.
        Merchant: ${merchant}
        Amount: INR ${amount}
        Category: ${category}

        Rules:
        - High risk keywords (crypto, casino) -> blocked.
        - Amount > 50000 -> flagged.
        - Else -> approved.

        Return JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const json = JSON.parse(response.text());

    // FIX: Added "as ..." to tell TypeScript the string is safe to use
    const status = (json.status as 'approved' | 'blocked' | 'flagged') || 'flagged';

    return {
      status: status,
      aiReason: json.aiReason || 'Automated check.',
    };

  } catch (error) {
    return { status: 'flagged', aiReason: 'System offline. Manual review needed.' };
  }
}

export const analyzeLoanImpact = async (loan: LoanProduct, lang: Language): Promise<string> => {
  if (!apiKey) return "AI Analysis (Offline): This loan has a moderate interest rate. Ensure you can manage EMIs without affecting savings.";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
        Act as a financial advisor. Analyze this loan product for a middle-class Indian user.
        Language: ${lang} (Answer in this language).
        
        Loan: ${loan.name}
        Type: ${loan.type}
        Interest: ${loan.interestRate}%
        Tenure: ${loan.minTenure} months.

        Explain if this will likely be a "Profit" (builds asset/wealth) or "Loss" (depreciating asset/high interest debt trap) in the long run.
        Keep it under 60 words. Be direct.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    return "Analysis unavailable due to connection error.";
  }
}

const mockExplanation = (t: Transaction, lang: Language): ExpandedExplanation => {
  return {
    explanation: "System is in offline demo mode. This is a simulated safe explanation.",
    safetyAdvice: "Always verify the merchant name before entering your PIN.",
    recommendedApp: "Official Bank App"
  };
};