// Initialize file and folder array to simulate uploaded files
let filesAndFolders = [
  { 
    name: 'Documents', 
    type: 'folder', 
    icon: 'folder.png',
    contents: [
      { name: 'Document 1', type: 'pdf', icon: 'document.png', path: 'document1.pdf' },
      { name: 'Document 2', type: 'docx', icon: 'document.png', path: 'document2.docx' }
    ]
  },
  { 
    name: 'Images', 
    type: 'folder', 
    icon: 'folder.png',
    contents: [
      { name: 'Image 1', type: 'image', icon: 'image.png', path: 'image1.jpg' },
      { name: 'Image 2', type: 'image', icon: 'image.png', path: 'image2.jpg' }
    ]
  },
  { 
    name: 'Presentations', 
    type: 'folder', 
    icon: 'folder.png',
    contents: [
      { name: 'Presentation 1', type: 'ppt', icon: 'presentation.png', path: 'presentation1.ppt' }
    ]
  },
  { 
    name: 'Spreadsheets', 
    type: 'folder', 
    icon: 'folder.png',
    contents: [
      { name: 'Spreadsheet 1', type: 'excel', icon: 'excel.png', path: 'spreadsheet1.xlsx' }
    ]
  }
];

// Function to display files and folders
function displayFilesAndFolders() {
  const fileContainer = document.getElementById('file-list');
  fileContainer.innerHTML = ''; // Clear existing items
  
  filesAndFolders.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('file-item');
    
    // Add folder or file icon
    const itemIcon = document.createElement('img');
    itemIcon.src = item.icon;
    itemElement.appendChild(itemIcon);

    // Add folder or file name
    const itemName = document.createElement('p');
    itemName.textContent = item.name;
    itemElement.appendChild(itemName);
    
    // If it's a folder, allow it to show contents when clicked
    if (item.type === 'folder') {
      itemElement.addEventListener('click', () => {
        displayFolderContents(item);
      });
    } else {
      // Handle file clicks to open the file
      itemElement.addEventListener('click', () => {
        openFile(item);
      });
    }

    fileContainer.appendChild(itemElement);
  });
}

// Function to display contents of a folder
function displayFolderContents(folder) {
  const fileContainer = document.getElementById('file-list');
  fileContainer.innerHTML = ''; // Clear existing items

  // Display contents inside the folder
  folder.contents.forEach(content => {
    const contentElement = document.createElement('div');
    contentElement.classList.add('file-item');

    const contentIcon = document.createElement('img');
    contentIcon.src = content.icon;
    contentElement.appendChild(contentIcon);

    const contentName = document.createElement('p');
    contentName.textContent = content.name;
    contentElement.appendChild(contentName);

    // Handle file clicks to open the file
    contentElement.addEventListener('click', () => {
      openFile(content);
    });

    fileContainer.appendChild(contentElement);
  });
}

// Function to open a file
function openFile(file) {
  const fileViewer = document.getElementById('file-viewer');
  const fileViewerContainer = document.getElementById('file-viewer-container');
  fileViewer.innerHTML = ''; // Clear any existing content

  if (file.type === 'pdf') {
    // For PDF files, open them in a PDF viewer
    const pdfViewer = document.createElement('embed');
    pdfViewer.src = file.path;
    pdfViewer.type = 'application/pdf';
    pdfViewer.style.width = '100%';
    pdfViewer.style.height = '500px';
    fileViewer.appendChild(pdfViewer);
  } else if (file.type === 'image') {
    // For image files, display the image
    const imgViewer = document.createElement('img');
    imgViewer.src = file.path;
    imgViewer.style.maxWidth = '100%';
    imgViewer.style.maxHeight = '500px';
    fileViewer.appendChild(imgViewer);
  } else if (file.type === 'ppt') {
    // For PowerPoint files, simulate opening a presentation
    const pptViewer = document.createElement('div');
    pptViewer.textContent = `Opening PowerPoint: ${file.name}`;
    fileViewer.appendChild(pptViewer);
  } else if (file.type === 'excel') {
    // For Excel files, simulate opening a spreadsheet
    const excelViewer = document.createElement('div');
    excelViewer.textContent = `Opening Excel Spreadsheet: ${file.name}`;
    fileViewer.appendChild(excelViewer);
  } else {
    fileViewer.textContent = `Unsupported file type: ${file.name}`;
  }

  // Show the viewer
  fileViewerContainer.style.display = 'block';
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
          path: URL.createObjectURL(uploadedFile) // Use URL.createObjectURL for temporary access
        };
        
        // Add new file to the first folder (or modify to choose a specific folder)
        filesAndFolders[0].contents.push(newFile);  // Here, adding it to 'Documents' folder
        
        displayFolderContents(filesAndFolders[0]); // Display contents of Documents folder after upload
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
  return fileTypeIcons[type.split('/')[0]] || 'file.png'; // Default icon
}

// Event listeners for other buttons (Settings/Profile)
document.getElementById('settingsButton').addEventListener('click', () => {
  alert('Settings functionality will be implemented.');
});

document.getElementById('profileButton').addEventListener('click', () => {
  alert('Profile functionality will be implemented.');
});

// Initialize display
displayFilesAndFolders();
