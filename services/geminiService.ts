
import { GoogleGenAI, Type } from "@google/genai";
import { MeetingAgenda, ChatMessage } from "../types";

// Always use the process.env.API_KEY directly in the constructor as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const AGENDA_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A catchy but professional meeting title" },
    objective: { type: Type.STRING, description: "The primary goal of this meeting" },
    stakeholders: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          role: { type: Type.STRING }
        },
        required: ["name", "role"]
      }
    },
    topics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          durationMinutes: { type: Type.NUMBER },
          presenter: { type: Type.STRING }
        },
        required: ["id", "title", "description", "durationMinutes"]
      }
    },
    totalDuration: { type: Type.NUMBER }
  },
  required: ["title", "objective", "stakeholders", "topics", "totalDuration"]
};

// Generates a meeting agenda based on provided document content.
export const generateAgendaFromContent = async (content: string): Promise<MeetingAgenda> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the following document content, create a structured meeting agenda. 
    Identify logical stakeholders who should attend. 
    Break the document into actionable meeting topics with clear durations (in minutes). 
    Ensure the total duration makes sense (usually 30-90 mins).
    
    CONTENT:
    ${content}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: AGENDA_SCHEMA,
    }
  });

  // response.text is a property, not a method.
  return JSON.parse(response.text || '{}') as MeetingAgenda;
};

// Provides a chat response based on the document content and conversation history.
export const getChatResponse = async (docContent: string, history: ChatMessage[], message: string): Promise<string> => {
  // Use gemini-3-pro-preview for complex reasoning tasks like document analysis.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [
      ...history.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: `You are an expert meeting analyst and agenda optimizer. 
      The user is working on an agenda based on this document:
      
      --- START OF DOCUMENT ---
      ${docContent}
      --- END OF DOCUMENT ---
      
      Use the document context to answer questions, suggest improvements to the agenda, or explain topics.`,
    }
  });

  // response.text is a property, not a method.
  return response.text || "";
};
