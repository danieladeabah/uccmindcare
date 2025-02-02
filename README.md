# UCC MindCare

UCC MindCare is a **Nuxt 3**-powered mental health support application designed
for students at Cape Coast University. The app provides AI-driven chat support,
a mood tracker, and a variety of mental health resources, including
self-assessment tools, guided relaxation, and emergency support. Authentication
is handled via **Google Auth**, and AI responses are powered by **Google Gemini
API**.

## 🚀 Features

### 🧠 AI Chatbot (UCC MindCare)

- Chat with an AI assistant specialized in mental health.
- Provides guidance on stress, anxiety, depression, and general well-being.
- Uses **Google Gemini API** to generate intelligent responses.

### 📅 Mood Tracker

- Users can input their mood along with a text note.
- Set reminders to check in on their emotional well-being.

### 📚 Resource Library

- Access to mental health articles, videos, and audio guides.
- Covers topics like **stress management, coping strategies, mindfulness**, and
  more.

### 🛟 Emergency Support

- Direct links to **UCC Counseling Services, emergency contacts, and
  helplines**.
- Provides quick access to crisis intervention.

### 🌿 Guided Relaxation

- Audio-guided meditation and breathing exercises.
- Helps users practice mindfulness and relaxation techniques.

### 📝 Self-Assessment Tools

- Users can take mental health self-assessments for **depression, anxiety,
  stress**, and more.

## 🛠️ Tech Stack

- **Framework:** Nuxt 3 (Vue.js)
- **Authentication:** Google OAuth
- **AI Integration:** Google Gemini API
- **State Management:** Vue 3 Composition API
- **Styling:** Tailwind CSS

## 📦 Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Clone the Repository

```sh
git clone https://github.com/your-username/ucc-mindcare.git
cd ucc-mindcare
```

### Install Dependencies

```sh
# yarn
yarn install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and configure the required keys:

```env
GOOGLE_CLIENT_ID=your_google_client_id
VUE_API_URL=your_gemini_api_key
```

### Run the Development Server

```sh
yarn run dev # start the development server

yarn build # build the application for production

yarn preview # locally preview production build
```

The app will be available at **http://localhost:3000**

## 📜 Usage

1. **Sign in with Google** to access features.
2. **Chat with UCC MindCare AI** to get mental health guidance.
3. **Track your mood** and set reminders.
4. **Explore the Resource Library** for videos, articles, and audio guides.
5. **Use emergency support links** if needed.

## 📄 Folder Structure

```sh
📦 ucc-mindcare
├── 📂 assets            # Images, icons, and static files
├── 📂 constants         # Static values and configurations used throughout the app
├── 📂 components        # Reusable Vue components
├── 📂 layouts           # Layout files for the app
├── 📂 pages             # Nuxt pages (routes)
├── 📂 prompts           # Predefined chatbot prompts and responses
├── 📂 utils             # Helper functions and utility methods
├── .env                # Environment variables
├── nuxt.config.ts      # Nuxt configuration
└── package.json        # Dependencies and scripts
```

## 🔥 Deployment

To deploy the app, use **Vercel, Netlify, or any Node.js-compatible hosting**.

### Deploy to Vercel

```sh
npm run build
vercel
```

### Deploy to Netlify

```sh
npm run generate
netlify deploy
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit a PR or open an issue.

## 📜 License

MIT License

---

Made with ❤️ for UCC students' mental well-being! 😊
