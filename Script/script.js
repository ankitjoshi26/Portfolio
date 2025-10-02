document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVBAR TOGGLE =====
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    if (menuToggle && navList) {
        menuToggle.addEventListener("click", () => {
            navList.classList.toggle("show");
        });

        // Close nav when clicking a link (mobile)
        document.querySelectorAll("#nav-list a").forEach(link => {
            link.addEventListener("click", () => navList.classList.remove("show"));
        });
    }

    // CONTACT FORM VALIDATION + EMAILJS 
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

        let isValid = true;

        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) { 
            document.getElementById('nameError').style.display = 'block'; 
            isValid = false; 
        }

        const emailInput = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) { 
            document.getElementById('emailError').style.display = 'block'; 
            isValid = false; 
        }

        const subjectInput = document.getElementById('subject');
        if (!subjectInput.value.trim()) { 
            document.getElementById('subjectError').style.display = 'block'; 
            isValid = false; 
        }

        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim()) { 
            document.getElementById('messageError').style.display = 'block'; 
            isValid = false; 
        }

        if (isValid) {
            submitButton.disabled = true;

            emailjs.send(
                'service_6sec1go',   // service id
                'template_xwbdchk', // template id
                {
                    name: nameInput.value,
                    email: emailInput.value,
                    subject: subjectInput.value,
                    message: messageInput.value,
                    time: new Date().toLocaleString()
                }
            ).then(function(response) {
                console.log("Email sent successfully:", response);
                contactForm.reset();

                // Show success message with animation
                successMessage.classList.add('show');

                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);

                submitButton.disabled = false;
            }, function(error) {
                console.error("Email send failed:", error);
                alert("Oops! Something went wrong. Check console for details.");
                submitButton.disabled = false;
            });
        }
    });

    // ===== SCROLL FLY-IN ANIMATION =====
    const elementsToAnimate = document.querySelectorAll(".fly-in");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 } // 20% visible trigger
    );

    elementsToAnimate.forEach(el => observer.observe(el));
});
