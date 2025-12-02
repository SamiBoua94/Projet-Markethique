import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-container container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Shop Ethical Products with Markethique
                    </h1>
                    <p className="hero-description">
                        Discover sustainable and ethical products from trusted sellers
                    </p>
                    <div className="hero-cta">
                        <button className="btn-primary">Browse All Categories</button>
                        <button className="btn-secondary">Learn About Our Mission</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
