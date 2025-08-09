
const formContainer = document.getElementById('form-container');
const profileContainer = document.getElementById('profile-container');
const profileForm = document.getElementById('profile-form');
const nameInput = document.getElementById('name');
const bioInput = document.getElementById('bio');
const pfpUploadInput = document.getElementById('pfp-upload');
const displayName = document.getElementById('display-name');
const displayBio = document.getElementById('display-bio');
const displayPfp = document.getElementById('display-pfp');
const editButton = document.getElementById('edit-button');

// Store the last image data URL so it can be restored on edit
let lastImageDataUrl = '';

profileForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const submittedName = nameInput.value;
    const submittedBio = bioInput.value;
    const file = pfpUploadInput.files[0];

    displayName.textContent = submittedName;
    displayBio.textContent = submittedBio;

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            displayPfp.src = e.target.result;
            lastImageDataUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        displayPfp.src = lastImageDataUrl || '';
    }

    // Store the last entered values for editing
    profileForm.dataset.lastName = submittedName;
    profileForm.dataset.lastBio = submittedBio;

    formContainer.classList.add('hidden');
    profileContainer.classList.remove('hidden');
});

// Edit Profile button 
if (editButton) {
    editButton.addEventListener('click', function() {
        // Restore previous values
        nameInput.value = profileForm.dataset.lastName || '';
        bioInput.value = profileForm.dataset.lastBio || '';
        pfpUploadInput.value = '';
        formContainer.classList.remove('hidden');
        profileContainer.classList.add('hidden');
    });
}

