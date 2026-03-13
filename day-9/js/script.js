// ================== SETTINGS ==================
// let GEMINI_API_KEY = localStorage.getItem('geminiKey') || '';
// const GEMINI_MODEL = "gemini-1.5-flash"; // or gemini-1.5-flash-8b / gemini-2.0-flash
// const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=`;

// ================== GEMINI API SETTINGS ==================
let GEMINI_API_KEY = localStorage.getItem('geminiKey') || '';

// Use a current model (March 2026)
const GEMINI_MODEL = "gemini-2.5-flash";   // ← changed here
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=`;

// Strong system prompt (very important!)
const SYSTEM_PROMPT = `You are PureVeda – expert in Indian food purity, Ayurveda & modern nutrition.
For ANY food asked (ghee, milk, haldi, kesar, oils, salt, etc.):
• Give 4–6 practical home purity / adulteration tests
• Main nutrients & what they do
• Key health benefits (Ayurvedic + scientific)
• Best storage method
Use friendly Hindi-English mix, emojis, bold important parts, bullet lists.
Be accurate, helpful and short-to-medium length.`;

function saveGeminiKey() {
  const input = document.getElementById('gemini-key');
  const status = document.getElementById('key-status');
  
  GEMINI_API_KEY = input.value.trim();
  if (GEMINI_API_KEY.startsWith('AIza')) {
    localStorage.setItem('geminiKey', GEMINI_API_KEY);
    status.innerHTML = '✅ Key saved! Now chat is AI powered.';
    status.className = 'text-xs mt-2 text-green-600 font-medium';
  } else {
    status.innerHTML = '❌ Wrong format. Paste valid Gemini key.';
    status.className = 'text-xs mt-2 text-red-600 font-medium';
  }
}

// ================== FOOD DATABASE (your original + more) ==================
const foodDatabase = { /* keep exactly your foodDatabase object here – I will not repeat 300 lines */ };

// ================== CREATE FOOD CARDS (your code + better fallback emoji) ==================
function createFoodCards() {
  const container = document.getElementById('food-cards');
  container.innerHTML = '';

  const emojiMap = {
    ghee: '🧈',
    milk: '🥛',
    butter: '🧈',
    honey: '🍯',
    turmeric: '🫚',
    jaggery: '🧱',
    rock_salt: '🧂',
    sesame_oil: '🛢️',
    desi_cow_milk_ghee: '🐄🧈',
    default: '🥄'
  };

  Object.keys(foodDatabase).forEach(key => {
    const food = foodDatabase[key];
    const emoji = emojiMap[key] || emojiMap.default;

    const card = document.createElement('div');
    card.className = `food-card bg-white border border-emerald-100 rounded-3xl p-4 cursor-pointer hover:border-emerald-400 transition-all duration-300 shadow-sm hover:shadow-md`;

    card.innerHTML = `
      <div class="flex gap-3 items-center">
        <div class="w-10 h-10 bg-emerald-50 text-3xl flex items-center justify-center rounded-2xl">
          ${emoji}
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-emerald-800 capitalize">${food.title}</h3>
          <p class="text-xs text-emerald-600 line-clamp-2">${food.desc}</p>
        </div>
      </div>
    `;

    card.onclick = () => sendMessageWithPrompt(`Tell me complete purity details, home tests, nutrition & benefits of ${food.title}`);
    container.appendChild(card);
  });
}

// ================== CHAT FUNCTIONS ==================
function addMessage(text, isBot = false) {
  const chat = document.getElementById('chat-window');
  const div = document.createElement('div');
  div.className = `flex ${isBot ? 'justify-start' : 'justify-end'} message`;

  if (isBot) {
    div.innerHTML = `
      <div class="max-w-[82%]">
        <div class="flex items-center gap-2 mb-1">
          <div class="w-8 h-8 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl">🧪</div>
          <span class="text-xs font-medium text-emerald-700">PureVeda AI</span>
        </div>
        <div class="bot-bubble px-5 py-3 text-sm leading-relaxed prose prose-sm">${text}</div>
      </div>`;
  } else {
    div.innerHTML = `<div class="max-w-[78%] user-bubble px-5 py-3 text-sm">${text}</div>`;
  }

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function showTyping() {
  const chat = document.getElementById('chat-window');
  const div = document.createElement('div');
  div.id = 'typing';
  div.className = 'flex justify-start message';
  div.innerHTML = `
    <div class="max-w-[82%]">
      <div class="flex items-center gap-2 mb-1">
        <div class="w-8 h-8 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl">🧪</div>
      </div>
      <div class="bot-bubble px-5 py-3">
        <div class="typing flex gap-1"><span></span><span></span><span></span></div>
      </div>
    </div>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

async function callGemini(prompt) {
  if (!GEMINI_API_KEY) {
    return "Please paste your Gemini API key in the sidebar first (free from aistudio.google.com)";
  }

  try {
    const res = await fetch(GEMINI_URL + GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
      })
    });

    if (!res.ok) {
      const err = await res.json();
      return "Error: " + (err.error?.message || "API problem – check key or internet");
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No answer received";
  } catch (e) {
    return "Connection failed: " + e.message + "\n\nCheck internet or API key";
  }
}

// ================== SEND MESSAGE ==================
async function sendMessage() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, false);
  input.value = '';

  const typingElement = showTyping();

  const reply = await callGemini(text);
  typingElement.remove();
  addMessage(reply, true);
}

async function sendMessageWithPrompt(prompt) {
  addMessage(prompt, false);
  const typingElement = showTyping();
  const reply = await callGemini(prompt);
  typingElement.remove();
  addMessage(reply, true);
}

function clearChat() {
  document.getElementById('chat-window').innerHTML = '';
  addMessage("Namaste! 🥛<br>Ask me anything about food purity, tests, nutrition…", true);
}

// ================== START ==================
document.addEventListener('DOMContentLoaded', () => {
  createFoodCards();

  // Welcome
  addMessage(`Namaste Manish! 🧪<br>Welcome to PureVeda.<br>Paste Gemini API key in sidebar to make me super smart.<br>Or just ask about ghee, milk, haldi…`, true);

  document.getElementById('user-input').addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
  });
});