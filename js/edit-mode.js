/* ============================================================
   edit-mode.js — Live composition & local persistence UI
   ============================================================ */

(function() {
  let isEditMode = false;
  const editToggle  = document.getElementById('edit-toggle');
  const editModal   = document.getElementById('editModal');
  const closeModal  = document.getElementById('closeModal');
  const saveBtn     = document.getElementById('saveBtn');
  
  const textEditor  = document.getElementById('textEditor');
  const imageEditor = document.getElementById('imageEditor');
  const editContent = document.getElementById('editContent');
  const fileInput   = document.getElementById('fileInput');
  const imgPath     = document.getElementById('imgPath');
  
  let currentTarget = null;

  // ── TOGGLE EDIT MODE ──────────────────────────────────────
  editToggle.addEventListener('click', () => {
    isEditMode = !isEditMode;
    document.body.classList.toggle('edit-mode-active', isEditMode);
    editToggle.classList.toggle('active', isEditMode);
    editToggle.innerHTML = isEditMode 
      ? '<i data-lucide="check"></i> Exit Edit Mode' 
      : '<i data-lucide="edit-3"></i> Enable Edit Mode';
    lucide.createIcons();
  });

  // ── CLICK TO EDIT ─────────────────────────────────────────
  document.addEventListener('click', e => {
    if (!isEditMode) return;
    
    const editable = e.target.closest('[data-editable]');
    if (editable) {
      e.preventDefault();
      e.stopPropagation();
      openEditor(editable);
    }
  });

  function openEditor(el) {
    currentTarget = el;
    const type = el.dataset.editable;
    const id   = el.dataset.id;
    
    document.getElementById('modalTitle').textContent = `Editing: ${id}`;
    editModal.classList.add('show');
    
    if (type === 'text') {
      textEditor.style.display = 'block';
      imageEditor.style.display = 'none';
      editContent.value = el.innerText;
    } else if (type === 'image') {
      textEditor.style.display = 'none';
      imageEditor.style.display = 'block';
      // If it's a thumb container with an emoji, we skip imgPath
      imgPath.value = el.tagName === 'IMG' ? el.src.split('/').pop() : '';
    }
  }

  // ── CLOSE MODAL ───────────────────────────────────────────
  closeModal.addEventListener('click', () => editModal.classList.remove('show'));
  window.addEventListener('click', e => {
    if (e.target === editModal) editModal.classList.remove('show');
  });

  // ── SAVE CHANGES ──────────────────────────────────────────
  saveBtn.addEventListener('click', async () => {
    if (!currentTarget) return;
    
    const type = currentTarget.dataset.editable;
    
    if (type === 'text') {
      currentTarget.innerText = editContent.value;
    } else if (type === 'image') {
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          if (currentTarget.tagName === 'IMG') {
            currentTarget.src = e.target.result;
          } else {
            // It's a thumb container, maybe change background?
            currentTarget.style.backgroundImage = `url(${e.target.result})`;
          }
        };
        reader.readAsDataURL(fileInput.files[0]);
      } else if (imgPath.value) {
        const newPath = imgPath.value.startsWith('assets/') ? imgPath.value : `assets/${imgPath.value}`;
        if (currentTarget.tagName === 'IMG') {
          currentTarget.src = newPath;
        }
      }
    }
    
    editModal.classList.remove('show');
    
    // Pro feature: Attempt to save back to disk if supported
    if ('showSaveFilePicker' in window) {
      console.log("File System Access API supported. You can save your changed HTML.");
      // Optional: Logic to trigger a save prompt could go here.
      // For now, we just update the live DOM.
    }
  });

})();
