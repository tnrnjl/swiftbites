document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('authModal');
    const closeButton = document.querySelector('.close-button');
    const loginButtonNav = document.querySelector('.auth-buttons .btn-secondary');
    console.log('loginButtonNav:', loginButtonNav);
    const signUpButtonNav = document.querySelector('.auth-buttons .btn-primary');
    console.log('signUpButtonNav:', signUpButtonNav);
    const showSignUpLink = document.getElementById('showSignUp');
    const showLoginLink = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const signUpForm = document.getElementById('signUpForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginSubmitButton = document.getElementById('loginButton');
    const signUpEmailInput = document.getElementById('signUpEmail');
    const signUpPasswordInput = document.getElementById('signUpPassword');
    const signUpSubmitButton = document.getElementById('signUpButton');
    const logoutButton = document.getElementById('logoutButton');

    // Functions to open and close modal
    function openModal() {
        authModal.style.display = 'flex';
    }

    function closeModal() {
        authModal.style.display = 'none';
    }

    // Event listeners for modal
    loginButtonNav.addEventListener('click', () => {
        openModal();
        loginForm.style.display = 'block';
        signUpForm.style.display = 'none';
    });

    signUpButtonNav.addEventListener('click', () => {
        openModal();
        loginForm.style.display = 'none';
        signUpForm.style.display = 'block';
    });

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == authModal) {
            closeModal();
        }
    });

    showSignUpLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signUpForm.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'block';
        signUpForm.style.display = 'none';
    });

    // Firebase Authentication
    signUpSubmitButton.addEventListener('click', () => {
        console.log('Sign up button clicked');
        const email = signUpEmailInput.value;
        const password = signUpPasswordInput.value;
        console.log('Attempting to sign up with:', email, password);
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                alert('Successfully signed up and logged in!');
                closeModal();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Error signing up: ${errorMessage}`);
            });
    });

    loginSubmitButton.addEventListener('click', () => {
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                alert('Successfully logged in!');
                closeModal();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Error logging in: ${errorMessage}`);
            });
    });

		const contactForm = document.getElementById("contactForm");
		const successModal = document.getElementById("successModal");
		const closeModal = document.getElementById("closeModal");

		contactForm.addEventListener("submit", async (e) => {
			e.preventDefault();

			const name = document.getElementById("name").value;
			const email = document.getElementById("email").value;
			const message = document.getElementById("message").value;

			try {
				await db.collection("messages").add({
					name: name,
					email: email,
					message: message,
					timestamp: firebase.firestore.FieldValue.serverTimestamp()
				});

				// Show modal only after success
				successModal.style.display = "flex";
				contactForm.reset();

			} catch (error) {
				alert("❌ Error sending message. Try again.");
				console.error("Error writing document: ", error);
			}
		});

		// Close modal when X is clicked
		closeModal.onclick = () => {
			successModal.style.display = "none";
		};

		// Close modal when clicking outside the box
		window.onclick = (e) => {
			if (e.target === successModal) {
				successModal.style.display = "none";
			}
		};