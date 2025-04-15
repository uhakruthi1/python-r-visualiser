const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5001;


app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
}));


app.use(bodyParser.json());

app.use((req, res, next) => {
 next();
});
app.use('/static/outputs', express.static(path.join(__dirname, 'static', 'outputs'), {
  setHeaders: (res, path) => {
    res.setHeader("Cache-Control", "no-store"); 
  }
}));


app.post("/run-code", (req, res) => {
  const { language, code } = req.body;
  if (!language || !code) {
    return res.status(400).json({ error: "Language and code are required." });
  }

  console.log("Code execution requested for:", language);

  if (language === "python") {
    runPythonCode(code, res);
    // console.log(res)
  } else if (language === "r") {
    runRCode(code, res);
  } else {
    res.status(400).json({ error: "Unsupported language" });
  }
});


function runPythonCode(code, res) {
  console.log("Running Python code...");

  const filePath = path.join(__dirname, "temp.py"); 
  const outputDir = path.join(__dirname, "static", "outputs"); 
  const imageFilename = "plot.png";
  const imageFilePath = path.join(outputDir, imageFilename);


  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

 
  const outputFile = path.join("static", "outputs", imageFilename); 
  const updatedCode = code.replace("__OUTPUT__", outputFile);

  console.log(updatedCode)
  fs.writeFile(filePath, updatedCode, (err) => {
    if (err) {
      console.error("Error writing Python code to file:", err);
      return res.status(500).json({ error: "Failed to save Python code." });
    }

   
    const dockerCmd = `docker run --rm -v ${__dirname}:/workspace -w /workspace python-env python3 temp.py`;

    exec(dockerCmd, (err, stdout, stderr) => {
      console.log("Python execution started...");
      if (err || stderr) {
        console.error("Execution error:", err || stderr);
        return res.status(500).json({ error: err || stderr || "Error executing Python code." });
      }

      if (fs.existsSync(imageFilePath)) {
        const imageUrl = `http://localhost:5001/static/outputs/plot.png?t=${Date.now()}`;
        console.log("Image URL:", imageUrl);
        return res.json({ imageUrl });
      } else {
        return res.status(500).json({ error: "Plot image was not generated." });
      }
    });
  });
}






function runRCode(code, res) {
  console.log("Running R code...");

  const filePath = path.join(__dirname, "temp.R");
  const outputDir = path.join(__dirname, "static", "outputs");

 
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const extensionMatch = code.match(/__OUTPUT__.*\.(png|html)/i);
  const ext = extensionMatch ? extensionMatch[1].toLowerCase() : "png";

  const imageFilename = `plot.${ext}`;

  const outputFile = path.join("static", "outputs"); 
 
  const updatedCode = code.replace("__OUTPUT__",outputFile +'/plot');
  console.log(updatedCode)
  fs.writeFile(filePath, updatedCode, (err) => {
    if (err) {
      console.error("Error writing R code to file:", err);
      return res.status(500).json({ error: "Failed to save R code." });
    }
    console.log(__dirname)
    const dockerCmd = `docker run --rm -v ${__dirname}:/workspace -w /workspace r-env Rscript temp.R`;
   

    exec(dockerCmd, (err, stdout, stderr) => {
      console.log("R execution started...");
      console.log("stdout:", stdout);
      console.log("stderr:", stderr); 
    
      if (err) {
        console.error("Execution error:", err);
        return res.status(500).json({ error: err.message });
      }
    
      if (fs.existsSync(outputFile)) {
        const fileUrl = `http://localhost:5001/static/outputs/${imageFilename}?t=${Date.now()}`;
        console.log("Generated file URL:", fileUrl);
        return res.json({ imageUrl: fileUrl, type: ext });
      } else {
        return res.status(500).json({ error: `Output file (.${ext}) was not generated.` });
      }
    });
    
  });
}



app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
