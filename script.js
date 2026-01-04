document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Three.js Background Animation ---
    const initThreeJS = () => {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.z = 5;

        // Particle System
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: 0x00ff88,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Connection Lines
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0x00ccaa,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });

        const linesGeometry = new THREE.BufferGeometry();
        const linePositions = [];
        for(let i = 0; i < 100; i++) {
            const x1 = (Math.random() - 0.5) * 10;
            const y1 = (Math.random() - 0.5) * 10;
            const z1 = (Math.random() - 0.5) * 10;
            const x2 = (Math.random() - 0.5) * 10;
            const y2 = (Math.random() - 0.5) * 10;
            const z2 = (Math.random() - 0.5) * 10;
            linePositions.push(x1, y1, z1, x2, y2, z2);
        }
        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(linesMesh);

        // Mouse Interaction
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0002;
            linesMesh.rotation.y += 0.0003;
            
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);
            
            renderer.render(scene, camera);
        };
        animate();

        // Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
    };

    initThreeJS();


    // --- 2. Load and Render JSON Data ---
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Render Problems
            const problemsContainer = document.getElementById('problems-container');
            data.problems.forEach(problem => {
                problemsContainer.innerHTML += `
                    <div class="p-6 bg-gray-800/50 border border-red-500/30 rounded-xl hover:border-red-500 transition-all group">
                        <div class="flex items-start space-x-4">
                            <div class="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 text-2xl">⚠</div>
                            <div>
                                <h3 class="text-xl font-semibold mb-2 text-red-400 group-hover:text-red-300">${problem.title}</h3>
                                <p class="text-gray-400">${problem.desc}</p>
                            </div>
                        </div>
                    </div>`;
            });

            // Render How It Works
            const worksContainer = document.getElementById('how-it-works-container');
            data.howItWorks.forEach(item => {
                worksContainer.innerHTML += `
                    <div class="text-center group">
                        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-emerald-500/50 group-hover:scale-110 transition-transform text-white">
                            ${item.step}
                        </div>
                        <h3 class="text-xl font-semibold mb-3 text-emerald-400">${item.title}</h3>
                        <p class="text-gray-400">${item.desc}</p>
                    </div>`;
            });

            // Render Utility
            const utilityContainer = document.getElementById('utility-container');
            data.utility.forEach(item => {
                utilityContainer.innerHTML += `
                    <div class="p-8 bg-gray-900/80 rounded-2xl border border-emerald-500/30 hover:border-emerald-500 transition-all">
                        <div class="text-5xl mb-4">${item.icon}</div>
                        <h3 class="text-2xl font-semibold mb-3 text-emerald-400">${item.title}</h3>
                        <p class="text-gray-400">${item.desc}</p>
                    </div>`;
            });

            // Render Roadmap
            const roadmapContainer = document.getElementById('roadmap-container');
            data.roadmap.forEach(item => {
                roadmapContainer.innerHTML += `
                    <div class="flex items-start space-x-6 p-6 bg-gray-900/80 rounded-2xl border border-emerald-500/30 hover:border-emerald-500 transition-all">
                        <div class="flex-shrink-0 w-24 text-center">
                            <div class="text-sm font-semibold text-emerald-400 mb-2">${item.phase}</div>
                            <div class="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 inline-block">${item.status}</div>
                        </div>
                        <div class="flex-grow">
                            <h3 class="text-2xl font-semibold mb-2 text-emerald-400">${item.title}</h3>
                            <p class="text-gray-400">${item.desc}</p>
                        </div>
                    </div>`;
            });

            // Render Trust
            const trustContainer = document.getElementById('trust-container');
            data.trust.forEach(item => {
                trustContainer.innerHTML += `
                    <div class="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-emerald-500/30">
                        <h3 class="text-2xl font-semibold mb-4 text-emerald-400">${item.title}</h3>
                        <p class="text-gray-400">${item.desc}</p>
                    </div>`;
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));


    // --- 3. Scanner Functionality ---
    const scanBtn = document.getElementById('scan-btn');
    const scanInput = document.getElementById('scan-input');
    const scanLoader = document.getElementById('scan-loader');
    const scanResult = document.getElementById('scan-result');

    scanBtn.addEventListener('click', () => {
        if (!scanInput.value.trim()) return;

        // UI Updates
        scanBtn.disabled = true;
        scanBtn.textContent = 'Scanning On-Chain Data...';
        scanLoader.classList.remove('hidden');
        scanResult.classList.add('hidden');
        scanResult.innerHTML = ''; // Clear previous

        setTimeout(() => {
            // Simulation Logic
            const riskScore = Math.floor(Math.random() * 100);
            let riskLevel = 'Low';
            let color = '#10b981'; // Green
            
            if (riskScore > 70) {
                riskLevel = 'High';
                color = '#ef4444'; // Red
            } else if (riskScore > 40) {
                riskLevel = 'Medium';
                color = '#f59e0b'; // Amber
            }

            const mintAuthority = Math.random() > 0.5 ? 'Revoked' : 'Active';
            const mintColor = mintAuthority === 'Revoked' ? '#10b981' : '#ef4444';
            
            const isLocked = Math.random() > 0.5;
            const lockedColor = isLocked ? '#10b981' : '#ef4444';
            
            const deployerRep = Math.random() > 0.3 ? 'Verified' : 'Unknown';
            const repColor = deployerRep === 'Verified' ? '#10b981' : '#f59e0b';

            // Generate Result HTML
            const resultHTML = `
                <div class="text-center p-6 bg-gray-800 rounded-xl border-2 border-emerald-500">
                    <div class="text-6xl font-bold mb-2" style="color: ${color}">${riskScore}</div>
                    <div class="text-xl font-semibold" style="color: ${color}">${riskLevel} Risk</div>
                </div>

                <div class="grid md:grid-cols-2 gap-4">
                    <div class="p-4 bg-gray-800 rounded-lg">
                        <div class="text-sm text-gray-400 mb-1">Mint Authority</div>
                        <div class="text-lg font-semibold" style="color: ${mintColor}">${mintAuthority}</div>
                    </div>
                    
                    <div class="p-4 bg-gray-800 rounded-lg">
                        <div class="text-sm text-gray-400 mb-1">Holder Concentration</div>
                        <div class="text-lg font-semibold">${Math.floor(Math.random() * 100)}%</div>
                    </div>
                    
                    <div class="p-4 bg-gray-800 rounded-lg">
                        <div class="text-sm text-gray-400 mb-1">Liquidity Status</div>
                        <div class="text-lg font-semibold" style="color: ${lockedColor}">${isLocked ? 'Locked' : 'Unlocked'}</div>
                    </div>
                    
                    <div class="p-4 bg-gray-800 rounded-lg">
                        <div class="text-sm text-gray-400 mb-1">Token Age</div>
                        <div class="text-lg font-semibold">${Math.floor(Math.random() * 365)} days</div>
                    </div>
                    
                    <div class="p-4 bg-gray-800 rounded-lg md:col-span-2">
                        <div class="text-sm text-gray-400 mb-1">Deployer Reputation</div>
                        <div class="text-lg font-semibold" style="color: ${repColor}">${deployerRep}</div>
                    </div>
                </div>
            `;

            scanResult.innerHTML = resultHTML;
            
            // Reset UI
            scanLoader.classList.add('hidden');
            scanResult.classList.remove('hidden');
            scanBtn.disabled = false;
            scanBtn.textContent = 'Analyze Token';

        }, 2500);
    });

    // --- 4. Contact Form Functionality ---
    const contactBtn = document.getElementById('contact-btn');
    const successMsg = document.getElementById('contact-success');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-message');

    contactBtn.addEventListener('click', () => {
        if (!nameInput.value || !emailInput.value || !msgInput.value) return;

        // Show Success
        successMsg.classList.remove('hidden');
        
        // Reset after 3 seconds
        setTimeout(() => {
            successMsg.classList.add('hidden');
            nameInput.value = '';
            emailInput.value = '';
            msgInput.value = '';
        }, 3000);
    });
});
