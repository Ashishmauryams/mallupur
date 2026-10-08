import React from "react";
import { ArrowLeft, Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NotFoundGlobal.scss";

const NotFoundGlobal = () => {
    const navigate = useNavigate();

    return (
        <main className="not-found">
            <div className="not-found__wrapper">

                {/* Left Content */}
                <section className="not-found__content">

                    <p className="not-found__error">
                        ERROR 404
                    </p>

                    <h1 className="not-found__title">
                        Page not found
                    </h1>

                    <p className="not-found__description">
                        The page you're looking for doesn't exist or
                        may have been moved to another location.
                    </p>

                    <div className="not-found__actions">

                        <button
                            type="button"
                            className="not-found__button not-found__button--primary"
                            onClick={() => navigate("/home")}
                        >
                            <Home size={18} />
                            Back to Home
                        </button>

                        <button
                            type="button"
                            className="not-found__button not-found__button--secondary"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>

                    </div>

                    <div className="not-found__help">
                        <Search size={16} />
                        <span>
                            Check the URL and try again
                        </span>
                    </div>

                </section>

                {/* Right Illustration */}
                <section className="not-found__visual">

                    <div className="not-found__circle not-found__circle--one" />
                    <div className="not-found__circle not-found__circle--two" />

                    <div className="not-found__404">
                        <span>4</span>

                        <div className="not-found__zero">
                            <div className="not-found__zero-inner" />
                        </div>

                        <span>4</span>
                    </div>

                    <div className="not-found__line" />

                    <p>
                        Nothing here
                    </p>

                </section>

            </div>
        </main>
    );
};

export default NotFoundGlobal;