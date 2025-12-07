import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Create a Groq provider instance
// The Vercel AI SDK's OpenAI provider is compatible with Groq
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log("Generate API called");
  console.log("Key present:", !!process.env.GROQ_API_KEY);

  try {
    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: `You are an expert React component developer using Tailwind CSS and shadcn/ui.
    You will be given a request to generate a React component.
    
    Rules:
    1. Output ONLY the raw TSX code. Do not wrap it in markdown code blocks (no \`\`\`tsx).
    2. Use 'lucide-react' for icons.
    3. Use 'framer-motion' for animations if requested.
    4. Use standard HTML tags styled with Tailwind CSS.
    5. Be creative and make the design look premium (gradients, rounded corners, subtle shadows).
    6. Do not include imports for local components unless they are standard shadcn/ui ones you assume exist (like Button, Input).
    7. If you use standard UI components, assume they are at '@/components/ui/*'.
    8. The component must be exported as default.
    `,
      messages: [
        { role: 'user', content: prompt }
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating component:', error);
    return { success: false, error: 'Failed to generate component' };
  }
}
