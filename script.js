// GSAP Initialization
gsap.registerPlugin(ScrollTrigger);

// Inspirational quotes data with scores
const inspirationalQuotes = [
    {
        text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
        author: "A.A. Milne",
        category: "Self-Confidence",
        score: 9.5
    },
    {
        text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
        author: "Noam Shpancer",
        category: "Mental Health",
        score: 9.8
    },
    {
        text: "Your current situation is not your final destination. The best is yet to come.",
        author: "Unknown",
        category: "Hope",
        score: 9.2
    },
    {
        text: "It's okay to not be okay. It's not okay to stay that way.",
        author: "Unknown",
        category: "Acceptance",
        score: 9.6
    },
    {
        text: "Healing isn't linear. Some days will be harder than others. Be patient with yourself.",
        author: "Unknown",
        category: "Growth",
        score: 9.4
    },
    {
        text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.",
        author: "Lori Deschene",
        category: "Emotions",
        score: 9.7
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // initializeCustomCursor(); - REMOVED
    initializeGSAPAnimations();
    initializeInspiration();
    initializeCharts();
    initializeMoodSelector();
    initializeButtons();
    createDynamicBrainParticles();
    initializeTouchSupport();
});

// Custom Cursor - REMOVED ENTIRE FUNCTION

// GSAP Animations
function initializeGSAPAnimations() {
    // Hero animations
    const tl = gsap.timeline();
    tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    })
    .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3');
    
    // Floating quote animation
    gsap.from('.gsap-float', {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1
    });
    
    // Section titles
    gsap.utils.toArray('.gsap-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Cards animations
    gsap.utils.toArray('.gsap-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Mood options animations
    gsap.utils.toArray('.gsap-mood').forEach((mood, i) => {
        gsap.from(mood, {
            scrollTrigger: {
                trigger: mood,
                start: 'top 85%'
            },
            scale: 0.8,
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'back.out(1.7)'
        });
    });
    
    // Scorecard animations
    gsap.utils.toArray('.inspiration-scorecard').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            x: i % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });
    
    // Logo animation
    gsap.from('.gsap-logo', {
        scrollTrigger: {
            trigger: '.gsap-logo',
            start: 'top 90%'
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
    });
}

// Generate inspiration scorecards
function initializeInspiration() {
    const container = document.getElementById('inspirationCards');
    
    inspirationalQuotes.forEach((quote, index) => {
        const card = document.createElement('div');
        card.className = 'inspiration-scorecard';
        card.innerHTML = `
            <div class="scorecard-header">
                <div class="scorecard-star">⭐</div>
                <div class="scorecard-category">${quote.category}</div>
            </div>
            <div class="scorecard-quote">"${quote.text}"</div>
            <div class="scorecard-author">— ${quote.author}</div>
            <div class="scorecard-score">${quote.score}</div>
        `;
        
        // Add touch animation
        card.addEventListener('click', function() {
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out'
            });
        });
        
        container.appendChild(card);
    });
}

// Initialize charts
function initializeCharts() {
    // Mood trend chart
    const moodCtx = document.getElementById('moodChart').getContext('2d');
    const moodChart = new Chart(moodCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Mood Level',
                data: [3, 4, 3.5, 4.2, 3.8, 4.5, 4.8],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#10B981',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    min: 0,
                    max: 5
                }
            }
        }
    });

    // Activities progress chart
    const activitiesCtx = document.getElementById('activitiesChart').getContext('2d');
    const activitiesChart = new Chart(activitiesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Meditation', 'Exercise', 'Reading'],
            datasets: [{
                data: [35, 30, 20],
                backgroundColor: ['#10B981', '#3B82F6', '#8B5CF6'],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Initialize mood selector with GSAP
function initializeMoodSelector() {
    const moodOptions = document.querySelectorAll('.mood-option');
    
    moodOptions.forEach(option => {
        // Hover animations
        option.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                gsap.to(this, {
                    scale: 1.05,
                    y: -5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(this.querySelector('.mood-emoji'), {
                    rotation: 10,
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                gsap.to(this, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(this.querySelector('.mood-emoji'), {
                    rotation: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        // Click animations
        option.addEventListener('click', function() {
            // Remove selected class from all options
            moodOptions.forEach(opt => {
                opt.classList.remove('selected');
                gsap.to(opt, {
                    scale: 1,
                    y: 0,
                    duration: 0.3
                });
            });
            
            // Add selected class and animate
            this.classList.add('selected');
            
            gsap.to(this, {
                scale: 1.1,
                y: -8,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
            
            // Animate emoji
            gsap.to(this.querySelector('.mood-emoji'), {
                scale: 1.3,
                rotation: 360,
                duration: 0.8,
                ease: 'back.out(1.7)'
            });
            
            const mood = this.dataset.mood;
            showMoodFeedback(mood);
        });
    });
}

// Show mood feedback with GSAP
function showMoodFeedback(mood) {
    const messages = {
        excellent: "That's wonderful! Keep up the positive energy! 🌟",
        good: "Great to hear you're doing well! 😊",
        okay: "It's perfectly normal to feel okay. Take care of yourself! 💚",
        low: "I understand you're feeling low. Remember, it's temporary. 🤗",
        struggling: "Thank you for being honest. You're not alone in this. 💙"
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: -400px;
        background: white;
        padding: 20px 24px;
        border-radius: 16px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 350px;
        border-left: 4px solid #10B981;
        font-weight: 500;
    `;
    notification.textContent = messages[mood];
    document.body.appendChild(notification);
    
    // GSAP animation
    gsap.to(notification, {
        x: -420,
        duration: 0.5,
        ease: 'power3.out',
        onComplete: () => {
            setTimeout(() => {
                gsap.to(notification, {
                    x: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power3.in',
                    onComplete: () => document.body.removeChild(notification)
                });
            }, 3000);
        }
    });
}

// Initialize buttons with GSAP and touch support
function initializeButtons() {
    const needFriendBtn = document.getElementById('needFriendBtn');
    const bookCounselorBtn = document.getElementById('bookCounselorBtn');
    const loginBtn = document.querySelector('.nav-login-btn');
    
    // Need Friend Button
    needFriendBtn.addEventListener('click', handleNeedFriend);
    needFriendBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        handleNeedFriend.call(this);
    });
    
    // Book Counselor Button
    bookCounselorBtn.addEventListener('click', handleBookCounselor);
    bookCounselorBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        handleBookCounselor.call(this);
    });
    
    // Login Button
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
        loginBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            handleLogin.call(this);
        });
    }
    
    // Resource Buttons
    document.querySelectorAll('.resource-btn').forEach(btn => {
        btn.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });
    
    function handleNeedFriend() {
        gsap.to(this, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out'
        });
        
        setTimeout(() => {
            showAlert('🤗 Connecting you to our AI friend...', 'Our AI assistant is ready to provide emotional support and coping strategies 24/7.');
        }, 200);
    }
    
    function handleBookCounselor() {
        gsap.to(this, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out'
        });
        
        setTimeout(() => {
            showAlert('📚 Booking a counselor session...', 'Connect with licensed mental health professionals for personalized therapy sessions.');
        }, 200);
    }
    
    function handleLogin() {
        const modal = document.getElementById('auth-modal');
        modal.style.display = 'block';
    }
}

// Modal functionality
const modal = document.getElementById('auth-modal');
const closeBtn = document.querySelector('.close-btn');
const loginFormBtn = document.getElementById('login-form-btn');
const signupFormBtn = document.getElementById('signup-form-btn');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

loginFormBtn.onclick = function() {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    loginFormBtn.classList.add('active');
    signupFormBtn.classList.remove('active');
}

signupFormBtn.onclick = function() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    loginFormBtn.classList.remove('active');
    signupFormBtn.classList.add('active');
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        showAlert('Login Successful', 'Welcome back!');
        modal.style.display = 'none';
    } else {
        showAlert('Login Failed', 'Invalid username or password.');
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch('http://localhost:8000/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        showAlert('Signup Successful', 'You can now log in.');
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginFormBtn.classList.add('active');
        signupFormBtn.classList.remove('active');
    } else {
        showAlert('Signup Failed', 'Username may already be taken.');
    }
});

// Chat widget functionality
const openChatBtn = document.querySelector('.open-chat-btn');
const closeChatBtn = document.querySelector('.close-chat-btn');
const chatWidget = document.querySelector('.chat-widget');
const sendChatBtn = document.getElementById('send-chat-btn');
const chatInput = document.getElementById('chat-message');
const chatMessages = document.querySelector('.chat-messages');

openChatBtn.onclick = function() {
    chatWidget.style.display = 'block';
    openChatBtn.style.display = 'none';
}

closeChatBtn.onclick = function() {
    chatWidget.style.display = 'none';
    openChatBtn.style.display = 'block';
}

sendChatBtn.onclick = async function() {
    const message = chatInput.value;
    if (message.trim() === '') return;

    addMessage('user', message);
    chatInput.value = '';

    try {
        const response = await fetch('http://localhost:8000/chatbot/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: message }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        addMessage('bot', data.response);
    } catch (error) {
        console.error('Error:', error);
        addMessage('bot', 'Sorry, I am having trouble connecting. Please try again later.');
    }
}

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Custom alert with GSAP
function showAlert(title, message) {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        max-width: 450px;
        text-align: center;
        border: 2px solid #10B981;
    `;
    
    alertBox.innerHTML = `
        <h3 style="color: #374151; margin-bottom: 16px; font-size: 20px; font-weight: 700;">${title}</h3>
        <p style="color: #6B7280; margin-bottom: 24px; line-height: 1.6;">${message}</p>
        <button onclick="closeAlert(this.parentElement)" style="background: #10B981; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-weight: 600; font-size: 14px;">Got it!</button>
    `;
    
    document.body.appendChild(alertBox);
    
    // GSAP animation
    gsap.to(alertBox, {
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)'
    });
}

function closeAlert(alertBox) {
    gsap.to(alertBox, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => document.body.removeChild(alertBox)
    });
}

// Resource functions with GSAP and touch support
function openMotivationalVideos() {
    showAlert('🎥 Opening Motivational Videos...', 'Redirecting to curated TED Talks and inspiring videos for mental health and motivation.');
    setTimeout(() => {
        window.open('https://www.ted.com/topics/mental+health', '_blank');
    }, 1500);
}

function openSelfHelpBooks() {
    showAlert('📚 Exploring Self-Help Books...', 'Opening curated collection of mental health and personal development books.');
    setTimeout(() => {
        window.open('https://www.goodreads.com/shelf/show/mental-health', '_blank');
    }, 1500);
}

function openPodcasts() {
    showAlert('🎧 Loading Mental Health Podcasts...', 'Connecting to expert advice and inspiring mental health podcast content.');
    setTimeout(() => {
        window.open('https://open.spotify.com/search/mental%20health%20podcast', '_blank');
    }, 1500);
}

// Create dynamic brain particles
function createDynamicBrainParticles() {
    const brainParticles = document.querySelector('.brain-particles');
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #10B981;
            border-radius: 50%;
            opacity: 0.3;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;
        
        brainParticles.appendChild(particle);
        
        // GSAP animation for each particle
        gsap.to(particle, {
            y: -50,
            opacity: 0.8,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: Math.random() * 2
        });
    }
}

// Touch Support Initialization
function initializeTouchSupport() {
    // Add touch support for all interactive elements
    document.querySelectorAll('button, a, .mood-option, .inspiration-scorecard').forEach(element => {
        element.addEventListener('touchend', function(e) {
            e.preventDefault();
            
            // Add visual feedback for touch
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out'
            });
            
            // Trigger click after animation
            setTimeout(() => {
                if (this.onclick) {
                    this.onclick();
                } else if (this.href && this.href.startsWith('#')) {
                    const target = document.querySelector(this.href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                } else if (this.href) {
                    window.open(this.href, this.target || '_self');
                }
            }, 100);
        });
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                scrollTo: target,
                duration: 0.8,
                ease: 'power2.inOut'
            });
        }
    });
});

// Navbar scroll effect
gsap.to('.navbar', {
    scrollTrigger: {
        trigger: 'body',
        start: 'top -50px',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse'
    },
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(25px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    duration: 0.3
});

// Interactive brain mouse movement
document.addEventListener('mousemove', function(e) {
    const brainCore = document.querySelector('.brain-core');
    if (brainCore) {
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        
        gsap.to(brainCore, {
            x: x,
            y: y,
            duration: 1,
            ease: 'power2.out'
        });
    }
});
