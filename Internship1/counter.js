document.addEventListener('DOMContentLoaded', () => {
    const counterDisplay = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');

    let count = 0;

    function updateDOM() {
        counterDisplay.textContent = count;

        // Visual hook: shift to rich brand gold when items are added
        if (count > 0) {
            counterDisplay.style.color = 'var(--gold-accent)';
        } else {
            counterDisplay.style.color = 'var(--espresso-dark)';
        }

        // Keep the decrement button completely locked at zero
        decrementBtn.disabled = (count <= 0);
    }

    incrementBtn.addEventListener('click', () => {
        count++;
        updateDOM();
    });

    decrementBtn.addEventListener('click', () => {
        if (count > 0) {
            count--;
            updateDOM();
        }
    });

    resetBtn.addEventListener('click', () => {
        count = 0;
        updateDOM();
    });

    // Run initialization setup
    updateDOM();
});