
import React from "react";
import {
    ArrowRight,
    Building2,
    GraduationCap,
    HeartPulse,
    MapPin,
    Users,
    Home,
    Sprout,
} from "lucide-react";
import "./AboutVillage.scss";

const AboutVillage = () => {
    return (
        <main className="about-village">

            <section className="about-village__hero">
                <img
                    src="/aboutHero.png"
                    alt="Mallupur village"
                    className="about-village__hero-image"
                />

                <div className="about-village__hero-overlay">
                    <div className="about-village__hero-content">

                        <span className="about-village__eyebrow">
                            VILLAGE PORTAL
                        </span>

                        <h1>
                            Welcome to <span>Mallupur</span>
                        </h1>

                        <p>
                            A village rooted in tradition, community and
                            continuous development.
                        </p>

                        <div className="about-village__location">
                            <MapPin size={17} />
                            <span>Mallupur, Uttar Pradesh, India</span>
                        </div>

                    </div>
                </div>
            </section>

            <section className="about-village__section">
                <div className="about-village__container">

                    <div className="about-village__about">

                        <div className="about-village__about-image">
                            <img
                                src="/images/village-about.png"
                                alt="Mallupur village"
                            />

                            <div className="about-village__image-card">
                                <span>Our Home</span>
                                <strong>Mallupur Village</strong>
                            </div>
                        </div>

                        <div className="about-village__about-content">

                            <span className="about-village__section-label">
                                ABOUT MALLUPUR
                            </span>

                            <h2>
                                A place we are proud
                                <span> to call home.</span>
                            </h2>

                            <p>
                                Mallupur is a close-knit village where
                                people come together to celebrate traditions,
                                support one another and work towards a better
                                future.
                            </p>

                            <p>
                                From education and healthcare to roads,
                                sanitation and community development, our
                                village continues to grow while preserving
                                the values and traditions that make it special.
                            </p>

                            <button className="about-village__text-button">
                                Explore Village
                                <ArrowRight size={17} />
                            </button>

                        </div>

                    </div>

                </div>
            </section>

            <section className="about-village__stats-section">
                <div className="about-village__container">

                    <div className="about-village__section-heading">
                        <span className="about-village__section-label">
                            VILLAGE AT A GLANCE
                        </span>

                        <h2>
                            Our community in numbers
                        </h2>

                        <p>
                            A snapshot of our growing and vibrant village
                            community.
                        </p>
                    </div>

                    <div className="about-village__stats">

                        <div className="about-village__stat">
                            <div className="about-village__stat-icon">
                                <Users size={23} />
                            </div>

                            <div>
                                <strong>1,500+</strong>
                                <span>Residents</span>
                            </div>
                        </div>

                        <div className="about-village__stat">
                            <div className="about-village__stat-icon">
                                <Home size={23} />
                            </div>

                            <div>
                                <strong>300+</strong>
                                <span>Families</span>
                            </div>
                        </div>

                        <div className="about-village__stat">
                            <div className="about-village__stat-icon">
                                <Building2 size={23} />
                            </div>

                            <div>
                                <strong>10+</strong>
                                <span>Community Facilities</span>
                            </div>
                        </div>

                        <div className="about-village__stat">
                            <div className="about-village__stat-icon">
                                <Sprout size={23} />
                            </div>

                            <div>
                                <strong>100%</strong>
                                <span>Community Spirit</span>
                            </div>
                        </div>

                    </div>

                </div>
            </section>


            <section className="about-village__section">
                <div className="about-village__container">

                    <div className="about-village__section-heading">
                        <span className="about-village__section-label">
                            VILLAGE FACILITIES
                        </span>

                        <h2>
                            Everything our community needs
                        </h2>

                        <p>
                            We are continuously working to improve essential
                            facilities and services for every resident.
                        </p>
                    </div>


                    <div className="about-village__facilities">

                        <article className="about-village__facility">
                            <div className="about-village__facility-icon">
                                <GraduationCap size={25} />
                            </div>

                            <h3>Education</h3>

                            <p>
                                Supporting access to quality education and
                                creating better opportunities for children.
                            </p>
                        </article>


                        <article className="about-village__facility">
                            <div className="about-village__facility-icon">
                                <HeartPulse size={25} />
                            </div>

                            <h3>Healthcare</h3>

                            <p>
                                Working towards accessible healthcare and
                                better health awareness within the community.
                            </p>
                        </article>


                        <article className="about-village__facility">
                            <div className="about-village__facility-icon">
                                <Building2 size={25} />
                            </div>

                            <h3>Infrastructure</h3>

                            <p>
                                Improving roads, drainage, sanitation and
                                other essential village infrastructure.
                            </p>
                        </article>

                    </div>

                </div>
            </section>


            <section className="about-village__development">
                <div className="about-village__container">

                    <div className="about-village__development-box">

                        <div>
                            <span className="about-village__section-label">
                                OUR VISION
                            </span>

                            <h2>
                                Building a better village,
                                together.
                            </h2>

                            <p>
                                Our goal is to create a connected,
                                transparent and progressive village where
                                every resident can participate in its
                                development.
                            </p>
                        </div>

                        <div className="about-village__development-icon">
                            <Sprout size={55} strokeWidth={1.4} />
                        </div>

                    </div>

                </div>
            </section>

        </main>
    );
};

export default AboutVillage;