# Dynamic Image Containment Test

This is a simple web application built to demonstrate and test the behavior of image containment within a responsive container. It showcases modern CSS and JavaScript techniques to create a fluid, interactive experience where users can load an image and interact with it.

## Overview

The primary goal of this project is to explore how `object-fit: contain` works in a flexbox-based layout. The application provides a central container that dynamically adjusts its size, and the image loaded by the user scales to fit within this container while preserving its aspect ratio.

## Features

*   **Modern, Responsive Design:** The application uses a dark theme with a clean, centered layout that adapts to different screen sizes.
*   **Dynamic Image Loading:** Users can click the "Load Image" button to select an image from their local computer.
*   **Image Containment:** The loaded image is displayed within a designated container, scaling up or down as needed to fit perfectly while maintaining its aspect ratio.
*   **Interactive Overlay:** A semi-transparent overlay is placed on top of the image. Clicking on this overlay allows the user to place small, glowing markers.
*   **Accurate Marker Placement:** The markers are placed with precision and will "stick" to the correct relative position on the image even when the browser window is resized.
*   **Reset Functionality:** A "Reset Circles" button allows the user to clear all placed markers from the image.

## How to Use

1.  Open `index.html` in your web browser.
2.  Click the **Load Image** button to choose an image file from your device.
3.  Click anywhere on the displayed image to place a circular marker.
4.  Click the **Reset Circles** button to remove all markers.
5.  Resize the browser window to observe how the image and the markers responsively scale and reposition themselves.
