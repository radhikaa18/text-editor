document.addEventListener("DOMContentLoaded", function () {
    const editor = document.getElementById("editor");
    const colorPicker = document.getElementById("colorPicker");

    // Save content to localStorage on every input change
    editor.addEventListener("input", function () {
        localStorage.setItem("editorContent", editor.value);
    });

    // Load content from localStorage on page load
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
        editor.value = savedContent;
    }

    // Show color picker when Text Color button is clicked
    colorPicker.addEventListener("input", function () {
        formatText('foreColor', colorPicker.value);
    });
});

function formatText(command, value = null) {
    document.execCommand(command, false, value);
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    // Toggle color picker style for dark mode
    const colorPicker = document.getElementById("colorPicker");
    colorPicker.classList.toggle("dark-mode-color-picker");
}

function insertImage() {
    const imageInput = document.getElementById('imageInput');
    imageInput.click();

    // Handle image selection
    imageInput.addEventListener('change', function () {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;
                document.execCommand('insertImage', false, imageUrl);
            };
            reader.readAsDataURL(file);
        }
    });
}

function clearEditor() {
    const editor = document.getElementById("editor");
    editor.value = '';
    localStorage.removeItem("editorContent");
}

function saveToFile() {
    const editor = document.getElementById("editor");
    const content = editor.value;

    // Create a Blob and initiate a download
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text_editor_content.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function loadFromFile() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const content = e.target.result;
                const editor = document.getElementById("editor");
                editor.value = content;
                localStorage.setItem("editorContent", content);
            };
            reader.readAsText(file);
        }
        document.body.removeChild(fileInput);
    });

    fileInput.click();
}

function changeHeadingLevel() {
    const level = prompt("Enter heading level (1-6):", "2");
    if (level && /^[1-6]$/.test(level)) {
        formatText('formatBlock', `<h${level}>`);
    }
}

function createLink() {
    const url = prompt("Enter URL:");
    if (url) {
        formatText('createLink', url);
    }
}

function changeFontColor() {
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.click();
}
