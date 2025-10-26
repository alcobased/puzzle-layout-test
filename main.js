const imageInput = document.getElementById('image-input');
const toggleImageButton = document.getElementById('toggle-image-button');
const puzzleImage = document.getElementById('puzzle-image');
const imageOverlay = document.getElementById('image-overlay');
const resetCirclesButton = document.getElementById('reset-circles-button');

// Function to generate a placeholder SVG image that looks like a blueprint
function createPlaceholderImage() {
    const svg = `
        <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
            <defs>
                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(173, 216, 230, 0.2)" stroke-width="0.5"/>
                </pattern>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <rect width="50" height="50" fill="url(#smallGrid)"/>
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(173, 216, 230, 0.4)" stroke-width="1"/>
                </pattern>
            </defs>
            <rect width="800" height="600" fill="#023047" />
            <rect width="800" height="600" fill="url(#grid)" />
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Function to load the placeholder
function loadPlaceholder() {
    puzzleImage.src = createPlaceholderImage();
    toggleImageButton.textContent = 'Load Image';
}

// This function positions and sizes the overlay to match the rendered image
function updateOverlayPosition() {
    // Check if the image is loaded and visible
    if (!puzzleImage.complete || puzzleImage.naturalHeight === 0) {
        imageOverlay.style.display = 'none';
        return;
    }

    imageOverlay.style.display = 'block';

    // Get the rendered dimensions and position of the image
    const imgRect = puzzleImage.getBoundingClientRect();
    const containerRect = puzzleImage.parentElement.getBoundingClientRect();

    // Calculate position relative to the container
    const top = imgRect.top - containerRect.top;
    const left = imgRect.left - containerRect.left;

    // Apply the dimensions and position to the overlay
    imageOverlay.style.width = `${imgRect.width}px`;
    imageOverlay.style.height = `${imgRect.height}px`;
    imageOverlay.style.top = `${top}px`;
    imageOverlay.style.left = `${left}px`;
}

toggleImageButton.addEventListener('click', () => {
    // If the current source is the placeholder, or no source is set, trigger file input
    if (puzzleImage.src.startsWith('data:image/svg+xml') || !puzzleImage.src) {
        imageInput.click();
    } else {
        // Otherwise, clear the user's image and show the placeholder
        loadPlaceholder();
        // Clear circles when image is cleared
        while (imageOverlay.firstChild) {
            imageOverlay.removeChild(imageOverlay.firstChild);
        }
    }
});

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            puzzleImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Update the overlay when the image is loaded
puzzleImage.onload = () => {
    puzzleImage.style.display = 'block';
    // If it's not the placeholder, change the button text
    if (!puzzleImage.src.startsWith('data:image/svg+xml')) {
        toggleImageButton.textContent = 'Clear Image';
    }
    updateOverlayPosition();
};

// Update the overlay when the window is resized
window.addEventListener('resize', updateOverlayPosition);

imageOverlay.addEventListener('click', (event) => {
    if (!puzzleImage.src) {
        return; // Don't do anything if there is no image
    }

    const overlay = event.currentTarget;
    const clickX = event.offsetX;
    const clickY = event.offsetY;

    const circle = document.createElement('div');
    circle.classList.add('click-circle');

    // Position the circle using percentages so they scale with the overlay
    const xPercent = (clickX / overlay.offsetWidth) * 100;
    const yPercent = (clickY / overlay.offsetHeight) * 100;

    circle.style.left = `${xPercent}%`;
    circle.style.top = `${yPercent}%`;

    imageOverlay.appendChild(circle);
});

resetCirclesButton.addEventListener('click', () => {
    // Remove existing circles from the overlay
    while (imageOverlay.firstChild) {
        imageOverlay.removeChild(imageOverlay.firstChild);
    }
});

// Load the placeholder on initial script execution
loadPlaceholder();
// Initial check
updateOverlayPosition();
