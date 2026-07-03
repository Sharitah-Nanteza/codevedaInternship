const { createApp, ref, reactive, provide, inject } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// --- Centralized State Engine ---
// Mimics a store (like Pinia/Vuex) to share data globally across isolated views
const AppStateSymbol = Symbol();

function createGlobalState() {
    const state = reactive({
        clientTier: "Private Guest",
        totalInquiriesSent: 0
    });

    const upgradeTier = (newName) => {
        if(newName.trim()) state.clientTier = newName;
    };

    const incrementInquiries = () => {
        state.totalInquiriesSent++;
    };

    return { state, upgradeTier, incrementInquiries };
}

// --- View Component 1: Home ---
const Home = {
    setup() {
        const { state, upgradeTier } = inject(AppStateSymbol);
        const inputName = ref("");
        
        const handleUpgrade = () => {
            upgradeTier(inputName.value);
            inputName.value = "";
        };

        return { state, inputName, handleUpgrade };
    },
    template: `
        <div class="page-content">
            <p class="subtitle">Welcome back, {{ state.clientTier }}</p>
            <h1>The Fine Art of Curation</h1>
            <p class="description">Experience an agile interface layer optimized for browsing premium oils and statement high jewellery lines smoothly without systemic friction.</p>
            
            <div class="state-modifier-card">
                <h3>Personalize Your Experience</h3>
                <p class="card-meta">Updating this input mutates the root state across all component views instantly.</p>
                <div class="input-inline">
                    <input v-model="inputName" placeholder="Enter your custom name/tier" @keyup.enter="handleUpgrade"/>
                    <button @click="handleUpgrade">Update Tier</button>
                </div>
            </div>
        </div>
    `
};

// --- View Component 2: About ---
const About = {
    setup() {
        const { state } = inject(AppStateSymbol);
        return { state };
    },
    template: `
        <div class="page-content">
            <p class="subtitle">Our Craft Matrix</p>
            <h1>Heritage & Architecture</h1>
            <p class="description">Nanteza merges the geometric structures of avant-garde metalwork with the sensory chemistry of old-world Arabian scent compounds.</p>
            <div class="status-banner">
                <p>Current Active Session Tier Status: <strong>{{ state.clientTier }}</strong></p>
                <p>Actions Performed This Session: <strong>{{ state.totalInquiriesSent }} interactions</strong></p>
            </div>
        </div>
    `
};

// --- View Component 3: Contact ---
const Contact = {
    setup() {
        const { state, incrementInquiries } = inject(AppStateSymbol);
        const formSubmitted = ref(false);
        const messageText = ref("");

        const submitInquiry = () => {
            if(messageText.value.trim()) {
                incrementInquiries();
                formSubmitted.value = true;
                messageText.value = "";
                setTimeout(() => { formSubmitted.value = false; }, 4000);
            }
        };

        return { state, messageText, formSubmitted, submitInquiry };
    },
    template: `
        <div class="page-content">
            <p class="subtitle">Direct Concierge Link</p>
            <h1>Secure Your Allocation</h1>
            <p class="description">Send a secure inquiry vector to our Kampala studio coordinates.</p>
            
            <div class="contact-box">
                <div v-if="formSubmitted" class="toast-success">
                    ✦ Inquiry logged for {{ state.clientTier }}! Cumulative global session count updated to {{ state.totalInquiriesSent }}.
                </div>
                <div v-else class="textarea-group">
                    <textarea v-model="messageText" placeholder="Type your portfolio request here..."></textarea>
                    <button class="submit-btn" @click="submitInquiry">Transmit Message</button>
                </div>
            </div>
        </div>
    `
};

// --- Router Definition Engine ---
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact }
];

const router = createRouter({
    history: createWebHashHistory(), // Ideal for standalone testing and static deployments
    routes,
    linkActiveClass: 'active-link' // Automatically tags current route
});

// --- Application Core Mount ---
const app = createApp({
    setup() {
        // Provide global state structure to all downstream views
        provide(AppStateSymbol, createGlobalState());
    }
});

app.use(router);
app.mount('#app');