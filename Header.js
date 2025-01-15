        // Determine the relative base path
        const currentPathDepth = window.location.pathname.split('/').filter(Boolean).length;
        const relativeBase = "../".repeat(currentPathDepth);

        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyChQQiUKzxdvITadpBhMM4rryaNL4hLNaY",
            authDomain: "buckmap-83956.firebaseapp.com",
            projectId: "buckmap-83956",
            storageBucket: "buckmap-83956.appspot.com",
            messagingSenderId: "809697568507",
            appId: "1:809697568507:web:b2e70b0f7a04837063f25e",
            measurementId: "G-4JD9LL21HT",
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // Create the header component
        const headerHTML = `
            <header class="site-header">
                <div class="header-content">
                    <h1>BucketMap</h1>
                    <button id="menuToggle" class="menu-toggle">☰</button>
                    <nav id="mainNav" class="nav-closed">
                        <ul>
                            <li><a href="${relativeBase}">Home</a></li>
                            <li><a href="${relativeBase}map">BucketMap</a></li>
                            <li><a href="${relativeBase}aboutus">About Us</a></li>
                            <li><a href="${relativeBase}contactpage">Contact</a></li>
                            <li><a id="loginLink" href="${relativeBase}login/">Login</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;

        // Insert the header into the body
        document.body.insertAdjacentHTML("afterbegin", headerHTML);

        // Mobile menu toggle
        document.getElementById("menuToggle").addEventListener("click", () => {
            const nav = document.getElementById("mainNav");
            nav.classList.toggle("nav-closed");
        });

        // Check authentication state
        firebase.auth().onAuthStateChanged((user) => {
            const loginLink = document.getElementById("loginLink");
            if (user) {
                loginLink.textContent = "Logout";
                loginLink.href = "#";
                loginLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    firebase.auth().signOut();
                });
            } else {
                loginLink.textContent = "Login";
                loginLink.href = `${relativeBase}login/`;
            }
        });