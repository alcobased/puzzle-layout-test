const imageInput = document.getElementById('image-input');
const toggleImageButton = document.getElementById('toggle-image-button');
const puzzleImage = document.getElementById('puzzle-image');
const imageOverlay = document.getElementById('image-overlay');
const resetCirclesButton = document.getElementById('reset-circles-button');

toggleImageButton.addEventListener('click', () => {
    if (puzzleImage.style.display === 'none') {
        imageInput.click();
    } else {
        puzzleImage.style.display = 'none';
        toggleImageButton.textContent = 'Load Image';
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
            puzzleImage.style.display = 'block';
            toggleImageButton.textContent = 'Clear Image';
        };
        reader.readAsDataURL(file);
    }
});

imageOverlay.addEventListener('click', (event) => {
    if (puzzleImage.style.display === 'none' || !puzzleImage.src) {
        return;
    }

    const overlay = event.currentTarget;
    const clickX = event.offsetX;
    const clickY = event.offsetY;

    // Get container dimensions
    const containerWidth = overlay.offsetWidth;
    const containerHeight = overlay.offsetHeight;

    // Get image's natural dimensions
    const imgNaturalWidth = puzzleImage.naturalWidth;
    const imgNaturalHeight = puzzleImage.naturalHeight;

    // Calculate aspect ratios
    const containerRatio = containerWidth / containerHeight;
    const imgRatio = imgNaturalWidth / imgNaturalHeight;

    let renderedWidth, renderedHeight, offsetX, offsetY;

    // Calculate the rendered image's dimensions and offset within the container
    if (containerRatio > imgRatio) {
        // Container is wider than the image (pillarboxed)
        renderedHeight = containerHeight;
        renderedWidth = renderedHeight * imgRatio;
        offsetY = 0;
        offsetX = (containerWidth - renderedWidth) / 2;
    } else {
        // Container is taller than the image (letterboxed)
        renderedWidth = containerWidth;
        renderedHeight = renderedWidth / imgRatio;
        offsetX = 0;
        offsetY = (containerHeight - renderedHeight) / 2;
    }

    // Check if the click is within the bounds of the actual rendered image
    if (
        clickX >= offsetX &&
        clickX <= (offsetX + renderedWidth) &&
        clickY >= offsetY &&
        clickY <= (offsetY + renderedHeight)
    ) {
        const circle = document.createElement('div');
        circle.classList.add('click-circle');

        // Position the circle using percentages of the overlay container
        const xPercent = (clickX / containerWidth) * 100;
        const yPercent = (clickY / containerHeight) * 100;

        circle.style.left = `${xPercent}%`;
        circle.style.top = `${yPercent}%`;

        imageOverlay.appendChild(circle);
    }
});


resetCirclesButton.addEventListener('click', () => {
    // Remove existing circles
    while (imageOverlay.firstChild) {
        imageOverlay.removeChild(imageOverlay.firstChild);
    }
});
