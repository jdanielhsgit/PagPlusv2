/* ==========================================
   XENTI - JAVASCRIPT INTERACTIVO
   ========================================== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    /* ==========================================
       NAVEGACIÓN - SMOOTH SCROLL Y ACTIVE STATE
       ========================================== */
    
    // Seleccionar todos los links de navegación
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Smooth scroll al hacer click en los links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Si el link apunta a un ID interno
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Obtener la altura del navbar para el offset
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    
                    // Calcular la posición correcta considerando el navbar fijo
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    // Scroll suave a la sección
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar el menú móvil si está abierto
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
    
    /* ==========================================
       ACTIVE LINK BASADO EN SCROLL
       ========================================== */
    
    // Función para actualizar el link activo según la posición del scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Verificar si estamos en esta sección
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover clase active de todos los links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Agregar clase active al link correspondiente
                const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Ejecutar al hacer scroll
    window.addEventListener('scroll', updateActiveLink);
    
    /* ==========================================
       NAVBAR - CAMBIO DE ESTILO AL HACER SCROLL
       ========================================== */
    
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Agregar sombra al navbar cuando se hace scroll
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = '';
        }
        
        lastScrollTop = scrollTop;
    });
    
    /* ==========================================
       BOTÓN SCROLL TO TOP
       ========================================== */
    
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Funcionalidad del botón - scroll hacia arriba
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    /* ==========================================
       FORMULARIO DE CONTACTO
       ========================================== */
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const formData = {
            nombre: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            telefono: this.querySelector('input[type="tel"]').value,
            mensaje: this.querySelector('textarea').value
        };
        
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, mediante AJAX a un servidor
        console.log('Datos del formulario:', formData);
        
        // Mostrar mensaje de éxito (simulado)
        showSuccessMessage();
        
        // Limpiar el formulario
        contactForm.reset();
    });
    
    // Función para mostrar mensaje de éxito
    function showSuccessMessage() {
        // Crear elemento de alerta
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show mt-3';
        alert.role = 'alert';
        alert.innerHTML = `
            <strong>¡Mensaje enviado!</strong> Nos pondremos en contacto con usted pronto.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Insertar después del formulario
        contactForm.parentNode.insertBefore(alert, contactForm.nextSibling);
        
        // Eliminar la alerta después de 5 segundos
        setTimeout(function() {
            alert.remove();
        }, 5000);
    }
    
    /* ==========================================
       ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
       ========================================== */
    
    // Configurar Intersection Observer para animar elementos al entrar en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar animación al elemento
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar las tarjetas de soluciones y framework
    const animatedElements = document.querySelectorAll('.solution-card, .framework-card, .partner-logo');
    
    animatedElements.forEach(element => {
        // Estado inicial
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Observar el elemento
        observer.observe(element);
    });
    
    /* ==========================================
       CONTADOR ANIMADO (OPCIONAL)
       ========================================== */
    
    // Función para animar números (útil si quieres agregar estadísticas)
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Ejemplo de uso (descomentar si se agregan contadores al HTML):
    // const counterElements = document.querySelectorAll('.counter');
    // counterElements.forEach(counter => {
    //     const target = parseInt(counter.getAttribute('data-target'));
    //     animateCounter(counter, target);
    // });
    
    /* ==========================================
       EFECTOS PARALLAX (OPCIONAL)
       ========================================== */
    
    // Efecto parallax ligero en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.001);
        }
    });
    
    /* ==========================================
       VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
       ========================================== */
    
    const emailInput = contactForm.querySelector('input[type="email"]');
    const telInput = contactForm.querySelector('input[type="tel"]');
    
    // Validar email en tiempo real
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(this.value)) {
            this.classList.add('is-invalid');
            showFieldError(this, 'Por favor ingrese un correo válido');
        } else {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            removeFieldError(this);
        }
    });
    
    // Validar teléfono en tiempo real (formato básico)
    telInput.addEventListener('blur', function() {
        const telRegex = /^[\d\s\-\+\(\)]+$/;
        
        if (this.value && !telRegex.test(this.value)) {
            this.classList.add('is-invalid');
            showFieldError(this, 'Por favor ingrese un teléfono válido');
        } else {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            removeFieldError(this);
        }
    });
    
    // Función para mostrar error en campo
    function showFieldError(field, message) {
        removeFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback d-block';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    // Función para remover error en campo
    function removeFieldError(field) {
        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    /* ==========================================
       LOGS DE CONSOLA PARA DEBUGGING
       ========================================== */
    
    console.log('✅ Xenti - JavaScript cargado correctamente');
    console.log('📱 Versión: 1.0.0');
    console.log('🚀 Todas las funcionalidades inicializadas');
    
});

/* ==========================================
   FUNCIONES UTILITARIAS GLOBALES
   ========================================== */

// Función para detectar si un elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para hacer scroll a un elemento específico
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = element.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}