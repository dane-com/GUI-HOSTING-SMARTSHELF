// signup.js - Signup functionality
document.addEventListener('DOMContentLoaded', function() {
  // Focus on email input when page loads
  document.getElementById('newUsername').focus();
  
  // Add enter key support
  document.getElementById('confirmPassword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      signup();
    }
  });
  
  // Clear errors when user starts typing
  document.getElementById('newUsername').addEventListener('input', function() {
    clearError('userError');
  });
  
  document.getElementById('newPassword').addEventListener('input', function() {
    clearError('passError');
  });
  
  document.getElementById('confirmPassword').addEventListener('input', function() {
    clearError('passError');
  });
});

function togglePassword() {
  const passwordInput = document.getElementById('newPassword');
  const confirmInput = document.getElementById('confirmPassword');
  const showPasswordCheckbox = document.getElementById('showPassword');
  
  if (showPasswordCheckbox.checked) {
    passwordInput.type = 'text';
    confirmInput.type = 'text';
  } else {
    passwordInput.type = 'password';
    confirmInput.type = 'password';
  }
}

function clearError(errorId) {
  document.getElementById(errorId).innerHTML = '';
}

function showError(errorId, message) {
  document.getElementById(errorId).innerHTML = 
    `<i class="fas fa-exclamation-circle"></i> ${message}`;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  // At least 8 characters, contains letters and numbers
  const re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return re.test(password);
}

function signup() {
  const email = document.getElementById('newUsername').value.trim();
  const password = document.getElementById('newPassword').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const signupBtn = document.getElementById('signupBtn');
  
  // Clear previous errors
  clearError('userError');
  clearError('passError');
  
  // Validation
  let isValid = true;
  
  // Email validation
  if (email === '') {
    showError('userError', 'Please enter your email address');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('userError', 'Please enter a valid email address (e.g., user@example.com)');
    isValid = false;
  }
  
  // Password validation
  if (password === '') {
    showError('passError', 'Please create a password');
    isValid = false;
  } else if (!validatePassword(password)) {
    showError('passError', 'Password must be at least 8 characters and contain both letters and numbers');
    isValid = false;
  } else if (confirmPassword === '') {
    showError('passError', 'Please confirm your password');
    isValid = false;
  } else if (password !== confirmPassword) {
    showError('passError', 'Passwords do not match');
    isValid = false;
  }
  
  if (!isValid) return;
  
  // Disable button and show loading state
  const originalText = signupBtn.innerHTML;
  signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
  signupBtn.disabled = true;
  
  // Simulate API call delay
  setTimeout(() => {
    // Check if email already exists (demo logic)
    const existingUsers = ['admin@smartshelf.com', 'user@example.com'];
    
    if (existingUsers.includes(email)) {
      // Email already exists
      signupBtn.innerHTML = originalText;
      signupBtn.disabled = false;
      showError('userError', 'This email is already registered. Try logging in instead.');
      
      // Shake animation for error feedback
      document.querySelector('.card').style.animation = 'shake 0.5s';
      setTimeout(() => {
        document.querySelector('.card').style.animation = '';
      }, 500);
    } else {
      // Successful signup
      signupBtn.innerHTML = '<i class="fas fa-check"></i> Account Created!';
      signupBtn.style.backgroundColor = '#43a047';
      
      // Store user in localStorage (demo only - in real app, send to backend)
      const user = {
        email: email,
        password: password, // Note: In real app, never store passwords in plain text
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage for demo purposes
      const users = JSON.parse(localStorage.getItem('smartShelfUsers') || '[]');
      users.push(user);
      localStorage.setItem('smartShelfUsers', JSON.stringify(users));
      
      // Redirect to login after success
      setTimeout(() => {
        alert(`Account created successfully!\nEmail: ${email}\n\nYou can now login with your credentials.`);
        window.location.href = 'login.html';
      }, 1500);
    }
  }, 2000);
}

// Add shake animation for errors
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);