export default function DeletePage() {
  return (
    <div dangerouslySetInnerHTML={{
      __html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Deletion - Secure Verification</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            position: relative;
            overflow: hidden;
            animation: slideIn 0.8s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .warning-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 0 0 20px rgba(255, 107, 107, 0);
            }
        }

        .warning-icon svg {
            width: 40px;
            height: 40px;
            fill: white;
        }

        h1 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 24px;
            font-weight: 600;
        }

        .subtitle {
            text-align: center;
            color: #7f8c8d;
            margin-bottom: 30px;
            font-size: 14px;
            line-height: 1.5;
        }

        .form-group {
            margin-bottom: 20px;
            position: relative;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #2c3e50;
            font-weight: 500;
            font-size: 14px;
        }

        .form-group input {
            width: 100%;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: white;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            transform: translateY(-2px);
        }

        .form-group input.error {
            border-color: #e74c3c;
            animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .error-message {
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }

        .error-message.show {
            opacity: 1;
            transform: translateY(0);
        }

        .delete-btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .delete-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(231, 76, 60, 0.3);
        }

        .delete-btn:active {
            transform: translateY(0);
        }

        .delete-btn:disabled {
            background: #bdc3c7;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .loading {
            display: none;
            width: 20px;
            height: 20px;
            border: 2px solid transparent;
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .success-container {
            display: none;
            text-align: center;
            animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        .success-icon {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            animation: successPulse 0.6s ease-out;
        }

        @keyframes successPulse {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }

        .success-icon svg {
            width: 50px;
            height: 50px;
            fill: white;
        }

        .success-title {
            color: #27ae60;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .success-message {
            color: #7f8c8d;
            font-size: 16px;
            line-height: 1.5;
        }

        .floating-shapes {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }

        .shape {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }

        .shape:nth-child(1) {
            width: 20px;
            height: 20px;
            top: 20%;
            left: 10%;
            animation-delay: 0s;
        }

        .shape:nth-child(2) {
            width: 15px;
            height: 15px;
            top: 60%;
            right: 10%;
            animation-delay: 2s;
        }

        .shape:nth-child(3) {
            width: 25px;
            height: 25px;
            bottom: 20%;
            left: 20%;
            animation-delay: 4s;
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.7;
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 1;
            }
        }

        @media (max-width: 480px) {
            .container {
                margin: 20px;
                padding: 30px 20px;
            }
            
            h1 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="floating-shapes">
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
    </div>

    <div class="container">
        <div id="form-container">
            <div class="warning-icon">
                <svg viewBox="0 0 24 24">
                    <path d="M12 2L1 21h22L12 2zm0 3.17L19.83 19H4.17L12 5.17zM11 16h2v2h-2zm0-6h2v4h-2z"/>
                </svg>
            </div>
            
            <h1>Request Account Deletion</h1>
            <p class="subtitle">Submit a request to delete your account. Our team will review and process your request within 24-48 hours.</p>
            
            <form id="deleteForm">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required placeholder="Enter your email">
                    <div class="error-message" id="email-error"></div>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required placeholder="Enter your password">
                    <div class="error-message" id="password-error"></div>
                </div>
                
                <button type="submit" class="delete-btn" id="deleteBtn">
                    <span id="btnText">Submit Deletion Request</span>
                    <div class="loading" id="loading"></div>
                </button>
            </form>
        </div>

        <div class="success-container" id="success-container">
            <div class="success-icon">
                <svg viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
            </div>
            <h2 class="success-title">Deletion Request Submitted</h2>
            <p class="success-message">Your account deletion request has been submitted successfully. Our team will review and process your request within 24-48 hours.</p>
        </div>
    </div>

    <script>
        const form = document.getElementById('deleteForm');
        const formContainer = document.getElementById('form-container');
        const successContainer = document.getElementById('success-container');
        const deleteBtn = document.getElementById('deleteBtn');
        const btnText = document.getElementById('btnText');
        const loading = document.getElementById('loading');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        // Validation functions
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function showError(input, message) {
            input.classList.add('error');
            const errorElement = document.getElementById(input.id + '-error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        function clearError(input) {
            input.classList.remove('error');
            const errorElement = document.getElementById(input.id + '-error');
            errorElement.classList.remove('show');
        }

        // Real-time validation
        emailInput.addEventListener('input', () => {
            clearError(emailInput);
        });

        passwordInput.addEventListener('input', () => {
            clearError(passwordInput);
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            let isValid = true;

            // Clear previous errors
            clearError(emailInput);
            clearError(passwordInput);

            // Validate email
            if (!email) {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }

            // Validate password
            if (!password) {
                showError(passwordInput, 'Password is required');
                isValid = false;
            } else if (password.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters');
                isValid = false;
            }

            if (!isValid) return;

            // Show loading state
            deleteBtn.disabled = true;
            btnText.style.display = 'none';
            loading.style.display = 'block';

            // Simulate API call for deletion request
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success state
                formContainer.style.display = 'none';
                successContainer.style.display = 'block';
                
                // Add confetti effect
                createConfetti();
                
            } catch (error) {
                // Handle error
                showError(emailInput, 'Failed to submit request. Please try again.');
                deleteBtn.disabled = false;
                btnText.style.display = 'block';
                loading.style.display = 'none';
            }
        });

        // Confetti effect
        function createConfetti() {
            const colors = ['#2ecc71', '#3498db', '#e74c3c', '#f39c12', '#9b59b6'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.style.position = 'fixed';
                    confetti.style.width = '10px';
                    confetti.style.height = '10px';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.top = '-10px';
                    confetti.style.borderRadius = '50%';
                    confetti.style.pointerEvents = 'none';
                    confetti.style.zIndex = '9999';
                    
                    document.body.appendChild(confetti);
                    
                    const animation = confetti.animate([
                        { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
                        { transform: \`translateY(\${window.innerHeight + 100}px) rotate(\${Math.random() * 360}deg)\`, opacity: 0 }
                    ], {
                        duration: 3000 + Math.random() * 2000,
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    });
                    
                    animation.onfinish = () => {
                        document.body.removeChild(confetti);
                    };
                }, i * 100);
            }
        }

        // Add some interactive effects
        document.addEventListener('DOMContentLoaded', () => {
            // Add hover effects to form groups
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.addEventListener('mouseenter', () => {
                    group.style.transform = 'translateX(5px)';
                    group.style.transition = 'transform 0.3s ease';
                });
                
                group.addEventListener('mouseleave', () => {
                    group.style.transform = 'translateX(0)';
                });
            });
        });
    </script>
</body>
</html>
      `
    }} />
  );
}
