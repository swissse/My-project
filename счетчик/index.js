const counters = document.querySelectorAll('[data-counter]');

if (counters) {
    counters.forEach(counter => {
        counter.addEventListener('click', e => {
            const target = e.target;

            if (target.closest('.button')) {
                let value = parseInt(target.closest('.counter').querySelector('input').value);

                if (target.classList.contains('btn-plus')) {
                    value++;
                } else {
                    --value;
                }

                target.closest('.counter').querySelector('input').value = value;
            }
        })
    })
}