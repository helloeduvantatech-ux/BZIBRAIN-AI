import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI client with standard aistudio-build telemetry
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'EduVanta BizBrain AI API',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// AI Advisor Endpoint
app.post('/api/ai/advise', async (req, res) => {
  try {
    const { query, businessName, category, metrics } = req.body;

    if (!aiClient || !process.env.GEMINI_API_KEY) {
      // Return structured fallback if no key provided
      return res.json({
        insight: `Performance review for ${businessName}: gross sales ₹${(metrics?.totalSalesRev || 0).toLocaleString('en-IN')}.`,
        evidence: `Analyzed ${metrics?.totalSalesCount || 0} sales transactions and ${metrics?.lowStockCount || 0} low stock items.`,
        possibleReason: `Normal seasonal purchase velocity in ${category} retail.`,
        recommendedAction: `Restock fast-moving lines and monitor inventory thresholds.`
      });
    }

    const systemPrompt = `You are BizBrain AI, the intelligent business co-pilot by EduVantaTech for Indian SMEs.
You must analyze the business data provided and respond STRICTLY in JSON format with exactly four keys:
{
  "insight": "Clear, concise observation supported strictly by numbers",
  "evidence": "Concrete metrics, units sold, or rupee amounts proving the insight",
  "possibleReason": "Likely commercial or operational explanation",
  "recommendedAction": "Direct, practical business action step for the owner"
}
Rules:
1. Never fabricate numbers. Only use the provided data.
2. Currency is in INR (₹).
3. Do not make disclaimers or pretend to be a lawyer or certified accountant.
4. Keep the answer direct, business-focused, and concise.`;

    const userPrompt = `Business Name: ${businessName}
Category: ${category}
User Question: "${query}"

Live Business Metrics:
- Total Sales Revenue: ₹${metrics?.totalSalesRev}
- Total Sales Invoices: ${metrics?.totalSalesCount}
- Total Expenses: ₹${metrics?.totalExpAmt}
- Estimated Profit: ₹${metrics?.estProfit}
- Top Product: ${metrics?.topProduct} (${metrics?.topProductUnits} units)
- Low Stock Items Count: ${metrics?.lowStockCount}
- Low Stock List: ${JSON.stringify(metrics?.lowStockItems || [])}
- Recent Logged Expenses: ${JSON.stringify(metrics?.recentExpenses || [])}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch {
      return res.json({
        insight: `Analysis for ${businessName}: ${query}`,
        evidence: text.slice(0, 300),
        possibleReason: 'Extracted from live store performance data.',
        recommendedAction: 'Review inventory and daily cash flows.'
      });
    }
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: 'Failed to query BizBrain AI',
      message: error?.message || 'Unknown error'
    });
  }
});

// Vite Middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`EduVanta BizBrain AI server listening on port ${PORT}`);
  });
}

startServer();
