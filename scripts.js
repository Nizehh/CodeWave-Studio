document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    const planos = document.querySelector("#planos");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                header.classList.add("ativo");
            } else {
                header.classList.remove("ativo");
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(planos);

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        const header = document.querySelector("header");
        const headerHeight = header.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top + window.scrollY - headerHeight;

        smoothScrollTo(targetPosition, 1500);
    });
});

function smoothScrollTo(target, duration) {
    const start = window.scrollY;
    const distance = target - start;
    const startTime = performance.now();

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, start + distance * ease);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}