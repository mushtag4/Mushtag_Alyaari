/**
 * Sidebar Toggle Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    const menuItems = document.querySelectorAll('.menu-item');

    // Toggle sidebar on button click
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close sidebar when clicking menu link (mobile only)
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Update active menu item
            menuItems.forEach(item => item.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Update active menu item based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        menuItems.forEach(function(item) {
            item.classList.remove('active');
            const link = item.querySelector('.menu-link');
            if (link && link.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });
});
