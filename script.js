  // JavaScript functionality
    document.addEventListener('DOMContentLoaded', function() {
      // Navigation
      const hamburger = document.getElementById('hamburger');
      const mobileNav = document.getElementById('mobileNav');
      const overlay = document.getElementById('overlay');
      const mainNav = document.getElementById('mainNav');
      
      // Hamburger menu toggle
      hamburger.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburger.classList.toggle('active');
      });
      
      // Close mobile menu when clicking overlay
      overlay.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
      });
      
      // Close mobile menu when clicking links
      const mobileLinks = mobileNav.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileNav.classList.remove('active');
          overlay.classList.remove('active');
          hamburger.classList.remove('active');
        });
      });
      
      // Header scroll effect
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          mainNav.classList.add('scrolled');
        } else {
          mainNav.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });
      
      // Back to top functionality
      document.getElementById('backToTop').addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      // FAQ Accordion
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
          // Close all other items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current item
          item.classList.toggle('active');
        });
      });
      
      // Photo Gallery Functionality - FIXED VERSION
      const mainPhoto = document.getElementById('mainPhoto');
      const photoItems = document.querySelectorAll('.photo-item');
      
      photoItems.forEach(item => {
        item.addEventListener('click', function() {
          // Remove active class from all items
          photoItems.forEach(photo => photo.classList.remove('active'));
          
          // Add active class to clicked item
          this.classList.add('active');
          
          // Get photo source from data attribute
          const photoSrc = this.getAttribute('data-photo');
          
          // Smooth transition effect
          mainPhoto.style.opacity = '0';
          
          setTimeout(() => {
            // Update main photo
            mainPhoto.src = photoSrc;
            mainPhoto.style.opacity = '1';
          }, 300);
        });
      });
      
      // Package Selection Functionality
      const packageButtons = document.querySelectorAll('.btn-package');
      const packageSelect = document.getElementById('package');
      
      packageButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Get package data
          const packageValue = this.getAttribute('data-package');
          
          // Set the package in the form
          packageSelect.value = packageValue;
          
          // Scroll to booking form
          document.getElementById('Book-Now').scrollIntoView({
            behavior: 'smooth'
          });
        });
      });
      
      // WhatsApp Integration
      const bookingForm = document.getElementById('bookingForm');
      
      bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const package = document.getElementById('package').value;
        const participants = document.getElementById('participants').value;
        const message = document.getElementById('message').value;
        
        // Format date
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        // Create WhatsApp message
        const whatsappMessage = `Hello Gili Ocean! I would like to book a snorkeling adventure:

Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Date: ${formattedDate}
Package: ${package}
Number of Participants: ${participants}
${message ? `Special Requests: ${message}` : ''}

I'm looking forward to my underwater adventure!`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/6281234567890?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
      });
      
      // Bubble effect
      function createBubbles() {
        const header = document.querySelector('.header');
        
        setInterval(() => {
          const bubble = document.createElement('div');
          bubble.classList.add('bubble');
          
          // Random size
          const size = Math.random() * 60 + 10;
          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          
          // Random position
          const left = Math.random() * 100;
          bubble.style.left = `${left}%`;
          
          // Random animation duration
          const duration = Math.random() * 20 + 10;
          bubble.style.animationDuration = `${duration}s`;
          
          // Random delay
          const delay = Math.random() * 5;
          bubble.style.animationDelay = `${delay}s`;
          
          header.appendChild(bubble);
          
          // Remove bubble after animation
          setTimeout(() => {
            bubble.remove();
          }, (duration + delay) * 1000);
        }, 300);
      }
      
      createBubbles();
      
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerHeight = document.querySelector('.link-card').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });

      // Animate stats counting
      const statsSection = document.querySelector('.stats-section');
      const statNumbers = document.querySelectorAll('.stat-number');
      
      const animateStats = () => {
        statNumbers.forEach(stat => {
          const target = parseInt(stat.textContent);
          let current = 0;
          const increment = target / 100;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target + (stat.textContent.includes('+') ? '+' : (stat.textContent.includes('%') ? '%' : ''));
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : (stat.textContent.includes('%') ? '%' : ''));
            }
          }, 20);
        });
      };

      // Intersection Observer for stats animation
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(statsSection);
    });