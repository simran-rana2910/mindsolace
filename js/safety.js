/**
 * MindConsole AI - Safety SOS & 4-7-8 Guided Breathing Controller
 */

class SafetyController {
  constructor() {
    this.breathingInterval = null;
    this.breathingState = 'idle'; // inhale, hold, exhale
  }

  triggerSOSModal(crisisData = null) {
    const modal = document.getElementById('sosModal');
    if (!modal) return;

    const messageContainer = document.getElementById('sosMessageText');
    if (messageContainer) {
      if (crisisData && crisisData.triggerPhrases) {
        messageContainer.innerHTML = `
          <div style="background: rgba(244,63,94,0.15); border: 1px solid var(--accent-rose); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
            <strong>🚨 Safety Alert:</strong> We noticed you expressed deep emotional pain. Please know that your life is incredibly precious and help is immediately available. You are not alone.
          </div>
        `;
      } else {
        messageContainer.innerHTML = `
          <p style="color: var(--text-secondary); margin-bottom: 1rem;">
            If you are in distress or need someone urgent to talk to, please reach out to these free 24/7 confidential helplines right away.
          </p>
        `;
      }
    }

    modal.classList.add('active');
  }

  closeSOSModal() {
    const modal = document.getElementById('sosModal');
    if (modal) modal.classList.remove('active');
  }

  // Interactive 4-7-8 Breathing Exercise
  openBreathingTool() {
    const modal = document.getElementById('breathingModal');
    if (modal) modal.classList.add('active');
    this.startBreathingCycle();
  }

  closeBreathingTool() {
    const modal = document.getElementById('breathingModal');
    if (modal) modal.classList.remove('active');
    this.stopBreathingCycle();
  }

  startBreathingCycle() {
    const circle = document.getElementById('breathingCircle');
    const textLabel = document.getElementById('breathingTextLabel');
    const counterLabel = document.getElementById('breathingCounter');

    if (!circle || !textLabel) return;

    this.stopBreathingCycle();

    let step = 0; // 0: Inhale (4s), 1: Hold (7s), 2: Exhale (8s)
    let countdown = 4;

    textLabel.textContent = 'Inhale...';
    circle.className = 'breathing-circle inhale';
    counterLabel.textContent = countdown;

    this.breathingInterval = setInterval(() => {
      countdown--;
      counterLabel.textContent = countdown;

      if (countdown <= 0) {
        step = (step + 1) % 3;

        if (step === 0) {
          // Inhale 4s
          countdown = 4;
          textLabel.textContent = 'Inhale slowly...';
          circle.className = 'breathing-circle inhale';
        } else if (step === 1) {
          // Hold 7s
          countdown = 7;
          textLabel.textContent = 'Hold breath...';
          circle.className = 'breathing-circle hold';
        } else if (step === 2) {
          // Exhale 8s
          countdown = 8;
          textLabel.textContent = 'Exhale softly...';
          circle.className = 'breathing-circle exhale';
        }
      }
    }, 1000);
  }

  stopBreathingCycle() {
    if (this.breathingInterval) {
      clearInterval(this.breathingInterval);
      this.breathingInterval = null;
    }
  }
}

const safetyController = new SafetyController();
