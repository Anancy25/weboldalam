// Smooth scrolling a navigációs linkekre kattintva
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Űrlap validáció, beleértve a 18 év alattiak és a feltételek elfogadásának ellenőrzését
  const signupForm = document.querySelector('.signup-section form');
  signupForm.addEventListener('submit', function (e) {
    let valid = true;
    
    // Ellenőrizzük a kötelező mezőket
    const requiredFields = this.querySelectorAll('input[required], textarea[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = 'red';
      } else {
        field.style.borderColor = '#ccc';
      }
    });
    
    // Születési dátum validáció (18 év alattiak ellenőrzése)
    const dobField = this.querySelector('input[name="dob"]');
    if (dobField) {
      const dobValue = new Date(dobField.value);
      const today = new Date();
      let age = today.getFullYear() - dobValue.getFullYear();
      const m = today.getMonth() - dobValue.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobValue.getDate())) {
        age--;
      }
      if (age < 18) {
        valid = false;
        dobField.style.borderColor = 'red';
        alert('A jelentkezéshez legalább 18 évesnek kell lenned!');
      }
    }
    
    // Checkbox validáció: ellenőrizzük, hogy a feltételeket elfogadták-e
    const termsCheckbox = this.querySelector('input[name="terms"]');
    if (termsCheckbox && !termsCheckbox.checked) {
      valid = false;
      termsCheckbox.style.outline = '2px solid red';
      alert('Kérjük, fogadd el a feltételeket a jelentkezéshez!');
    } else if (termsCheckbox) {
      termsCheckbox.style.outline = 'none';
    }
    
    if (!valid) {
      e.preventDefault();
    }
  });