# 🔍 Google Dork Toolkit

A powerful, modern web application for advanced Google search queries (Google Dorking) with an intuitive interface and comprehensive dork templates for cybersecurity research, OSINT investigations, and educational purposes.

![Google Dork Toolkit](https://img.shields.io/badge/React-18.x-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎯 Core Functionality
- **Advanced Search Interface** - Clean, modern UI for crafting Google dork queries
- **500+ Dork Templates** - Pre-built queries across 15+ categories
- **Real-time Query Building** - Dynamic query construction with live preview
- **Custom Query Support** - Create and save your own dork patterns

### 🛡️ Security & Intelligence Categories
- **Vulnerability Assessment** - Find exposed files, directories, and configurations
- **Social Media Intelligence** - Discover social profiles and public information
- **Government & Military Files** - Locate public government documents
- **Financial Information** - Find exposed financial data and reports
- **Medical Records** - Discover publicly accessible medical information
- **Academic Research** - Access research papers and academic resources
- **Legal Documents** - Find court records and legal filings
- **Technical Documentation** - Locate API docs, manuals, and technical guides

### 🎨 User Experience
- **Dark/Light Mode** - Toggle between themes
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Glassmorphism UI** - Modern, elegant interface design
- **Floating Animations** - Subtle particle effects and smooth transitions
- **Risk Assessment** - Color-coded risk levels for each dork template

### 🔧 Advanced Features
- **Batch Query Processing** - Run multiple queries simultaneously
- **Query History** - Track and revisit previous searches
- **Export/Import** - Save and share query collections
- **Targeting Parameters** - Filter by location, username, and more
- **Complexity Indicators** - Understand query difficulty levels

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GarvitOfficial/google-dork-toolkit.git
   cd google-dork-toolkit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Production Build
```bash
npm run build
npm run preview
```

## 📖 Usage Guide

### Basic Usage
1. **Select a Category** - Choose from vulnerability assessment, social media intelligence, etc.
2. **Pick a Template** - Browse pre-built dork queries with risk indicators
3. **Customize Parameters** - Add targeting information (username, location, etc.)
4. **Execute Search** - Click "Search Google" to run the query
5. **Copy & Share** - Use the copy button to save queries for later

### Advanced Features
- **Custom Queries** - Use the custom query input for your own dork patterns
- **Batch Processing** - Add multiple queries to batch and run them together
- **History Tracking** - Review your search history and repeat successful queries
- **Export Data** - Save your query collections as JSON files

### Risk Levels
- 🟢 **Low Risk** - Safe, general-purpose queries
- 🟡 **Medium Risk** - Queries that may find sensitive but public information
- 🔴 **High Risk** - Advanced queries that may locate highly sensitive data

## 🛡️ Ethical Usage & Disclaimer

### ⚠️ Important Notice
This tool is designed for **educational and legitimate security research purposes only**. Users must:

- ✅ Only use on systems you own or have explicit permission to test
- ✅ Respect website terms of service and robots.txt files
- ✅ Follow responsible disclosure practices for any vulnerabilities found
- ✅ Comply with local laws and regulations regarding information gathering

### 🚫 Prohibited Uses
- ❌ Unauthorized access to systems or data
- ❌ Malicious activities or illegal information gathering
- ❌ Violating privacy rights or terms of service
- ❌ Any activity that could harm individuals or organizations

## 🏗️ Technical Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **Build Tool**: Vite for fast development and building
- **Icons**: Heroicons for consistent iconography
- **State Management**: React hooks and local storage
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 📁 Project Structure

```
google-dork-toolkit/
├── src/
│   ├── components/
│   │   └── GoogleDorkingTool.tsx    # Main application component
│   ├── data/
│   │   └── dorkTemplates.ts         # Dork query templates and categories
│   ├── types/
│   │   └── QueryHistory.ts          # TypeScript type definitions
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   └── index.css                    # Global styles and animations
├── public/
│   └── favicon.svg                  # Application icon
└── package.json                     # Dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google for providing the search platform that makes this tool possible
- The cybersecurity and OSINT communities for sharing knowledge about Google dorking techniques
- Open source contributors who make projects like this possible

## 📞 Support

If you encounter any issues or have questions:
- 🐛 [Report bugs](https://github.com/GarvitOfficial/google-dork-toolkit/issues)
- 💡 [Request features](https://github.com/GarvitOfficial/google-dork-toolkit/issues)


---

**⭐ Star this repository if you find it helpful!**

*Remember: With great power comes great responsibility. Use this tool ethically and responsibly.*
