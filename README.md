
# UCC Mindcare

UCC Mindcare is a Nuxt 3-based mental health support app for Cape Coast University students. It features AI chat, mood tracking, resource library, self-assessment tools, guided relaxation, and emergency support. Authentication uses Google Auth; AI responses use Google Gemini API.


## Features

- AI-powered mental health chat
- Mood tracking and reminders
- Resource library (articles, videos, audio)
- Emergency support links
- Guided relaxation (meditation, breathing)
- Self-assessment tools


## Tech Stack

- Nuxt 3 (Vue.js)
- Google OAuth
- Google Gemini API
- Vue 3 Composition API
- Tailwind CSS

## Installation

1. Install [Node.js](https://nodejs.org/) (v16+ recommended)
2. Clone the repo:
  ```sh
  git clone https://github.com/your-username/ucc-mindcare.git
  cd ucc-mindcare
  yarn install
  ```
3. Add a `.env` file:
  ```env
  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_GEMINI_API_KEY=your_gemini_api_key
  ```
4. Run:
  ```sh
  yarn dev
  ```
  App runs at http://localhost:3000


## Usage

Sign in with Google, chat with the AI, track your mood, explore resources, and use emergency links as needed.


## Folder Structure

```sh
uccmindcare/
├── public/                  # Static public assets (favicon, etc.)
├── screenshots/             # App screenshots and demo videos
├── src/
│   ├── app.vue              # Main app entry
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css     # Global styles
│   │   └── icons/           # SVGs and icon components
│   ├── components/
│   │   ├── chatbot/         # Chatbot-related components
│   │   ├── common/          # Shared UI components
│   ├── constants/           # Static values and configs
│   ├── layouts/             # App layout wrappers
│   ├── pages/
│   │   ├── index.vue        # Home page
│   │   └── auth/            # Auth pages (Google Auth)
│   ├── prompts/             # Chatbot prompt logic
│   └── utils/               # Utility functions
├── eslint.config.js         # ESLint configuration
├── meta.ts                  # Meta info
├── nuxt.config.ts           # Nuxt config
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
├── tailwind.config.js       # Tailwind CSS config
├── tsconfig.json            # TypeScript config
├── yarn-error.log           # Yarn error log
```


## Deployment

Deploy on Vercel, Netlify, or any Node.js-compatible hosting.

## Contributing

Contributions are welcome. Submit a PR or open an issue.

## License

MIT License
