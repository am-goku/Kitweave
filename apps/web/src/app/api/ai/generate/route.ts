import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const system_rules = `You are a precision React code generator. ` +
  `Your only job is to output pure, valid, executable TSX code — nothing else.\n\n` +
  `CRITICAL RULES - OBEY EXACTLY:\n` +
  `- NEVER wrap code in \`\`\`tsx or \`\`\` or any markdown\n` +
  `- NEVER add explanations, comments, or text outside the code\n` +
  `- NEVER add any non-code text\n` +
  `- NEVER say "Here is the component" or "Sure!" or anything\n` +
  `- NEVER provide multiple options or multiple components\n` +
  `- Output ONLY the raw TSX starting with imports or the component directly\n` +
  `- Must end with \`export default ComponentName\`\n` +
  `- The component should be default export\n` +
  `- Use lucide-react icons, shadcn/ui components from '@/components/ui/*'\n` +
  `- Make it beautiful with Tailwind: gradients, glassmorphism, smooth shadows, rounded-xl\n` +
  `- If animation is requested, use framer-motion\n` +
  `- You are forbidden from adding any non-code text. This is enforced.\n\n` +
  `Failure to follow these rules exactly will break the app. Output only code.`

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
      model: groq(process.env.GROQ_MODEL as string), // This model follows instructions MUCH better
      temperature: 0.3, // Lower = more deterministic
      maxOutputTokens: 4096,
      system: system_rules,
      messages: [{ role: 'user', content: system_rules + "\n\n" + prompt }],
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Error generating component:', error);
    return { success: false, error: 'Failed to generate component' };
  }
}
