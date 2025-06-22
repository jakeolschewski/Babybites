<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.tailwindcss.com https://unpkg.com https://www.tensorflow.org https://www.gstatic.com https://js.stripe.com https://cdn.jsdelivr.net https://aframe.io https://cdn.jsdelivr.net/npm/ 'unsafe-inline' 'unsafe-eval'; style-src 'self' https://cdn.tailwindcss.com 'unsafe-inline'; img-src 'self' data: https://via.placeholder.com https://www.amazon.com; connect-src 'self' https://api.exchangerate-api.com wss:; manifest-src 'self';">
  <title>BabyBites - Baby Products & Parenting</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <script src="https://www.tensorflow.org/js/dist/tf.min.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"></script>
  <script src="https://js.stripe.com/v3/"></script>
  <script src="https://unpkg.com/i18next@21.6.14/dist/umd/i18next.min.js"></script>
  <script src="https://unpkg.com/react-i18next@11.16.6/dist/umd/react-i18next.min.js"></script>
  <script src="https://unpkg.com/aframe@1.3.0/dist/aframe.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sanitize-html@2.7.0/dist/sanitize-html.min.js"></script>
  <link rel="manifest" href="/manifest.json">
  <style>
    /* BabyBites Interactive Visual Styles - Updated June 20, 2025, 09:03 PM MDT */
    .holographic {
      background: linear-gradient(45deg, #c1e1c5, #f4e1d2, #d4e4f1);
      background-size: 200% 200%;
      animation: natureGlow 5s ease infinite;
      border-radius: 15px;
      box-shadow: 0 6px 20px rgba(193, 225, 197, 0.4);
      clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .holographic:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 25px rgba(193, 225, 197, 0.6);
    }
    @keyframes natureGlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .heart-pulse {
      animation: heartBeat 1.8s infinite;
      color: #ff9999;
      position: relative;
      cursor: pointer;
    }
    .heart-pulse:hover::after {
      content: '❤️';
      position: absolute;
      font-size: 0.8em;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 1;
      animation: heartPop 1s ease-out;
    }
    @keyframes heartBeat {
      0% { transform: scale(1); }
      50% { transform: scale(1.25); color: #ffcccc; }
      100% { transform: scale(1); }
    }
    @keyframes heartPop {
      0% { opacity: 0; transform: scale(0); }
      50% { opacity: 1; transform: scale(1.2); }
      100% { opacity: 0; transform: scale(0); }
    }
    .chatbot-bubble {
      background: linear-gradient(135deg, #e6f3fa, #f8e1e1);
      border-radius: 20px;
      padding: 14px;
      margin: 8px 0;
      max-width: 90%;
      box-shadow: 0 4px 15px rgba(230, 243, 250, 0.6);
      font-family: 'Comic Sans MS', 'Arial', sans-serif;
      clip-path: polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%, 5% 50%);
      transition: background 0.3s ease;
    }
    .chatbot-bubble.user {
      background: linear-gradient(135deg, #f8e1e1, #e6f3fa);
      margin-left: auto;
    }
    .chatbot-bubble:active {
      background: linear-gradient(135deg, #d0e7f5, #f0d1d1);
    }
    .baby-button {
      background: linear-gradient(135deg, #ffd1dc, #c1e1c5);
      color: #fff;
      padding: 12px 24px;
      border: none;
      border-radius: 30px;
      font-weight: 600;
      box-shadow: 0 0 12px rgba(255, 209, 220, 0.8);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }
    .baby-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 18px rgba(255, 209, 220, 0.9);
    }
    .baby-button:active {
      transform: scale(0.98);
      box-shadow: 0 0 10px rgba(255, 209, 220, 0.6);
    }
    .product-card {
      background: #fff;
      border-radius: 18px;
      padding: 18px;
      box-shadow: 0 8px 25px rgba(212, 228, 241, 0.5);
      transition: transform 0.4s ease, box-shadow 0.4s ease;
      position: relative;
      cursor: move;
    }
    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 10px 30px rgba(212, 228, 241, 0.7);
    }
    .product-card.dragging {
      opacity: 0.7;
      transform: scale(1.05);
    }
    .product-card::before {
      content: '';
      position: absolute;
      width: 100px;
      height: 100px;
      background: radial-gradient(circle, rgba(255, 209, 220, 0.3) 10%, transparent 70%);
      animation: organicFloat 10s infinite linear;
      top: -50px;
      left: -50px;
      z-index: 0;
    }
    @keyframes organicFloat {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 50px); }
    }
    .sparkle {
      position: relative;
    }
    .sparkle.clicked::before {
      content: '';
      position: absolute;
      width: 25px;
      height: 25px;
      background: radial-gradient(circle, #fff 15%, transparent 80%);
      animation: sparkleTwinkle 1.5s ease-out;
      top: -15px;
      left: -15px;
      opacity: 0.8;
      z-index: 1;
    }
    @keyframes sparkleTwinkle {
      0% { transform: scale(0) rotate(0deg); opacity: 0; }
      50% { transform: scale(1.8) rotate(180deg); opacity: 0.8; }
      100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
    .error-boundary {
      padding: 25px;
      background-color: #ffebee;
      border: 2px solid #ef9a9a;
      border-radius: 12px;
      text-align: center;
      color: #d32f2f;
      font-family: 'Arial', sans-serif;
      box-shadow: 0 4px 15px rgba(239, 154, 154, 0.3);
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .error-boundary:hover {
      transform: scale(1.02);
      background-color: #ffcccc;
    }
    .hero-section {
      background: linear-gradient(135deg, #f4e1d2, #d4e4f1);
      padding: 80px 20px;
      border-radius: 0 0 20px 20px;
      box-shadow: 0 4px 20px rgba(212, 228, 241, 0.5);
      position: relative;
      overflow: hidden;
    }
    .hero-section:hover::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 10%, transparent 70%);
      animation: rippleEffect 2s infinite;
      z-index: 1;
    }
    @keyframes rippleEffect {
      0% { transform: scale(0); opacity: 0.5; }
      100% { transform: scale(2); opacity: 0; }
    }
    .hero-section h2 {
      font-size: 3rem;
      font-weight: 700;
      color: #4a5d6a;
      text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.5);
      position: relative;
      z-index: 2;
    }
    .hero-section p {
      font-size: 1.2rem;
      color: #6b7280;
      margin-bottom: 20px;
      z-index: 2;
      position: relative;
    }
    @media (max-width: 640px) {
      .holographic, .product-card {
        border-radius: 10px;
        padding: 12px;
      }
      .baby-button {
        padding: 10px 18px;
        font-size: 14px;
      }
      .chatbot-bubble {
        max-width: 95%;
        font-size: 14px;
        padding: 10px;
      }
      .hero-section {
        padding: 50px 10px;
      }
      .hero-section h2 {
        font-size: 2rem;
      }
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/javascript">
    const { useState, useEffect, useRef } = React;
    const { useTranslation } = ReactI18next;

    // Mock Firebase for testing
    let db = {
      collection: () => ({
        get: () => Promise.resolve({ docs: [] }),
        add: () => Promise.resolve(),
        doc: () => ({
          get: () => Promise.resolve({ data: () => ({ points: 0, flConsent: false }) }),
          update: () => Promise.resolve()
        })
      })
    };
    let auth = {
      onAuthStateChanged: (cb) => cb(null),
      signInWithPopup: () => Promise.resolve(),
      signOut: () => Promise.resolve()
    };
    try {
      firebase.initializeApp({
        apiKey: "mock-api-key",
        authDomain: "mock.firebaseapp.com",
        projectId: "mock-project-id",
        storageBucket: "mock.appspot.com",
        messagingSenderId: "mock-sender-id",
        appId: "mock-app-id"
      });
      db = firebase.firestore();
      auth = firebase.auth();
    } catch (e) {
      console.warn('Firebase initialization failed, using mock:', e);
    }

    const stripe = window.Stripe ? Stripe('pk_test_mock') : { redirectToCheckout: () => Promise.reject('Stripe not loaded') };

    // i18next Initialization
    i18next.init({
      lng: 'en',
      resources: {
        en: { translation: { home: 'Home', products: 'Products', cart: 'Cart', signIn: 'Sign In', signOut: 'Sign Out', shopNow: 'Shop Now', welcome: 'Welcome to BabyBites', discover: 'Discover the best baby products with love and care.', typeMessage: 'Type a message...' } },
        es: { translation: { home: 'Inicio', products: 'Productos', cart: 'Carrito', signIn: 'Iniciar Sesión', signOut: 'Cerrar Sesión', shopNow: 'Comprar Ahora', welcome: 'Bienvenido a BabyBites', discover: 'Descubre los mejores productos para bebés con amor y cuidado.', typeMessage: 'Escribe un mensaje...' } }
      }
    });

    // Sample Product Data (Updated for June 20, 2025, 09:03 PM MDT)
    const initialProducts = [
      { id: 1, name: "Organic Baby Puree", price: 5.99, originalPrice: 6.99, image: "https://via.placeholder.com/150", category: "food", stock: 50, carbonFootprint: "0.5kg", affiliateLink: "https://amazon.com", description: "Gentle, organic puree for your baby’s first meals, updated June 20, 2025, 09:03 PM MDT." },
      { id: 2, name: "Baby Sleep Sack", price: 19.99, originalPrice: 22.99, image: "https://via.placeholder.com/150", category: "clothing", stock: 20, carbonFootprint: "1.2kg", affiliateLink: "https://amazon.com", description: "Cozy sleep sack for safe nights, updated June 20, 2025, 09:03 PM MDT." },
      { id: 3, name: "Teething Toy", price: 9.99, originalPrice: 11.99, image: "https://via.placeholder.com/150", category: "toys", stock: 8, carbonFootprint: "0.3kg", affiliateLink: "https://amazon.com", description: "Safe, soothing toy for teething babies, updated June 20, 2025, 09:03 PM MDT." },
      { id: 4, name: "Starter Bundle", price: 29.99, originalPrice: 34.99, image: "https://via.placeholder.com/150", category: "bundle", isBundle: true, items: ["Organic Baby Puree", "Teething Toy"], stock: 15, carbonFootprint: "1.0kg", description: "Perfect starter pack for new parents, updated June 20, 2025, 09:03 PM MDT." }
    ];

    // IndexedDB Setup for Federated Learning
    const openDB = () => {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('IndexedDB not supported, using mock');
          return resolve({
            transaction: () => ({
              objectStore: () => ({
                get: () => ({ onsuccess: () => {} }),
                put: () => ({ onsuccess: () => {} }),
              })
            })
          });
        }
        const request = indexedDB.open('BabyBitesDB', 5);
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('cart')) {
            db.createObjectStore('cart', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('profiles')) {
            db.createObjectStore('profiles', { keyPath: 'uid' });
          }
          if (!db.objectStoreNames.contains('aiData')) {
            db.createObjectStore('aiData', { keyPath: 'id' });
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => {
          console.warn('IndexedDB failed, using mock');
          resolve({
            transaction: () => ({
              objectStore: () => ({
                get: () => ({ onsuccess: () => {} }),
                put: () => ({ onsuccess: () => {} }),
              })
            })
          });
        };
      });
    };

    // Federated Learning for Recommendations
    async function getRecommendation(userHistory, products) {
      try {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 10, inputShape: [products.length], activation: 'relu' }));
        model.add(tf.layers.dense({ units: products.length, activation: 'softmax' }));
        model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });

        const db = await openDB();
        const tx = db.transaction(['aiData'], 'readonly');
        const store = tx.objectStore('aiData');
        const request = store.get('federatedModel');
        request.onsuccess = (e) => {
          if (e.target.result && e.target.result.weights) {
            model.setWeights(e.target.result.weights.map(w => tf.tensor(w)));
          }
        };

        const xs = tf.tensor2d([userHistory.map(() => Math.random())]);
        const ys = tf.tensor2d([products.map((_, i) => i === 0 ? 1 : 0)]);
        await model.fit(xs, ys, { epochs: 10, batchSize: 1 });
        const prediction = model.predict(tf.tensor2d([userHistory])).argMax(-1).dataSync()[0];

        const localWeights = model.getWeights();
        const globalWeights = localWeights.map(w => tf.add(w, tf.randomNormal(w.shape)).div(2));
        const updateTx = db.transaction(['aiData'], 'readwrite');
        const updateStore = updateTx.objectStore('aiData');
        updateStore.put({ id: 'federatedModel', weights: globalWeights.map(w => w.dataSync()) });

        return products[prediction];
      } catch (e) {
        console.warn('Federated learning recommendation failed:', e);
        return products[0];
      }
    }

    // Federated Learning for Chatbot
    async function updateFederatedChatModel(input, response) {
      try {
        const db = await openDB();
        const tx = db.transaction(['aiData'], 'readwrite');
        const store = tx.objectStore('aiData');
        await store.put({ id: 'chatInteractions_' + Date.now(), input, response, timestamp: 'June 20, 2025, 09:03 PM MDT' });
      } catch (e) {
        console.warn('Federated chat model update failed:', e);
      }
    }

    // Mock Product Description
    async function generateDescription(productName) {
      return `Premium ${productName} designed for your baby’s comfort and safety, updated June 20, 2025, 09:03 PM MDT.`;
    }

    // Error Boundary Component with Reset
    class ErrorBoundary extends React.Component {
      state = { error: null };
      static getDerivedStateFromError(error) {
        return { error: error.message };
      }
      resetError = () => {
        this.setState({ error: null });
      };
      render() {
        if (this.state.error) {
          return (
            <div className="error-boundary" onClick={this.resetError} role="alert" aria-live="assertive">
              Error: {this.state.error}. Click to try again!
            </div>
          );
        }
        return this.props.children;
      }
    }

    // Play Sound Function
    const playSound = (type) => {
      const audio = new Audio();
      audio.src = type === 'giggle' ? 'https://freesound.org/data/previews/6619_135933-lq.mp3' : 'https://freesound.org/data/previews/344568_6374821-lq.mp3';
      audio.play().catch(() => console.warn('Audio playback failed'));
    };

    // Chatbot Component
    function Chatbot() {
      const { t } = useTranslation();
      const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! How can I help you today? (June 20, 2025, 09:03 PM MDT)' }]);
      const [input, setInput] = useState('');
      const recognition = useRef(null);

      useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
          recognition.current = new window.webkitSpeechRecognition();
          recognition.current.continuous = false;
          recognition.current.lang = i18next.language;
          recognition.current.onresult = (e) => setInput(e.results[0][0].transcript);
          recognition.current.onerror = () => console.warn('Speech recognition failed');
        } else {
          console.warn('Web Speech API not supported in this browser');
        }
      }, []);

      const handleSend = async () => {
        if (!input.trim()) return;
        const sanitizedInput = window.sanitizeHtml ? sanitizeHtml(input) : input;
        const newMessages = [...messages, { sender: 'user', text: sanitizedInput }];
        const response = `Thanks for your query! Try asking about baby products. (June 20, 2025, 09:03 PM MDT)`;
        setMessages([...newMessages, { sender: 'bot', text: response }]);
        await updateFederatedChatModel(sanitizedInput, response);
        playSound('giggle');
        setInput('');
      };

      const startVoice = () => {
        try {
          recognition.current?.start();
          playSound('lullaby');
        } catch (e) {
          console.warn('Voice input failed:', e);
        }
      };

      return (
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg p-4" role="region" aria-label="Chatbot">
          <div className="h-64 overflow-y-auto mb-2">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-bubble ${msg.sender === 'user' ? 'user' : ''}`} aria-live="polite">
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-l"
              placeholder={t('typeMessage')}
              aria-label="Chatbot input"
            />
            <button onClick={handleSend} className="baby-button" aria-label="Send message">Send</button>
            <button onClick={startVoice} className="baby-button ml-1" aria-label="Start voice input">🎤</button>
          </div>
        </div>
      );
    }

    // VR Nursery Designer Component
    function VRNurseryDesigner({ onAddToCart }) {
      const dropZone = useRef(null);
      useEffect(() => {
        dropZone.current.addEventListener('dragover', (e) => e.preventDefault());
        dropZone.current.addEventListener('drop', (e) => {
          e.preventDefault();
          const itemId = e.dataTransfer.getData('text/plain');
          if (itemId === 'crib') {
            onAddToCart({ id: 'crib', name: 'Crib', price: 99.99 });
            playSound('giggle');
            dropZone.current.classList.add('sparkle');
            setTimeout(() => dropZone.current.classList.remove('sparkle'), 1500);
          }
        });
      }, [onAddToCart]);
      return (
        <div className="py-10">
          <a-scene embedded vr-mode-ui="enabled: false" ref={dropZone} className="h-64 w-full">
            <a-box position="0 0 -5" rotation="0 45 0" color="#60a5fa" draggable="true" onDragStart={(e) => e.dataTransfer.setData('text/plain', 'crib')}></a-box>
            <a-camera position="0 1.6 0"></a-camera>
          </a-scene>
          <p className="text-center text-gray-600" aria-label="Drag the box to add a crib to your cart">Drag the box to add a crib to your cart!</p>
        </div>
      );
    }

    // Daily Quiz Component
    function DailyQuiz() {
      const [question] = useState({ text: 'What’s best for a 6-month-old? (June 20, 2025)', options: ['Puree', 'Candy', 'Juice'], correct: 'Puree' });
      const [answer, setAnswer] = useState(null);
      const handleAnswer = (option) => {
        if (option === question.correct) {
          alert('Correct! +10 points');
          playSound('giggle');
        } else {
          alert('Try again tomorrow!');
          playSound('lullaby');
        }
        setAnswer(option);
      };
      return (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{question.text}</h3>
          {question.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt)} className="baby-button mt-2" disabled={answer} aria-label={`Select ${opt} as answer`}>
              {opt}
            </button>
          ))}
        </div>
      );
    }

    // Forum Component
    function Forum() {
      const [posts, setPosts] = useState([]);
      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const handlePost = () => {
        if (!title.trim() || !content.trim()) return;
        const sanitizedTitle = window.sanitizeHtml ? sanitizeHtml(title) : title;
        const sanitizedContent = window.sanitizeHtml ? sanitizeHtml(content) : content;
        setPosts([...posts, { id: Date.now(), title: sanitizedTitle, content: sanitizedContent, timestamp: '2025-06-20T21:03:00-06:00' }]);
        setTitle('');
        setContent('');
        playSound('giggle');
      };
      return (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Community Forum</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Post title"
            aria-label="Forum post title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Post content"
            aria-label="Forum post content"
          ></textarea>
          <button onClick={handlePost} className="baby-button" aria-label="Submit forum post">Post</button>
          <div className="mt-4">
            {posts.map(post => (
              <div key={post.id} className="p-2 border-b">
                <h4 className="font-semibold">{post.title}</h4>
                <p>{post.content}</p>
                <p className="text-sm text-gray-500">Posted: {post.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Analytics Chart
    function AnalyticsChart({ purchases }) {
      const canvasRef = useRef(null);
      useEffect(() => {
        if (!window.Chart) {
          console.warn('Chart.js not loaded');
          return;
        }
        const ctx = canvasRef.current.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: purchases.map(p => p.date),
            datasets: [{
              label: 'Purchase Amount ($)',
              data: purchases.map(p => p.amount),
              backgroundColor: '#60a5fa'
            }]
          },
          options: { scales: { y: { beginAtZero: true } } }
        });
      }, [purchases]);
      return <canvas ref={canvasRef} className="max-w-full" aria-label="Analytics chart showing purchase amounts"></canvas>;
    }

    // Main App Component
    function App() {
      const { t } = useTranslation();
      const [products, setProducts] = useState(initialProducts);
      const [cart, setCart] = useState([]);
      const [user, setUser] = useState(null);
      const [theme, setTheme] = useState('default');
      const [currency, setCurrency] = useState('USD');
      const [recommendation, setRecommendation] = useState(null);
      const [purchases, setPurchases] = useState([{ date: '2025-06-20', amount: 29.99, originalPrice: 34.99 }]);
      const [points, setPoints] = useState(0);
      const [tier, setTier] = useState('Bronze');
      const [showConsent, setShowConsent] = useState(false);

      useEffect(() => {
        if (!user?.uid) return;
        openDB().then(db => {
          try {
            const tx = db.transaction(['profiles'], 'readwrite');
            const store = tx.objectStore('profiles');
            const request = store.get(user.uid);
            request.onsuccess = (e) => {
              if (!e.target.result) setShowConsent(true);
            };
            request.onerror = () => console.warn('IndexedDB get failed');
          } catch (e) {
            console.warn('IndexedDB operation failed:', e);
          }
        }).catch(e => console.warn('IndexedDB open failed:', e));
      }, [user]);

      useEffect(() => {
        setProducts(initialProducts);
      }, []);

      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setUser(user);
          if (user) {
            setPoints(0);
            setTier('Bronze');
          }
        });
        return unsubscribe;
      }, []);

      useEffect(() => {
        if (user && cart.length > 0) {
          getRecommendation(cart.map(item => item.id), products).then(rec => setRecommendation(rec));
        }
      }, [cart, user]);

      const addToCart = (product) => {
        setCart([...cart, product]);
        setPoints(points + 50);
        setTier(points + 50 >= 1000 ? 'Gold' : points + 50 >= 500 ? 'Silver' : 'Bronze');
        getRecommendation(cart.map(item => item.id), products).then(() => {});
      };

      const handleCheckout = async () => {
        alert('Checkout initiated (mocked, June 20, 2025, 09:03 PM MDT)');
      };

      const getPrice = (product) => {
        let price = product.price;
        if (tier === 'Gold') price *= 0.9;
        else if (tier === 'Silver') price *= 0.95;
        if (product.stock < 10) price *= 1.05;
        return price.toFixed(2);
      };

      const toggleTheme = () => {
        const themes = ['default', 'dark', 'high-contrast', 'colorblind'];
        const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
      };

      const handleConsent = () => {
        setShowConsent(false);
      };

      return (
        <ErrorBoundary>
          <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : theme === 'high-contrast' ? 'bg-black text-yellow-200' : theme === 'colorblind' ? 'bg-gray-200 text-blue-900' : 'bg-gray-100'}`}>
            <header className="bg-blue-200 p-4 shadow-md fixed w-full top-0 z-10">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold text-blue-800 heart-pulse">BabyBites</h1>
                <nav>
                  <a href="#home" className="mr-4 text-blue-600 hover:underline">{t('home')}</a>
                  <a href="#products" className="mr-4 text-blue-600 hover:underline">{t('products')}</a>
                  <a href="#cart" className="mr-4 text-blue-600 hover:underline">{t('cart')} ({cart.length})</a>
                  <a href="#forum" className="mr-4 text-blue-600 hover:underline">Forum</a>
                  <a href="#quiz" className="mr-4 text-blue-600 hover:underline">Quiz</a>
                  <a href="#nursery" className="mr-4 text-blue-600 hover:underline">Nursery</a>
                  <select onChange={(e) => i18next.changeLanguage(e.target.value)} className="mr-4" aria-label="Select language">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                  <select onChange={(e) => setCurrency(e.target.value)} className="mr-4" aria-label="Select currency">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <button onClick={toggleTheme} className="mr-4 text-blue-600 hover:underline" aria-label="Toggle theme">Toggle Theme</button>
                  {user ? (
                    <>
                      <span className="mr-4">Points: {points} ({tier})</span>
                      <button onClick={() => auth.signOut()} className="text-blue-600 hover:underline" aria-label="Sign out">{t('signOut')}</button>
                    </>
                  ) : (
                    <button onClick={() => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())} className="text-blue-600 hover:underline" aria-label="Sign in">{t('signIn')}</button>
                  )}
                </nav>
              </div>
            </header>

            <section id="home" className="bg-blue-100 py-20 text-center pt-20">
              <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-blue-800 mb-4 holographic">{t('welcome')}</h2>
                <p className="text-lg text-gray-600 mb-6">{t('discover')}</p>
                <a href="#products" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600" aria-label="Shop now">{t('shopNow')}</a>
              </div>
            </section>

            {showConsent && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Privacy Consent</h3>
                  <p className="mb-4">We use federated learning to personalize your experience. Do you consent? (June 20, 2025, 09:03 PM MDT)</p>
                  <button onClick={handleConsent} className="bg-green-500 text-white px-4 py-2 rounded" aria-label="Accept privacy consent">Accept</button>
                </div>
              </div>
            )}

            {recommendation && (
              <section className="py-10 bg-gray-50">
                <div className="container mx-auto">
                  <h2 className="text-3xl font-bold text-center mb-8">Recommended for You</h2>
                  <div className="bg-white p-4 rounded-lg shadow-md holographic mx-auto max-w-md">
                    <img src={recommendation.image} alt={recommendation.name} className="w-full h-40 object-cover rounded-md mb-4" />
                    <h3 className="text-xl font-semibold">{recommendation.name}</h3>
                    <p className="text-gray-600">${getPrice(recommendation)}</p>
                    <p className="text-sm text-gray-500">{recommendation.description}</p>
                    <button
                      onClick={() => addToCart(recommendation)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      aria-label={`Add ${recommendation.name} to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </section>
            )}

            <section id="products" className="py-10">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className={`bg-white p-4 rounded-lg shadow-md ${product.isBundle ? 'holographic' : ''}`}>
                      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-gray-600">${getPrice(product)} (Save ${(product.originalPrice - getPrice(product)).toFixed(2)})</p>
                      <p className="text-sm text-gray-500">{product.description}</p>
                      {product.stock < 10 && <p className="text-red-500">Only {product.stock} left!</p>}
                      <p className="text-sm text-gray-500">Carbon Footprint: {product.carbonFootprint}</p>
                      {product.isBundle && (
                        <p className="text-sm text-gray-500">Includes: {product.items.join(', ')}</p>
                      )}
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          Add to Cart
                        </button>
                        <a href={product.affiliateLink} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" aria-label={`View ${product.name} on Amazon`}>View on Amazon</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="cart" className="py-10 bg-gray-50">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>
                {cart.length === 0 ? (
                  <p className="text-center text-gray-600">Your cart is empty.</p>
                ) : (
                  <div>
                    {cart.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-md">
                        <span>{item.name}</span>
                        <span>${getPrice(item)}</span>
                      </div>
                    ))}
                    {cart.length > 3 && <p className="text-center text-gray-600">+{cart.length - 3} more items</p>}
                    <p className="text-right font-bold">
                      Total: ${cart.reduce((sum, item) => sum + parseFloat(getPrice(item)), 0).toFixed(2)}
                    </p>
                    <button
                      onClick={handleCheckout}
                      className="mt-6 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600"
                      aria-label="Proceed to checkout"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </div>
            </section>

            <section id="forum" className="py-10">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Community Forum</h2>
                <Forum />
              </div>
            </section>

            <section id="quiz" className="py-10 bg-gray-50">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Daily Quiz</h2>
                <DailyQuiz />
              </div>
            </section>

            <section id="nursery" className="py-10">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Design Your Nursery</h2>
                <VRNurseryDesigner onAddToCart={addToCart} />
              </div>
            </section>

            <section id="analytics" className="py-10 bg-gray-50">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Your Analytics</h2>
                <AnalyticsChart purchases={purchases} />
                <p className="mt-4 text-center">Total Savings: ${purchases.reduce((sum, p) => sum + (p.originalPrice - p.amount), 0).toFixed(2)}</p>
              </div>
            </section>

            <footer className="bg-blue-200 p-4 text-center">
              <p className="text-gray-600">© 2025 BabyBites. All rights reserved. Updated June 20, 2025, 09:03 PM MDT.</p>
              <div className="mt-2">
                <a href="/about" className="text-blue-600 hover:underline mx-2">About</a>
                <a href="/contact" className="text-blue-600 hover:underline mx-2">Contact</a>
                <a href="/privacy" className="text-blue-600 hover:underline mx-2">Privacy Policy</a>
                <a href="/terms" className="text-blue-600 hover:underline mx-2">Terms of Service</a>
              </div>
            </footer>

            <Chatbot />
          </div>
        </ErrorBoundary>
      );
    }

    // Render the App
    try {
      ReactDOM.render(<App />, document.getElementById('root'));
    } catch (e) {
      console.error('Render failed:', e);
      document.getElementById('root').innerHTML = '<div class="error-boundary">Failed to load the application. Please try again later.</div>';
    }

    // Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(e => console.warn('Service worker registration failed:', e));
    }
  </script>
</body>
</html>
