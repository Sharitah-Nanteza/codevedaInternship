const { createApp, ref } = Vue;

createApp({
    setup() {
        const username = ref("");
        const profile = ref(null);
        const repos = ref([]);
        const isLoading = ref(false);
        const isTyping = ref(false);
        const errorMessage = ref("");
        let debounceTimer = null;

        // --- Custom Debounce Engine ---
        // Delays request execution until 600ms after the user finishes typing
        const onSearchInput = () => {
            errorMessage.value = "";
            if (!username.value.trim()) {
                profile.value = null;
                repos.value = [];
                isTyping.value = false;
                return;
            }
            
            isTyping.value = true;
            clearTimeout(debounceTimer);
            
            debounceTimer = setTimeout(() => {
                isTyping.value = false;
                fetchGitHubData(username.value.trim());
            }, 600); 
        };

        // --- Network Asynchronous Pipeline ---
        const fetchGitHubData = async (queryUser) => {
            isLoading.value = true;
            errorMessage.value = "";
            profile.value = null;
            repos.value = [];

            try {
                // 1. Resolve User Profile Payload Data
                const userResponse = await fetch(`https://api.github.com/users/${queryUser}`);
                
                if (userResponse.status === 404) {
                    throw new Error("Designated identifier cannot be found across GitHub registries.");
                } else if (!userResponse.ok) {
                    throw new Error("System error logging request stream. Rate limit exceeded.");
                }

                const userData = await userResponse.json();
                
                // 2. Resolve Repositories Payload Data (limit to top 4 sorted by stars)
                const reposResponse = await fetch(`https://api.github.com/users/${queryUser}/repos?per_page=10&sort=updated`);
                let repoData = [];
                if (reposResponse.ok) {
                    repoData = await reposResponse.json();
                    repoData.sort((a, b) => b.stargazers_count - a.stargazers_count);
                    repoData = repoData.slice(0, 4);
                }

                // Commit structures directly to the dynamic state variables
                profile.value = userData;
                repos.value = repoData;

            } catch (error) {
                errorMessage.value = error.message;
            } finally {
                isLoading.value = false;
            }
        };

        return {
            username,
            profile,
            repos,
            isLoading,
            isTyping,
            errorMessage,
            onSearchInput
        };
    }
}).mount('#app');