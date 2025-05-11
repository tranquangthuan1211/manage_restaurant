(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

// Food data
const productData = [
    {
      id: 1,
      imageUrl: "img/menu-1.jpg",
      title: `
        <h5 class="d-flex justify-content-between border-bottom py-2 mt-2 mt-lg-0 pt-lg-0 align-items-center">
            <span class="text-start">Chicken Burger</span>
            <span class="text-primary">$115</span>
        </h5>`,
      description:`
        <small class="text-start d-flex flex-column">
            <p>
                Ingredients:<br>
                &ensp;+ Chicken<br>
                &ensp;+ Hamburger bread<br>
                &ensp;+ Unsweetened fresh milk<br>
                &ensp;+ Lemon juice<br>
                &ensp;+ Vegetables
            </p>
            <p>
                A chicken burger makes for a quick midweek meal or weekend BBQ’s with friends! Crispy seasoned chicken breast, topped with mandatory melted cheese, piled onto soft rolls with onion, avocado, lettuce, tomato and garlic mayo.
            </p>
        </small>`
    },
    {
        id: 2,
        imageUrl: "img/menu-2.jpg",
        title: `
          <h5 class="d-flex justify-content-between border-bottom py-2 mt-2 mt-lg-0 pt-lg-0 align-items-center">
              <span class="text-start">Chicken Burger</span>
              <span class="text-primary">$115</span>
          </h5>`,
        description:`
          <small class="text-start d-flex flex-column">
              <p>
                  Ingredients:<br>
                  &ensp;+ Chicken<br>
                  &ensp;+ Hamburger bread<br>
                  &ensp;+ Unsweetened fresh milk<br>
                  &ensp;+ Lemon juice<br>
                  &ensp;+ Vegetables
              </p>
              <p>
                  A chicken burger makes for a quick midweek meal or weekend BBQ’s with friends! Crispy seasoned chicken breast, topped with mandatory melted cheese, piled onto soft rolls with onion, avocado, lettuce, tomato and garlic mayo.
              </p>
          </small>`
    },
    {
        id: 3,
        imageUrl: "img/menu-3.jpg",
        title: `
          <h5 class="d-flex justify-content-between border-bottom py-2 mt-2 mt-lg-0 pt-lg-0 align-items-center">
              <span class="text-start">Chicken Burger</span>
              <span class="text-primary">$115</span>
          </h5>`,
        description:`
          <small class="text-start d-flex flex-column">
              <p>
                  Ingredients:<br>
                  &ensp;+ Chicken<br>
                  &ensp;+ Hamburger bread<br>
                  &ensp;+ Unsweetened fresh milk<br>
                  &ensp;+ Lemon juice<br>
                  &ensp;+ Vegetables
              </p>
              <p>
                  A chicken burger makes for a quick midweek meal or weekend BBQ’s with friends! Crispy seasoned chicken breast, topped with mandatory melted cheese, piled onto soft rolls with onion, avocado, lettuce, tomato and garlic mayo.
              </p>
          </small>`
    },
    {
        id: 4,
        imageUrl: "img/menu-4.jpg",
        title: `
          <h5 class="d-flex justify-content-between border-bottom py-2 mt-2 mt-lg-0 pt-lg-0 align-items-center">
              <span class="text-start">Chicken Burger</span>
              <span class="text-primary">$115</span>
          </h5>`,
        description:`
          <small class="text-start d-flex flex-column">
              <p>
                  Ingredients:<br>
                  &ensp;+ Chicken<br>
                  &ensp;+ Hamburger bread<br>
                  &ensp;+ Unsweetened fresh milk<br>
                  &ensp;+ Lemon juice<br>
                  &ensp;+ Vegetables
              </p>
              <p>
                  A chicken burger makes for a quick midweek meal or weekend BBQ’s with friends! Crispy seasoned chicken breast, topped with mandatory melted cheese, piled onto soft rolls with onion, avocado, lettuce, tomato and garlic mayo.
              </p>
          </small>`
    },
    {
        id: 5,
        imageUrl: "img/menu-5.jpg",
        title: `
          <h5 class="d-flex justify-content-between border-bottom py-2 mt-2 mt-lg-0 pt-lg-0 align-items-center">
              <span class="text-start">Chicken Burger</span>
              <span class="text-primary">$115</span>
          </h5>`,
        description:`
          <small class="text-start d-flex flex-column">
              <p>
                  Ingredients:<br>
                  &ensp;+ Chicken<br>
                  &ensp;+ Hamburger bread<br>
                  &ensp;+ Unsweetened fresh milk<br>
                  &ensp;+ Lemon juice<br>
                  &ensp;+ Vegetables
              </p>
              <p>
                  A chicken burger makes for a quick midweek meal or weekend BBQ’s with friends! Crispy seasoned chicken breast, topped with mandatory melted cheese, piled onto soft rolls with onion, avocado, lettuce, tomato and garlic mayo.
              </p>
          </small>`
    },
    {
        id: 6,
        imageUrl: "img/menu-6.jpg",
        title: `
          <h5 class="d-flex justify-content-between border-bottom py-2 mt-2 mt-lg-0 pt-lg-0 align-items-center">
              <span class="text-start">Chicken Burger</span>
              <span class="text-primary">$115</span>
          </h5>`,
        description:`
          <small class="text-start d-flex flex-column">
              <p>
                  Ingredients:<br>
                  &ensp;+ Chicken<br>
                  &ensp;+ Hamburger bread<br>
                  &ensp;+ Unsweetened fresh milk<br>
                  &ensp;+ Lemon juice<br>
                  &ensp;+ Vegetables
              </p>
              <p>
                  A chicken burger makes for a quick midweek meal or weekend BBQ’s with friends! Crispy seasoned chicken breast, topped with mandatory melted cheese, piled onto soft rolls with onion, avocado, lettuce, tomato and garlic mayo.
              </p>
          </small>`
    },
    {
        id: 7,
        imageUrl: "img/menu-7.jpg",
        title: `
          <h5 class="d-flex justify-content-between border-bottom py-2 mt-2 mt-lg-0 pt-lg-0 align-items-center">
              <span class="text-start">Chicken Burger</span>
              <span class="text-primary">$115</span>
          </h5>`,
        description:`
          <small class="text-start d-flex flex-column">
              <p>
                  Ingredients:<br>
                  &ensp;+ Chicken<br>
                  &ensp;+ Hamburger bread<br>
                  &ensp;+ Unsweetened fresh milk<br>
                  &ensp;+ Lemon juice<br>
                  &ensp;+ Vegetables
              </p>
              <p>
                  A chicken burger makes for a quick midweek meal or weekend BBQ’s with friends! Crispy seasoned chicken breast, topped with mandatory melted cheese, piled onto soft rolls with onion, avocado, lettuce, tomato and garlic mayo.
              </p>
          </small>`
    },
    {
        id: 8,
        imageUrl: "img/menu-8.jpg",
        title: `
          <h5 class="d-flex justify-content-between border-bottom py-2 mt-2 mt-lg-0 pt-lg-0 align-items-center">
              <span class="text-start">Chicken Burger</span>
              <span class="text-primary">$115</span>
          </h5>`,
        description:`
          <small class="text-start d-flex flex-column">
              <p>
                  Ingredients:<br>
                  &ensp;+ Chicken<br>
                  &ensp;+ Hamburger bread<br>
                  &ensp;+ Unsweetened fresh milk<br>
                  &ensp;+ Lemon juice<br>
                  &ensp;+ Vegetables
              </p>
              <p>
                  A chicken burger makes for a quick midweek meal or weekend BBQ’s with friends! Crispy seasoned chicken breast, topped with mandatory melted cheese, piled onto soft rolls with onion, avocado, lettuce, tomato and garlic mayo.
              </p>
          </small>`
    }
  ];
  
  // Show basing on ID
  function showDescription(productId) {
    const product = productData.find(p => p.id === productId);
  
    if (product) {
      document.getElementById("productImage").src = product.imageUrl;
      document.getElementById("productTitle").innerHTML = product.title;
      document.getElementById("productDescription").innerHTML = product.description;
  
      const descriptionBox = document.getElementById("descriptionBox");
      const overlay = document.getElementById("overlay");

      descriptionBox.classList.add("show");
      overlay.classList.add("show");
      document.body.classList.add("no-scroll");
    }
  }
  
  // Close description
  function closeDescription() {
    const descriptionBox = document.getElementById("descriptionBox");
    const overlay = document.getElementById("overlay");

    descriptionBox.classList.remove("show");
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }

  async function addToCart(productId){
    console.log("Adding product to cart: " + productId);
    const response = await fetch(`/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({productId: productId}),
    });
    if (response.ok) {
        const result = await response.json();
        if (typeof result.count != 'undefined' && result.count != null){
            updateCartProductCount(result.count);
        }
    } else {
        const err = await response.json();
        alert(err);
    }
  }

  async function updateCartProductCount(newCount){
    const cartProductCount = document.getElementById("cartProductCount");
    if (cartProductCount == null){
        return;
    }
    cartProductCount.innerHTML = newCount;
    if (newCount == 0){
        cartProductCount.style.display = 'none';
    } else {
        cartProductCount.style.display = 'block';
    }
  }

  async function fetchCartProductCount(){
    const cartProductCount = document.getElementById("cartProductCount");
    if (cartProductCount == null){
        console.log("Cart product count element not found");
        return;
    }
    const response = await fetch(`/cart/countAll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const result = await response.json();
        if (typeof result.count != 'undefined' && result.count != null){
            updateCartProductCount(result.count);
        }
    } else {
        const err = await response.json();
    }
  }

  document.addEventListener('DOMContentLoaded', fetchCartProductCount());