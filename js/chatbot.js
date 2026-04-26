const qa = [
  {
    patterns: ['skill', 'know', 'can you', 'technology', 'tech', 'programm', 'kompetens', 'kan du', 'teknik'],
    en: "Ahmad's skills span several areas — Programming: Python, Java, SQL, Flutter. OS & Software: Microsoft 365, Windows configuration. Networking & Security: network setup and troubleshooting, security fundamentals. Hardware: IT equipment preparation and maintenance. Soft skills: communication, organization, time management, teamwork.",
    sv: "Ahmads kompetenser sträcker sig över flera områden — Programmering: Python, Java, SQL, Flutter. OS & Programvara: Microsoft 365, Windows. Nätverk & Säkerhet: nätverkskonfiguration och felsökning, säkerhetsgrunder. Hårdvara: förberedelse och underhåll av IT-utrustning. Mjuka färdigheter: kommunikation, organisation, tidshantering, lagarbete."
  },
  {
    patterns: ['education', 'study', 'degree', 'university', 'school', 'utbildning', 'studer', 'examen', 'universitet'],
    en: "Ahmad holds a Bachelor's in Software Engineering (Computer Science) from Linnéuniversitetet, Växjö. He also completed the International Baccalaureate at Haganässkolan, Älmhult.",
    sv: "Ahmad har en kandidatexamen i Mjukvaruteknik (Datateknik) från Linnéuniversitetet i Växjö, samt ett IB-diplom från Haganässkolan i Älmhult."
  },
  {
    patterns: ['experience', 'work', 'job', 'erfarenhet', 'arbete', 'jobbat', 'anställ'],
    en: "Ahmad has two work backgrounds: IT Support Technician at Atea AB, Växjö (Feb 2023 – Aug 2023), handling Windows installations, IT equipment, ticket management, and end-user support. He also worked as a Care Assistant (2022–2026) across Hässleholms kommun, Humana AB, and Eslövs kommun — demonstrating strong responsibility and flexibility.",
    sv: "Ahmad har två arbetslivsbakgrunder: IT-supporttekniker på Atea AB i Växjö (feb 2023 – aug 2023) med Windows-installationer, IT-utrustning, ärendehantering och slutanvändarsupport. Han har även arbetat som vårdbiträde (2022–2026) inom Hässleholms kommun, Humana AB och Eslövs kommun — vilket visar starkt ansvarstagande och flexibilitet."
  },
  {
    patterns: ['certif', 'ccna', 'md-102', 'cisco', 'microsoft', 'endpoint'],
    en: "Ahmad is currently working toward two certifications: MD-102 (Endpoint Administrator) and CCNA (Cisco Certified Network Associate).",
    sv: "Ahmad arbetar just nu mot två certifieringar: MD-102 (Endpoint Administrator) och CCNA (Cisco Certified Network Associate)."
  },
  {
    patterns: ['language', 'speak', 'arabic', 'swedish', 'english', 'språk', 'talar', 'arabiska', 'svenska', 'engelska'],
    en: "Ahmad speaks Arabic (native), English (fluent), and Swedish (fluent).",
    sv: "Ahmad talar arabiska (modersmål), engelska (flytande) och svenska (flytande)."
  },
  {
    patterns: ['contact', 'email', 'reach', 'phone', 'kontakt', 'mejl', 'telefon', 'nå'],
    en: "You can reach Ahmad at unisweden@gmail.com or +46 707 849 402.",
    sv: "Du når Ahmad på unisweden@gmail.com eller +46 707 849 402."
  },
  {
    patterns: ['available', 'hire', 'open', 'looking', 'job', 'position', 'tillgänglig', 'anställa', 'söker', 'ledig'],
    en: "Yes! Ahmad is actively looking for opportunities in IT, cybersecurity, or software development. Feel free to reach out.",
    sv: "Ja! Ahmad söker aktivt möjligheter inom IT, cybersäkerhet eller mjukvaruutveckling. Hör gärna av dig."
  },
  {
    patterns: ['project', 'built', 'portfolio', 'github', 'projekt', 'byggt'],
    en: "Ahmad has built several projects during his studies. Check the Projects section on the site for details, with more being added soon.",
    sv: "Ahmad har byggt flera projekt under sin utbildning. Se projektsektionen på sidan för detaljer — fler tillkommer snart."
  },
  {
    patterns: ['cybersecurity', 'security', 'säkerhet', 'cyber'],
    en: "Cybersecurity is Ahmad's passion. He's pursuing CCNA and has studied networking and security fundamentals as part of his CS degree.",
    sv: "Cybersäkerhet är Ahmads passion. Han arbetar mot CCNA-certifieringen och har studerat nätverks- och säkerhetsgrunder inom sin examen."
  },
  {
    patterns: ['hello', 'hi', 'hey', 'hej', 'hallo', 'tjena'],
    en: "Hi there! I'm Ahmad's assistant. Ask me about his skills, education, experience, or how to contact him.",
    sv: "Hej! Jag är Ahmads assistent. Fråga mig om hans kompetenser, utbildning, erfarenhet eller hur du kontaktar honom."
  },
];

const fallback = {
  en: "I'm not sure about that. Try asking about Ahmad's skills, education, experience, or contact info.",
  sv: "Det vet jag inte riktigt. Fråga gärna om Ahmads kompetenser, utbildning, erfarenhet eller kontaktuppgifter."
};

function getBotReply(input) {
  const text = input.toLowerCase();
  const lang = typeof i18n !== 'undefined' ? i18n.current() : 'en';
  const match = qa.find(item => item.patterns.some(p => text.includes(p)));
  return match ? match[lang] : fallback[lang];
}

/* ===== UI ===== */
const chatWindow   = document.getElementById('chat-window');
const chatFab      = document.getElementById('chat-fab');
const closeChat    = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatInput    = document.getElementById('chat-input');
const chatSend     = document.getElementById('chat-send');
const openChatBtn  = document.getElementById('open-chat');
const chatToggle   = document.getElementById('chat-toggle');

let welcomed = false;

function addMsg(text, who) {
  const div = document.createElement('div');
  div.className = `chat-msg ${who}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function openChat() {
  chatWindow?.classList.add('open');
  if (!welcomed) {
    const lang = typeof i18n !== 'undefined' ? i18n.current() : 'en';
    setTimeout(() => addMsg(translations[lang]?.['chat.welcome'] || 'Hi! Ask me about Ahmad.', 'bot'), 300);
    welcomed = true;
  }
  chatInput?.focus();
}

function closeWindow() { chatWindow?.classList.remove('open'); }

function send() {
  const val = chatInput?.value.trim();
  if (!val) return;
  addMsg(val, 'user');
  chatInput.value = '';
  setTimeout(() => addMsg(getBotReply(val), 'bot'), 400);
}

chatFab?.addEventListener('click', () => chatWindow?.classList.contains('open') ? closeWindow() : openChat());
closeChat?.addEventListener('click', closeWindow);
openChatBtn?.addEventListener('click', openChat);
chatToggle?.addEventListener('click', openChat);
chatSend?.addEventListener('click', send);
chatInput?.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
