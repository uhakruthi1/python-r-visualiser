import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { BsSun, BsMoon } from "react-icons/bs";
import './App.css';

const App = () => {
  const [code, setCode] = useState("# Write your Python or R code here to generate a plot");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const [imageUrl, setImageUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
  
    document.documentElement.setAttribute('data-bs-theme', theme === "vs-dark" ? "dark" : "light");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "vs-dark" ? "vs-light" : "vs-dark";
    setTheme(newTheme);
  };

  const sendCodeToBackend = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/run-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, code }),
      });

      const result = await response.json();
      if (response.ok && result.imageUrl) {
        setImageUrl(result.imageUrl);
        setModalOpen(true); 
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      alert("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);  
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Let's turn your code into a plot</h1>

    
      <div className="header">
        <div className="language-buttons">
        <button
  onClick={() => setLanguage("python")}
  className={`button-code ${language === "python" ? "active" : ""}`}
  title="Python"
>
  <img src={`${process.env.PUBLIC_URL}/python.png`} alt="Python" width={20} />
</button>

<button
  onClick={() => setLanguage("r")}
  className={`button-code ${language === "r" ? "active" : ""}`}
  title="R"
>
  <img src={`${process.env.PUBLIC_URL}/r.png`} alt="R" width={20} />
</button>

        </div>

  
        <button onClick={toggleTheme} className="btn btn-light theme-toggle">
          {theme === "vs-dark" ? <BsMoon /> : <BsSun />}
        </button>
      </div>

   
      <div className={`monaco-editor-container ${theme === "vs-dark" ? "dark" : "light"}`}>
        <MonacoEditor
          language={language}
          theme={theme}  
          value={code}
          options={{
            selectOnLineNumbers: true,
            formatOnType: true,
            formatOnPaste: true,
            tabSize: 4,
            insertSpaces: true,
            automaticLayout: true,
          }}
          onChange={(newCode) => setCode(newCode)}
          height="700px"
        />
      </div>


      <div className="text-center mt-4">
  <button
    onClick={sendCodeToBackend}
    className="generate-button"
    disabled={loading}
  >
    {loading ? "Generating..." : "Generate Plot"}
  </button>
</div>


      {modalOpen && (
  <div className="modal" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <span className="modal-close" onClick={closeModal}>&times;</span>

      {imageUrl.includes(".html") ? (
        <iframe
          src={imageUrl}
        />
      ) : (
        <img src={imageUrl} alt="Generated Plot" className="modal-img" />
      )}

      <button
        onClick={() => window.location.href = imageUrl}
        className="modal-button"
      >
        Download Plot
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default App;
