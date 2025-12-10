<template>
  <!-- Controls Modal -->
  <div v-if="gameStore.showControlsModal" class="modal-overlay" @click="toggleControls">
    <div class="controls-modal" @click.stop>
      <div class="modal-header">
        <h3>🎮 Game Controls</h3>
        <button @click="toggleControls" class="close-btn">×</button>
      </div>
      <div class="controls-content">
        <div class="controls-section">
          <h4>🎮 Universal Game Controls</h4>
          <div class="controls-grid">
            <div class="control-item">
              <span>Movement</span>
              <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd>
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
              <span>X Button</span>
              <kbd>C</kbd>
            </div>
            <div class="control-item">
              <span>Y Button</span>
              <kbd>V</kbd>
            </div>
            <div class="control-item">
              <span>L / R Buttons</span>
              <kbd>A</kbd> / <kbd>S</kbd>
            </div>
            <div class="control-item">
              <span>L2 / R2 Buttons</span>
              <kbd>D</kbd> / <kbd>F</kbd>
            </div>
            <div class="control-item">
              <span>L3 / R3 Buttons</span>
              <kbd>Q</kbd> / <kbd>E</kbd>
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
        <div class="controls-note">
          <p>💡 <strong>Tip:</strong> These controls work for all games regardless of the console. Arrow keys always move your character, Z/X are the main action buttons.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const toggleControls = () => {
  gameStore.setShowControlsModal(!gameStore.showControlsModal)
}
</script>
