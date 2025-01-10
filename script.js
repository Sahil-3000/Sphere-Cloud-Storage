// Initialize file array to simulate uploaded files
let files = [
    { name: 'Document 1', type: 'pdf', icon: 'document.png' },
    { name: 'Image 1', type: 'image', icon: 'image.png' },
    { name: 'Presentation', type: 'ppt', icon: 'presentation.png' },
    { name: 'Spreadsheet', type: 'excel', icon: 'excel.png' }
  ];
  
  // Function to display files in the file container
  function displayFiles() {
    const fileContainer = document.getElementById('file-list');
    fileContainer.innerHTML = ''; // Clear existing files
  
    files.forEach(file => {
      const fileElement = document.createElement('div');
      fileElement.classList.add('file-item');
  
      // Add file icon
      const fileIcon = document.createElement('img');
      fileIcon.src = file.icon;
      fileElement.appendChild(fileIcon);
  
      // Add file name
      const fileName = document.createElement('p');
      fileName.textContent = file.name;
      fileElement.appendChild(fileName);
  
      fileContainer.appendChild(fileElement);
    });
  }
  
  // Handle file upload
  document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '*/*';
    fileInput.click();
  
    // File input change event
    fileInput.addEventListener('change', function(event) {
      const uploadedFile = event.target.files[0];
      
      if (uploadedFile) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          // Simulate file object creation
          const newFile = {
            name: uploadedFile.name,
            type: uploadedFile.type.split('/')[0],
            icon: getFileIcon(uploadedFile.type),
          };
          
          // Add new file to the list and update display
          files.push(newFile);
          displayFiles();
        };
        
        reader.readAsDataURL(uploadedFile);
      }
    });
  });
  
  // Function to get a file icon based on its type
  function getFileIcon(type) {
    const fileTypeIcons = {
      pdf: 'pdf.png',
      image: 'image.png',
      ppt: 'presentation.png',
      excel: 'excel.png',
    };
    return fileTypeIcons[type] || 'file.png'; // Default icon
  }
  
  // Event listeners for the buttons
  document.getElementById('settingsButton').addEventListener('click', () => {
    alert('Settings functionality will be implemented.');
  });
  
  document.getElementById('profileButton').addEventListener('click', () => {
    alert('Profile functionality will be implemented.');
  });
  
  // Initialize file display
  displayFiles();
  