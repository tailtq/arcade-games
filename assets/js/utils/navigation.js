export default {
    methods: {
        backToHome() {
            this.$router.push('/').then(() => {
                window.location.reload(); // Reloads the entire page after navigation
            });
        },
    },
};
