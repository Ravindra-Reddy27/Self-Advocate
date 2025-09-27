document.addEventListener('DOMContentLoaded', () => {
    // Profile Dropdown Logic
    const profileIcon = document.getElementById('profileIcon');
    const profileDropdown = document.getElementById('profileDropdown');
    const logoutOption = document.getElementById('logoutOption');

    if (profileIcon) {
        profileIcon.addEventListener('click', (event) => {
            profileDropdown.classList.toggle('active');
            event.stopPropagation();
        });
    }

    if (logoutOption) {
        logoutOption.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'Home.html';
        });
    }

    document.addEventListener('click', (event) => {
        if (profileDropdown && !profileDropdown.contains(event.target) && !profileIcon.contains(event.target)) {
            profileDropdown.classList.remove('active');
        }
    });

    // File Upload Logic
    const videoInputBtn = document.getElementById('videoInputBtn');
    const videoUpload = document.getElementById('videoUpload');
    if (videoInputBtn) {
        videoInputBtn.addEventListener('click', () => videoUpload.click());
    }
    if (videoUpload) {
        videoUpload.addEventListener('change', (event) => handleFileUpload(event.target.files[0]));
    }

    const audioInputBtn = document.getElementById('audioInputBtn');
    const audioUpload = document.getElementById('audioUpload');
    if (audioInputBtn) {
        audioInputBtn.addEventListener('click', () => audioUpload.click());
    }
    if (audioUpload) {
        audioUpload.addEventListener('change', (event) => handleFileUpload(event.target.files[0]));
    }

    const imageInputBtn = document.getElementById('imageInputBtn');
    const imageUpload = document.getElementById('imageUpload');
    if (imageInputBtn) {
        imageInputBtn.addEventListener('click', () => imageUpload.click());
    }
    if (imageUpload) {
        imageUpload.addEventListener('change', (event) => handleFileUpload(event.target.files[0]));
    }
});

async function handleFileUpload(file) {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            // Redirect to the output page, passing the S3 file URL as a query parameter
            window.location.href = `Output.html?fileUrl=${encodeURIComponent(result.location)}`;
        } else {
            alert('File upload failed.');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred during file upload.');
    }
}
