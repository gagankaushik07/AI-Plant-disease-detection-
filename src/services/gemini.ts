import { GoogleGenAI, Type } from "@google/genai";
import { PlantAnalysis, CropRecommendation, FertilizerRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzePlantDisease(base64Image: string, mimeType: string): Promise<PlantAnalysis> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: base64Image.split(",")[1],
              mimeType: mimeType,
            },
          },
          {
            text: "Analyze this plant leaf image. Identify if it's healthy or diseased. If diseased, provide the disease name, confidence level (0-1), symptoms, causes, treatment, and prevention steps. Return the result in JSON format.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diseaseName: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
          causes: { type: Type.ARRAY, items: { type: Type.STRING } },
          treatment: { type: Type.ARRAY, items: { type: Type.STRING } },
          prevention: { type: Type.ARRAY, items: { type: Type.STRING } },
          isHealthy: { type: Type.BOOLEAN },
        },
        required: ["diseaseName", "confidence", "symptoms", "causes", "treatment", "prevention", "isHealthy"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function getCropRecommendation(soilType: string, climate: string, location?: string): Promise<CropRecommendation> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on soil type '${soilType}', climate '${climate}'${location ? ` and location '${location}'` : ''}, recommend the best crop to grow. Provide the crop name, reason, best season, soil requirements, and water requirements in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          crop: { type: Type.STRING },
          reason: { type: Type.STRING },
          season: { type: Type.STRING },
          soilType: { type: Type.STRING },
          waterRequirement: { type: Type.STRING },
        },
        required: ["crop", "reason", "season", "soilType", "waterRequirement"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function getFertilizerRecommendation(crop: string, growthStage: string, soilCondition: string): Promise<FertilizerRecommendation> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `For crop '${crop}' at growth stage '${growthStage}' with soil condition '${soilCondition}', recommend the best fertilizer. Provide the fertilizer name, dosage, application method, and frequency in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fertilizer: { type: Type.STRING },
          dosage: { type: Type.STRING },
          applicationMethod: { type: Type.STRING },
          frequency: { type: Type.STRING },
        },
        required: ["fertilizer", "dosage", "applicationMethod", "frequency"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function chatWithBhoomi(message: string, history: any[]) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are BHOOMI AI, a specialized agricultural assistant. Provide expert advice on plant care, disease management, and sustainable farming. Be helpful, concise, and professional.",
    },
  });

  // Simple history conversion if needed, but for now we'll just send the message
  const response = await chat.sendMessage({ message });
  return response.text;
}
