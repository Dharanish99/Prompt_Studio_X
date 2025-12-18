# 🚀 Prompt Studio X

A powerful MERN stack application for AI prompt engineering and enhancement. Transform basic prompts into professional, structured inputs for ChatGPT, DALL-E, Midjourney, and other AI models.

## ✨ Features

- **Text Prompt Enhancement**: Generate logical, creative, and optimized variations
- **Image Prompt Engineering**: Specialized enhancement for visual AI models
- **Template Gallery**: Browse and remix pre-built prompt templates
- **History Tracking**: Save and manage your enhanced prompts
- **OAuth Authentication**: Secure login with Google and GitHub
- **Cross-Platform**: Responsive design for desktop and mobile

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with Mongoose
- **Passport.js** for OAuth authentication
- **Groq API** for AI processing
- **Session-based** authentication with secure cookies

### Frontend
- **React.js** with modern hooks
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for API communication
- **Context API** for state management

## 🚀 Deployment

### Prerequisites
1. MongoDB Atlas account
2. Google OAuth credentials
3. GitHub OAuth app
4. Groq API keys
5. Gmail app password (for email features)

### Backend Deployment (Render)

1. **Create Web Service** on Render
2. **Connect Repository**: `https://github.com/Dharanish99/Prompt_Studio_X.git`
3. **Set Build Command**: `cd server && npm install`
4. **Set Start Command**: `cd server && npm start`
5. **Add Environment Variables**:

```env
NODE_ENV=production
PORT=5000
SERVER_URL=https://your-backend-app.onrender.com
CLIENT_URL=https://your-frontend-app.onrender.com
FRONTEND_ORIGIN=https://your-frontend-app.onrender.com
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secure_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
SMTP_EMAIL=your_email@gmail.com
SMTP_APP_PASSWORD=your_gmail_app_password
GROQ_API_KEY=your_groq_api_key
GROQ_API_KEY_VISUALS=your_groq_visuals_key
GROQ_API_KEY_REMIX=your_groq_remix_key
GROQ_API_KEY_TEXT_AUDIT=your_groq_audit_key
GROQ_API_KEY_TEXT_ENHANCE=your_groq_enhance_key
GROQ_API_KEY_TEXT_SIMULATE=your_groq_simulate_key
```

### Frontend Deployment (Render/Netlify)

1. **Create Static Site** on Render or Netlify
2. **Connect Repository**: Same repository, different service
3. **Set Build Command**: `cd client && npm install && npm run build`
4. **Set Publish Directory**: `client/build`
5. **Add Environment Variable**:

```env
REACT_APP_API_URL=https://your-backend-app.onrender.com
```

### OAuth Configuration

#### Google OAuth Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://your-backend-app.onrender.com/auth/google/callback`

#### GitHub OAuth App
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth app
3. Set Authorization callback URL: `https://your-backend-app.onrender.com/auth/github/callback`

## 🔧 Local Development

### Backend Setup
```bash
cd server
npm install
# Create .env file with your credentials
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
# Create .env file with REACT_APP_API_URL=http://localhost:5000
npm start
```

## 📁 Project Structure

```
Prompt_Studio_X/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database & auth config
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # AI services
│   └── package.json
└── README.md
```

## 🔐 Security Features

- **Trust Proxy**: Configured for reverse proxy deployment
- **Secure Cookies**: Production-ready session management
- **CORS Protection**: Cross-origin request handling
- **Helmet Security**: HTTP security headers
- **Environment Variables**: Sensitive data protection

## 🧪 API Endpoints

### Authentication
- `GET /auth/google` - Google OAuth login
- `GET /auth/github` - GitHub OAuth login
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout user

### Prompt Enhancement
- `POST /api/text/enhance` - Enhance text prompts
- `POST /api/image-enhance/image-enhance` - Enhance image prompts
- `POST /api/text/simulate` - Simulate AI responses

### Templates & History
- `GET /api/templates` - Get template gallery
- `POST /api/templates/remix` - Remix templates
- `GET /api/history` - Get user history

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Dharanish**
- GitHub: [@Dharanish99](https://github.com/Dharanish99)
- LinkedIn: [Dharanish](https://www.linkedin.com/in/dharanish-8072346187jp)
- Email: dharanishrp@gmail.com

---

⭐ Star this repository if you find it helpful!