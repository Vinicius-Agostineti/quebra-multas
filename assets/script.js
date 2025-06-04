/**
 * Quebra-Multas - Script Principal
 * Versão: 1.1
 * Autor: Manus
 * Data: 24/05/2025
 */

// Menu de navegação responsivo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o menu mobile
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (navbarToggle && navbarNav) {
        navbarToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('active');
        });
    }
    
    // Fechar o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.navbar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarNav.classList.contains('active')) {
                navbarNav.classList.remove('active');
            }
        });
    });
    
    // Accordion para FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', function() {
                // Fechar todos os outros itens
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar o estado do item atual
                item.classList.toggle('active');
            });
        }
    });
    
    // Lazy loading para imagens
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.classList.add('loaded');
            }
        });
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio de formulário
            const formMessage = document.querySelector('.form-message');
            
            // Aqui seria a lógica de envio real
            // Por enquanto, apenas simulamos o sucesso
            if (formMessage) {
                formMessage.textContent = 'Mensagem enviada com sucesso! Retornaremos em breve.';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                
                // Limpar o formulário
                contactForm.reset();
                
                // Esconder a mensagem após 5 segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // Animações de scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }
    
    // Smooth scroll para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o menu fixo
                    behavior: 'smooth'
                });
            }
        });
    });
});
