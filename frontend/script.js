document
  .getElementById('uploadForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault()
    const fileInput = document.getElementById('fileInput')
    const formData = new FormData()
    formData.append('file', fileInput.files[0])

    const resultDiv = document.getElementById('result')
    resultDiv.textContent = 'Uploading...'

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (response.ok) {
        resultDiv.textContent = 'Upload successful! File URL: ' + data.url
      } else {
        resultDiv.textContent =
          'Upload failed: ' + (data.error || 'Unknown error')
      }
    } catch (err) {
      resultDiv.textContent = 'Error: ' + err.message
    }
  })
