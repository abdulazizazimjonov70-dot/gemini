import React, { useState } from 'react';
import './App.css';

const CAR_DATA = [
  {
    id: 1,
    name: 'Chevrolet Malibu XL',
    type: 'Седан',
    price: 50,
    image: 'https://unsplash.com',
    features: ['Автомат', '2.0л T', 'Кожа']
  },
  {
    id: 2,
    name: 'Chevrolet Tracker',
    type: 'Кроссовер',
    price: 40,
    image: 'https://unsplash.com',
    features: ['Автомат', '1.2л T', 'Климат']
  },
  {
    id: 3,
    name: 'Kia K5',
    type: 'Бизнес седан',
    price: 60,
    image: 'https://unsplash.com',
    features: ['Автомат', '2.5л', 'Панорама']
  },
  {
    id: 4,
    name: 'Hyundai Santa Fe',
    type: 'Внедорожник',
    price: 75,
    image: 'https://unsplash.com',
    features: ['Автомат', '3.5л', '7 мест']
  }
];

function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCars = CAR_DATA.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookClick = (car) => {
    setSelectedCar(car);
    setBookingSuccess(false);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedCar(null);
      setBookingSuccess(false);
    }, 3000);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="navbar">
        <div className="logo">🚗 AvtoRent</div>
        <nav>
          <a href="#home">Bosh sahifa</a>
          <a href="#cars">Avtomobillar</a>
          <a href="#about">Biz haqimizda</a>
        </nav>
        <button className="cta-btn">Aloqa</button>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <h1>Siz uchun ideal avtomobil ijarasi</h1>
          <p>Toshkentda eng hamyonbop narxlarda, tez va qulay sharoitlarda mashina ijaraga oling.</p>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Mashina modeli yoki turi bo'yicha qidirish..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <main className="main-content" id="cars">
        <h2 className="section-title">Bizning avtoparkimiz</h2>
        <div className="cars-grid">
          {filteredCars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-img-wrapper">
                <img src={car.image} alt={car.name} />
              </div>
              <div className="car-info">
                <span className="car-type">{car.type}</span>
                <h3>{car.name}</h3>
                <div className="car-features">
                  {car.features.map((f, i) => (
                    <span key={i} className="feature-badge">{f}</span>
                  ))}
                </div>
                <div className="car-footer">
                  <div className="price-tag">
                    <span className="price">${car.price}</span> / kun
                  </div>
                  <button className="book-btn" onClick={() => handleBookClick(car)}>
                    Ijara olish
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredCars.length === 0 && (
            <p className="no-results">Hech qanday avtomobil topilmadi.</p>
          )}
        </div>
      </main>

      {/* Booking Modal */}
      {selectedCar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedCar(null)}>×</button>
            
            {bookingSuccess ? (
              <div className="success-message">
                <h3>🎉 Buyurtma qabul qilindi!</h3>
                <p>Tez orada operatorlarimiz siz bilan bog'lanishadi.</p>
              </div>
            ) : (
              <>
                <h3>Ijarani rasmiylashtirish</h3>
                <div className="modal-car-details">
                  <p><strong>Avtomobil:</strong> {selectedCar.name}</p>
                  <p><strong>Kunlik narx:</strong> ${selectedCar.price}</p>
                </div>
                <form onSubmit={handleConfirmBooking} className="booking-form">
                  <div className="form-group">
                    <label>Ism va Familiyangiz</label>
                    <input type="text" required placeholder="Ismingizni kiriting" />
                  </div>
                  <div className="form-group">
                    <label>Telefon raqamingiz</label>
                    <input type="tel" required placeholder="+998 (90) 123-45-67" />
                  </div>
                  <div className="form-group">
                    <label>Ijara boshlanish sanasi</label>
                    <input type="date" required />
                  </div>
                  <button type="submit" className="confirm-btn">Tasdiqlash</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer" id="about">
        <p>&copy; {new Date().getFullYear()} AvtoRent. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}

export default App;
