// login.js - Login functionality
document.addEventListener('DOMContentLoaded', function() {
  // Focus on username input when page loads
  document.getElementById('username').focus();
  
  // Add enter key support
  document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      login();
    }
  });
  
  // Clear errors when user starts typing
  document.getElementById('username').addEventListener('input', function() {
    clearError('userError');
  });
  
  document.getElementById('password').addEventListener('input', function() {
    clearError('passError');
  });
});

function togglePassword() {
  const passwordInput = document.getElementById('password');
  const showPasswordCheckbox = document.getElementById('showPassword');
  
  if (showPasswordCheckbox.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

function clearError(errorId) {
  document.getElementById(errorId).innerHTML = '';
}

function showError(errorId, message) {
  document.getElementById(errorId).innerHTML = 
    `<i class="fas fa-exclamation-circle"></i> ${message}`;
}

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const loginBtn = document.getElementById('loginBtn');
  
  // Clear previous errors
  clearError('userError');
  clearError('passError');
  
  // Validation
  let isValid = true;
  
  if (username === '') {
    showError('userError', 'Please enter your username or email');
    isValid = false;
  }
  
  if (password === '') {
    showError('passError', 'Please enter your password');
    isValid = false;
  }
  
  if (!isValid) return;
  
  // Disable button and show loading state
  const originalText = loginBtn.innerHTML;
  loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
  loginBtn.disabled = true;
  
  // Simulate API call delay
  setTimeout(() => {
    // Demo authentication logic
    const demoUsername = 'diaz@gmail.com';
    const demoPassword = 'try123';
    
    if (username === demoUsername && password === demoPassword) {
      // Successful login
      loginBtn.innerHTML = '<i class="fas fa-check"></i> Login Successful!';
      loginBtn.style.backgroundColor = '#43a047';
      
      // Redirect to dashboard after success
      setTimeout(() => {
        alert('Welcome to Smart Shelf! Redirecting to dashboard...');
        // In a real app, you would redirect to dashboard.html
        window.location.href = 'dashboard.html'; // This would be your dashboard page
      }, 1000);
    } else {
      // Failed login
      loginBtn.innerHTML = originalText;
      loginBtn.disabled = false;
      
      if (username !== demoUsername) {
        showError('userError', 'Username not found. Use: admin@smartshelf.com');
      } else {
        showError('passError', 'Incorrect password. Use: demo123');
      }
      
      // Shake animation for error feedback
      document.querySelector('.card').style.animation = 'shake 0.5s';
      setTimeout(() => {
        document.querySelector('.card').style.animation = '';
      }, 500);
    }
  }, 1500);
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