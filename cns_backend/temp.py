import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Data for a 3D spiral
theta = np.linspace(0, 10 * np.pi, 1000)   # Angle
z = np.linspace(0, 2, 1000)                # Height
r = z                                      # Radius increases with height
x = r * np.sin(theta)
y = r * np.cos(theta)

# Plotting
fig = plt.figure(figsize=(10, 6))
ax = fig.add_subplot(111, projection='3d')

ax.plot(x, y, z, color='purple', lw=2)
ax.set_title("3D Spiral Plot")
ax.set_xlabel("X")
ax.set_ylabel("Y")
ax.set_zlabel("Z")

plt.tight_layout()
plt.show()
plt.savefig("static/outputs/plot.png")