# HuggingFace ML Dojo

## Overview
**HuggingFace ML Dojo** is an interactive, standalone single-file React web application designed to help developers transition from standard Python programming into the world of Machine Learning. The platform focuses specifically on the Hugging Face ecosystem, providing a structured, "zero-to-hero" self-study path through six critical topics, ranging from basic tokenization to advanced diffusion models.

## Key Features
- **6 Comprehensive Modules**: Covers Tokenization, Inference Pipelines, Sequential Models (LSTMs), Transformer Internals, Fine-tuning, and Diffusion.
- **Interactive 3-Section Learning**: Each topic follows a strict "Concept → Quiz → Colab" workflow.
- **Under-the-Hood Explanations**: Technical deep-dives that go beyond surface-level API usage to explain the math and architecture (e.g., Attention mechanisms, Diffusion noise).
- **Hardcoded Grounding**: All content, code snippets, and constructor signatures are verified against official Hugging Face documentation.
- **Progress Tracking**: Sidebar completion badges (✅) are awarded upon passing module-specific quizzes (≥ 3/4 correct).
- **Curated Hands-on Tasks**: Direct links to official Google Colab notebooks for practical experimentation.

## Technology Stack
- **Core**: React 19 (Hooks-based state management)
- **Styling**: Tailwind CSS v4 (with `@tailwindcss/vite` plugin)
- **Build Tool**: Vite 8
- **UI Architecture**: Single-file application (`App.jsx`) with a responsive sidebar and dark-themed interface.

## Getting Started

### Prerequisites
- **Node.js**: version 18 or higher
- **npm**: version 9 or higher

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd huggingface-ml-dojo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Project Locally
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Usage
The application is designed for free-roam navigation:
1. **Select a Topic**: Use the sidebar to pick any of the 6 ML modules.
2. **Review the Concept**: Read the "Under the Hood" breakdown and study the provided Python code snippets.
3. **Take the Quiz**: Test your understanding. Passing the quiz marks the topic as "Complete" in the sidebar.
4. **Complete the Colab**: Click the "Open in Google Colab" button to run the task in a live environment. Use the "What to look for" checklist to guide your session.

## Project Structure
- `src/App.jsx` – **Central Source**: Contains the entire application logic, UI components, and the hardcoded ML curriculum data.
- `src/index.css` – **Styles**: Entry point for Tailwind CSS v4 and global theme overrides.
- `vite.config.js` – **Configuration**: Vite build settings integrated with the Tailwind v4 plugin.
- `public/` – Static assets and icons.
- `package.json` – Project dependencies and scripts.
