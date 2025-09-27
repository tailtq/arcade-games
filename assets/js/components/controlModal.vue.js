const template = `
<!-- Controls Modal -->
<div v-if="showControlsModal" class="modal-overlay" @click="toggleControls">
    <div class="controls-modal" @click.stop>
        <div class="modal-header">
            <h3>🎮 Game Controls</h3>
            <button @click="toggleControls" class="close-btn">×</button>
        </div>
        <div class="controls-content">
            <div class="controls-section">
                <h4>Player 1</h4>
                <div class="controls-grid">
                    <div class="control-item">
                        <span>Movement</span>
                        <kbd>Arrow Keys</kbd>
                    </div>
                    <div class="control-item">
                        <span>A Button</span>
                        <kbd>Z</kbd>
                    </div>
                    <div class="control-item">
                        <span>B Button</span>
                        <kbd>X</kbd>
                    </div>
                    <div class="control-item">
                        <span>Start</span>
                        <kbd>Enter</kbd>
                    </div>
                    <div class="control-item">
                        <span>Select</span>
                        <kbd>Shift</kbd>
                    </div>
                </div>
            </div>
            <div class="controls-section">
                <h4>Emulator</h4>
                <div class="controls-grid">
                    <div class="control-item">
                        <span>Save State</span>
                        <kbd>F2</kbd>
                    </div>
                    <div class="control-item">
                        <span>Load State</span>
                        <kbd>F4</kbd>
                    </div>
                    <div class="control-item">
                        <span>Fullscreen</span>
                        <kbd>F9</kbd>
                    </div>
                    <div class="control-item">
                        <span>Screenshot</span>
                        <kbd>F12</kbd>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

export default {
    name: 'ControlModal',
    template: template,
    data() {
        return {
            showControlsModal: false,
        }
    },
    methods: {
        toggleControls() {
            this.showControlsModal = !this.showControlsModal;
        }
    }
}