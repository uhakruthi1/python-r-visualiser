🧠 Code-to-Plot Visualizer :

      -- A full-stack web application where users can write and execute Python or R code to generate visual plots — right in the browser! Supports light/dark themes, inline Monaco Editor, 
        and dynamic rendering of plots via Docker containers.

✨ Features

      -- Code editor powered by Monaco (like VS Code)
      -- Supports both Python and R
      -- Plots rendered and returned from backend securely using Docker
      -- Toggle between dark/light themes
      -- Download or view generated plots (PNG/HTML)
      -- Isolated code execution in containers (Python & R environments)

🧰 Tech Stack

      -- Frontend	: React, Monaco Editor, Bootstrap
      -- Backend	: Node.js, Express
      -- Plot Engine : Python (matplotlib), R (ggplot2, etc.)
      -- Container	: Docker

⚙️ Installation & Setup 

      -- Make sure you have Docker, Node.js, and npm installed.
      1. Clone the Repository :
            git clone https://github.com/uhakruthi1/python-r-visualiser.git
            cd python-r-visualiser
            
      2. Start Backend:
            cd cns_backend
            npm install
            node index.js
        -- Ensure Docker is running, as the backend will spin up containers like python-env and r-env.
            
      3. Start Frontend:
          cd ../cns_frontend
          npm install
          npm start

🚀 How It Works

      1. Frontend (cns_frontend)
        -- Built with React.
        -- Includes Monaco Editor for writing Python/R code.
        -- User selects a language, writes code, and clicks "Generate Plot".
        -- Sends the code via API to backend.
        -- Displays image or HTML plot response in a modal with download option.
      
      2. Backend (cns_backend)
        -- Node.js server using Express.
        -- Accepts language and code via POST /run-code.
        -- Saves code into a temp file (e.g., temp.py or temp.R).
        -- Executes code using Dockerized environments: python-env for Python , r-env for R.
        -- Generated plot is saved to /static/outputs/
        -- Responds with a public image URL to frontend.
  
🐳 Docker Images

        -- python-env: Includes Python 3 + matplotlib.
        -- r-env: Includes R + ggplot2 + relevant plotting libraries.

✅ Tips

        -- Always keep the placeholder __OUTPUT__ without the extension in R if you're adding .png or .html manually.
        -- In Python, just keep the full "__OUTPUT__" and append .png/.html in the backend when replacing it.

![Alt Image text](<assets/Screenshot 2025-04-15 at 1.50.07 PM.png> "Optional Title")


📬 Contact
Made with ❤️ by uhakruthi1





