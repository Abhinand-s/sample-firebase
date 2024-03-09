document.addEventListener('DOMContentLoaded', async function() {
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBbGYWVv4s1enraDtocRXli9-9OSx9Yhzs",
        authDomain: "firestore-sample-2590c.firebaseapp.com",
        projectId: "firestore-sample-2590c",
        storageBucket: "firestore-sample-2590c.appspot.com",
        messagingSenderId: "697448043130",
        appId: "1:697448043130:web:6cd2bfb3312e9bdde461c3"
    };

    // Initialize Firebase
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js");
    const app = initializeApp(firebaseConfig);

    const { getFirestore, collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");

    const db = getFirestore();

    // Fetch data from Firestore
    const querySnapshot = await getDocs(collection(db, "TheBooklist"));

    var books = [];

    querySnapshot.forEach(doc => {
        books.push(doc.data());
    });

    var carousel = document.getElementById('carousel');
    var cards = document.getElementById('cards');

    books.forEach(function(book, index) {
        var carouselItem = document.createElement('div');
        carouselItem.className = 'swiper-slide slide-' + (index + 1);

        var title = document.createElement('h2');
        title.textContent = book.Title;
        carouselItem.appendChild(title);

        var author = document.createElement('p');
        author.textContent = 'By: ' + book.author;
        carouselItem.appendChild(author);

        var price = document.createElement('p');
        price.textContent = 'Price: ' + book.price;
        carouselItem.appendChild(price);

        carousel.appendChild(carouselItem);
    });

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});
