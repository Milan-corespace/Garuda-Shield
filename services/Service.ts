import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, Language, LoanProduct } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface ExpandedExplanation {
  explanation: string;
  safetyAdvice: string;
  recommendedApp: string;
}

export const explainTransaction = async (transaction: Transaction, lang: Language): Promise<ExpandedExplanation> => {
  try {
    if (!process.env.API_KEY) {
      return mockExplanation(transaction, lang);
    }

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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING },
            safetyAdvice: { type: Type.STRING },
            recommendedApp: { type: Type.STRING },
          },
          required: ["explanation", "safetyAdvice", "recommendedApp"],
        }
      }
    });

    return JSON.parse(response.text || "{}");

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
    if (!process.env.API_KEY) {
      if (amount > 50000) return { status: 'flagged', aiReason: 'Amount exceeds daily threshold.' };
      return { status: 'approved', aiReason: 'Pattern matches user history.' };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Analyze banking transaction for user in Mumbai.
        Merchant: ${merchant}
        Amount: INR ${amount}
        Category: ${category}

        Rules:
        - High risk keywords (crypto, casino) -> blocked.
        - Amount > 50000 -> flagged.
        - Else -> approved.

        Return JSON.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ["approved", "blocked", "flagged"] },
            aiReason: { type: Type.STRING },
          },
        },
      },
    });

    const json = JSON.parse(response.text || "{}");
    return {
      status: json.status || 'flagged',
      aiReason: json.aiReason || 'Automated check.',
    };

  } catch (error) {
    return { status: 'flagged', aiReason: 'System offline. Manual review needed.' };
  }
}

export const analyzeLoanImpact = async (loan: LoanProduct, lang: Language): Promise<string> => {
  if (!process.env.API_KEY) return "AI Analysis: This loan has a moderate interest rate. Ensure you can manage EMIs without affecting savings.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Act as a financial advisor. Analyze this loan product for a middle-class Indian user.
        Language: ${lang} (Answer in this language).
        
        Loan: ${loan.name}
        Type: ${loan.type}
        Interest: ${loan.interestRate}%
        Tenure: ${loan.minTenure} months.

        Explain if this will likely be a "Profit" (builds asset/wealth) or "Loss" (depreciating asset/high interest debt trap) in the long run.
        Keep it under 60 words. Be direct.
      `
    });
    return response.text || "Analysis unavailable.";
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