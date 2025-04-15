
FROM r-base:4.3.1

RUN apt-get update && apt-get install -y \
    build-essential \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libpng-dev \
    libjpeg-dev \
    libcairo2-dev \
    libxt-dev \
    libgl1-mesa-dev \
    libglu1-mesa-dev \
    libx11-dev \
    pandoc \
    && rm -rf /var/lib/apt/lists/*

RUN R -e "install.packages(c('ggplot2', 'plotly', 'rgl', 'png', 'kaleido'), repos='https://cloud.r-project.org')"


WORKDIR /app
