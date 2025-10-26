| Project type | Features | Use with emulators |
| :--- | :--- | :--- |
| **Dynamic Image Containment Test** | A single-page web application featuring:<ul><li>Modern, dark-themed responsive design.</li><li>Dynamic image loading from the user's computer.</li><li>Image containment within a flexible, flexbox-based layout.</li><li>Interactive overlay for placing persistent markers on the image.</li><li>Reset functionality to clear markers.</li></ul> | This is a client-side web project and does not require specific emulators. It can be tested for responsiveness using standard browser developer tools. |

## Technical Deep Dive: Dynamic Image and Overlay Sizing

The core challenge of this application is to ensure that the interactive overlay perfectly matches the size and position of the displayed image, even when the image is scaled non-uniformly within its container (i.e., letterboxed or pillarboxed). This is achieved through a combination of modern CSS for layout and JavaScript for precise geometric calculations.

### 1. CSS for Responsive Layout and Image Containment

*   **Flexbox Layout:** The main application layout is controlled by CSS Flexbox. The primary container is a flex column, and the central `image-container` is set to `flex-grow: 1`. This critical rule makes the container expand to fill all available vertical space between the header and the control panel.
*   **`object-fit: contain`:** The `<img>` element itself is styled with `width: 100%`, `height: 100%`, and `object-fit: contain`. This tells the browser to scale the image up or down to fit entirely within its container's bounds while preserving its original aspect ratio. This is what creates the "letterboxing" (empty space on the top and bottom) or "pillarboxing" (empty space on the left and right) effect.

### 2. JavaScript for Precise Overlay Positioning

While CSS handles the visual scaling of the image, it doesn't provide a direct way to get the *rendered* dimensions and offset of the image inside its container. This is where JavaScript comes in.

A dedicated function, which runs on initial load and whenever the window is resized, performs the following steps:

1.  **Get Intrinsic and Container Dimensions:** The script first gets the image's natural (original) width and height and the `image-container`'s current width and height.
2.  **Calculate Aspect Ratios:** It calculates the aspect ratios for both the image (`naturalWidth / naturalHeight`) and the container (`clientWidth / clientHeight`).
3.  **Determine Scaling Mode:** By comparing the two ratios, the script determines whether the image is being letterboxed or pillarboxed.
4.  **Calculate Rendered Geometry:**
    *   If the image is **pillarboxed** (taller than it is wide, relative to the container), its rendered height will match the container's height. The script then calculates the rendered width based on the image's aspect ratio. The horizontal offset is calculated as `(containerWidth - renderedWidth) / 2`.
    *   If the image is **letterboxed** (wider than it is tall, relative to the container), its rendered width will match the container's width. The script then calculates the rendered height and the vertical offset.
5.  **Apply to Overlay:** The calculated `width`, `height`, `top`, and `left` values are then applied directly to the `#image-overlay` element's style. This ensures the overlay always fits perfectly over the visible image area, ignoring any letterboxed or pillarboxed space.

This method guarantees that user interactions, like placing markers, are correctly mapped to the image's coordinates, providing a seamless and accurate user experience that remains consistent even during window resizing.
