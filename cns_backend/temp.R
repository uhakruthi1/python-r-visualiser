# Load required libraries
library(plotly)
library(htmlwidgets)


# Generate sample data
set.seed(42)
df <- data.frame(
  x = rnorm(100),
  y = rnorm(100),
  z = rnorm(100),
  color = rnorm(100)
)

# Create a 3D scatter plot
p <- plot_ly(
  data = df,
  x = ~x, y = ~y, z = ~z,
  color = ~color,
  colors = c('#FF7F0E', '#1F77B4'),
  type = 'scatter3d',
  mode = 'markers'
)

# Save the plot as an HTML file
saveWidget(p, "plot.html", selfcontained = TRUE)






















