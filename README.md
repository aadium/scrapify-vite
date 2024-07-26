# Web Scraping App with React and Vite

This project is a web scraping application built using React.js with Vite, designed to scrape data from URLs specified by the user. It leverages modern web technologies to provide a seamless and efficient scraping experience. Additionally, the app includes AI-driven features such as summarization, categorization, and sentiment analysis to enhance the data processing capabilities. Users can view the scraped data on a separate output page and download it in JSON, CSV, or XML formats.

## Features

- **Web Scraping**: Input a URL and selectors to scrape data from web pages.
- **AI-Driven Analysis**: Perform summarization, categorization, and sentiment analysis on the scraped data.
- **Data Export**: Download the output in JSON, CSV, or XML formats.
- **Output Page**: View the scraped and processed data on a separate output page.
- **Modern Tech Stack**: Built with React.js and Vite for fast development and HMR (Hot Module Replacement).

## Demo
https://github.com/user-attachments/assets/69e662b8-e656-4904-8f29-ca7e534c17ce

![ai](./src/assets/ai_features.gif)

## Getting Started

### Prerequisites

- Node.js (18 or above)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/aadium/scrapify-vite.git
    ```
2. Navigate to the project directory
    ```bash
    cd scrapify-vite
    ```
3. Install dependencies
    ```bash
    npm install
    # or
    yarn install
    ```
4. Go to this website: [GroqCloud](https://console.groq.com/playground). Create an account there, and then generate an API key. Create a <code>.env</code> file in the root directory, create an environment variable named <code>VITE_GROQ_API</code>, and add that API key as the value. Also, create another variable named <code>VITE_API_URL</code>, and enter this as the value: [https://web-scraping-demo-8p7f.onrender.com](https://web-scraping-demo-8p7f.onrender.com).
5. Start the development server
    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated. Check the [CONTRIBUTING](CONTRIBUTING.md) file for more details
1. Create an issue explaining your intended changes and wait till you are assigned the issue, or request to be assigned to an existing issue.
2. Fork the Project
3. Create your own branch (<code>git checkout -b feature/AmazingFeature</code>)
4. Commit your changes (<code>git commit -m 'your-message'</code>)
5. Push the commits to the reote branch (<code>git push origin feature/AmazingFeature</code>)

### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
