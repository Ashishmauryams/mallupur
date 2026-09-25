import { useNavigate } from "react-router";
import "./Complaint.scss";
import { Ambulance, BuildingComplexPlus, Eye, TruckElectric } from "lucide-react";

const complaintOptions = [
  {
    id: 1,
    icon: <BuildingComplexPlus />,
    title: "Register Complaint",
    hindiTitle: "शिकायत दर्ज करें",
    description:
      "गाँव में सड़क, पानी, बिजली, सफाई, नाली या किसी अन्य समस्या से जुड़ी शिकायत दर्ज करें।",
    button: "शिकायत दर्ज करें",
    path: "/services/complaint/register",
  },
  {
    id: 2,
    icon: <Eye />,
    title: "View Complaints",
    hindiTitle: "मेरी शिकायतें",
    description:
      "आपके द्वारा पहले दर्ज की गई सभी शिकायतों को देखें और उनकी वर्तमान स्थिति जानें।",
    button: "शिकायतें देखें",
    path: "/services/complaint/list",
  },
  {
    id: 3,
    icon: <TruckElectric />,
    title: "Track Complaint",
    hindiTitle: "शिकायत की स्थिति",
    description:
      "अपनी Complaint ID डालकर शिकायत की वर्तमान स्थिति और कार्यवाही की जानकारी प्राप्त करें।",
    button: "स्थिति देखें",
    path: "/complaint/track",
  },
];

const complaintSteps = [
  {
    number: "01",
    title: "शिकायत दर्ज करें",
    description: "अपनी समस्या की पूरी जानकारी दर्ज करें।",
  },
  {
    number: "02",
    title: "जाँच की जाएगी",
    description: "संबंधित अधिकारी आपकी शिकायत की जाँच करेंगे।",
  },
  {
    number: "03",
    title: "कार्यवाही होगी",
    description: "समस्या के समाधान के लिए आवश्यक कार्यवाही की जाएगी।",
  },
  {
    number: "04",
    title: "समस्या का समाधान",
    description: "समस्या का समाधान होने के बाद शिकायत बंद की जाएगी।",
  },
];

const Complaint = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <main className="complaint-page">

      {/* Hero Section */}
      <section className="complaint-hero">
        <div className="complaint-hero-content">

          <span className="hero-tag">
            Village Portal
          </span>

          <h1>
            शिकायत एवं समस्या समाधान
          </h1>

          <p>
            गाँव की किसी भी समस्या की जानकारी दें और
            अपनी शिकायत की स्थिति आसानी से देखें।
          </p>

        </div>
      </section>

      {/* Complaint Options */}
      <section className="complaint-options-section">

        <div className="section-heading">
          <span>01</span>

          <h2>
            आपको क्या करना है?
          </h2>

          <p>
            नीचे दिए गए विकल्प में से अपनी आवश्यकता के अनुसार
            विकल्प चुनें।
          </p>
        </div>

        <div className="complaint-cards">

          {complaintOptions.map((item) => (
            <div
              className="complaint-card"
              key={item.id}
              onClick={() => handleCardClick(item.path)}
            >

              <div className="card-top">
                <div className="complaint-icon">
                  {item.icon}
                </div>

                <span className="card-number">
                  0{item.id}
                </span>
              </div>

              <div className="card-content">

                <h3>
                  {item.hindiTitle}
                </h3>

                <h4>
                  {item.title}
                </h4>

                <p>
                  {item.description}
                </p>

              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(item.path);
                }}
              >
                {item.button}
                <span>→</span>
              </button>

            </div>
          ))}

        </div>

      </section>

      {/* How It Works */}
      <section className="complaint-process">

        <div className="section-heading center">

          <span>02</span>

          <h2>
            शिकायत की प्रक्रिया
          </h2>

          <p>
            शिकायत दर्ज करने से समाधान तक की पूरी प्रक्रिया
          </p>

        </div>

        <div className="process-container">

          {complaintSteps.map((step, index) => (
            <div
              className="process-item"
              key={step.number}
            >

              <div className="process-number">
                {step.number}
              </div>

              <div className="process-content">

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>

              </div>

              {index !== complaintSteps.length - 1 && (
                <div className="process-arrow">
                  →
                </div>
              )}

            </div>
          ))}

        </div>

      </section>

      {/* Help Section */}
      <section className="complaint-help">

        <div className="help-content">

          <div className="help-icon">
            <Ambulance />
          </div>

          <div>
            <span>
              जरूरी सहायता
            </span>

            <h2>
              समस्या गंभीर है?
            </h2>

            <p>
              यदि आपकी समस्या अत्यंत जरूरी है तो आप
              सीधे ग्राम पंचायत कार्यालय से संपर्क कर सकते हैं।
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/contact")}
          >
            संपर्क करें →
          </button>

        </div>

      </section>

    </main>
  );
};

export default Complaint;