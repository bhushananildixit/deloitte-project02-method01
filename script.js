function generatePhotoInputs() {
  const n = parseInt(document.getElementById('numPhotos').value);
  const photosInputDiv = document.getElementById('photosInput');
  
  if (photosInputDiv.children.length > 0) {
    const confirmChange = confirm(
      "Do you want to change the number of photos? Existing inputs will be cleared."
    );
    if (!confirmChange) {
      return; 
    }
  }
  photosInputDiv.innerHTML = '';
  for (let i = 0; i < n; i++) {
    photosInputDiv.innerHTML += `
      <div>
        <label>Photo ${i+1} - W: <input type="number" class="w" required></label>
        <label>H: <input type="number" class="h" required></label>
      </div>
    `;
  }
}

let uploadedWidth = null;
let uploadedHeight = null;

document.getElementById('photoFile').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  const url = URL.createObjectURL(file);

  img.onload = function() {
    uploadedWidth = img.width;
    uploadedHeight = img.height;
    document.getElementById('photoPreview').innerHTML = `
      <p>Photo Dimensions: <b>${uploadedWidth} x ${uploadedHeight}</b></p>
      <img src="${url}" alt="Preview" style="max-width: 100%; max-height: 200px; margin-top: 8px; border-radius: 8px;">
    `;
    URL.revokeObjectURL(url);
  };

  img.onerror = function() {
    document.getElementById('photoPreview').innerHTML = `<p style="color:red;">Invalid image file.</p>`;
    uploadedWidth = null;
    uploadedHeight = null;
  };

  img.src = url;
});

document.getElementById('photoForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const L = parseInt(document.getElementById('minLength').value);

  if (uploadedWidth === null || uploadedHeight === null) {
    document.getElementById('result').textContent = "Please upload a valid photo.";
    document.getElementById('result').style.color = "red";
    return;
  }

  let output = '';

  if (uploadedWidth < L || uploadedHeight < L) {
    output = `UPLOAD ANOTHER (W: ${uploadedWidth}, H: ${uploadedHeight})`;
  } else if (uploadedWidth === uploadedHeight && uploadedWidth === L) {
    output = `ACCEPTED (W: ${uploadedWidth}, H: ${uploadedHeight})`;
  } else {
    output = `CROP IT (W: ${uploadedWidth}, H: ${uploadedHeight})`;
  }

  document.getElementById('result').textContent = output;
  document.getElementById('result').style.color = "#222f3e";

  
  document.getElementById('photoFile').value = "";
  document.getElementById('photoPreview').innerHTML = "";
  uploadedWidth = null;
  uploadedHeight = null;
});