
const toggleImageButton = document.getElementById('toggle-image-button');
const imageInput = document.getElementById('image-input');
const puzzleImage = document.getElementById('puzzle-image');

toggleImageButton.addEventListener("click", () => {
    if (puzzleImage.style.display === 'none') {
        imageInput.click();
    } else {
        puzzleImage.style.display = 'none';
        puzzleImage.src = '';
        imageInput.value = '';
    }
});

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            puzzleImage.src = e.target.result;
            puzzleImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});
