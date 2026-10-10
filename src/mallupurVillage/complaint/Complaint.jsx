// import { useNavigate } from "react-router";
// import "./Complaint.scss";
// import { Ambulance, BuildingComplexPlus, Eye, TruckElectric } from "lucide-react";

// const complaintOptions = [
//   {
//     id: 1,
//     icon: <BuildingComplexPlus />,
//     title: "Register Complaint",
//     hindiTitle: "शिकायत दर्ज करें",
//     description:
//       "गाँव में सड़क, पानी, बिजली, सफाई, नाली या किसी अन्य समस्या से जुड़ी शिकायत दर्ज करें।",
//     button: "शिकायत दर्ज करें",
//     path: "/services/complaint/register",
//   },
//   {
//     id: 2,
//     icon: <Eye />,
//     title: "View Complaints",
//     hindiTitle: "मेरी शिकायतें",
//     description:
//       "आपके द्वारा पहले दर्ज की गई सभी शिकायतों को देखें और उनकी वर्तमान स्थिति जानें।",
//     button: "शिकायतें देखें",
//     path: "/services/complaint/list",
//   },
//   {
//     id: 3,
//     icon: <TruckElectric />,
//     title: "Track Complaint",
//     hindiTitle: "शिकायत की स्थिति",
//     description:
//       "अपनी Complaint ID डालकर शिकायत की वर्तमान स्थिति और कार्यवाही की जानकारी प्राप्त करें।",
//     button: "स्थिति देखें",
//     path: "/complaint/track",
//   },
// ];

// const complaintSteps = [
//   {
//     number: "01",
//     title: "शिकायत दर्ज करें",
//     description: "अपनी समस्या की पूरी जानकारी दर्ज करें।",
//   },
//   {
//     number: "02",
//     title: "जाँच की जाएगी",
//     description: "संबंधित अधिकारी आपकी शिकायत की जाँच करेंगे।",
//   },
//   {
//     number: "03",
//     title: "कार्यवाही होगी",
//     description: "समस्या के समाधान के लिए आवश्यक कार्यवाही की जाएगी।",
//   },
//   {
//     number: "04",
//     title: "समस्या का समाधान",
//     description: "समस्या का समाधान होने के बाद शिकायत बंद की जाएगी।",
//   },
// ];

// const Complaint = () => {
//   const navigate = useNavigate();

//   const handleCardClick = (path) => {
//     navigate(path);
//   };

//   return (
//     <main className="complaint-page">

//       {/* Hero Section */}
//       <section className="complaint-hero">
//         <div className="complaint-hero-content">

//           <span className="hero-tag">
//             Village Portal
//           </span>

//           <h1>
//             शिकायत एवं समस्या समाधान
//           </h1>

//           <p>
//             गाँव की किसी भी समस्या की जानकारी दें और
//             अपनी शिकायत की स्थिति आसानी से देखें।
//           </p>

//         </div>
//       </section>

//       {/* Complaint Options */}
//       <section className="complaint-options-section">

//         <div className="section-heading">
//           <span>01</span>

//           <h2>
//             आपको क्या करना है?
//           </h2>

//           <p>
//             नीचे दिए गए विकल्प में से अपनी आवश्यकता के अनुसार
//             विकल्प चुनें।
//           </p>
//         </div>

//         <div className="complaint-cards">

//           {complaintOptions.map((item) => (
//             <div
//               className="complaint-card"
//               key={item.id}
//               onClick={() => handleCardClick(item.path)}
//             >

//               <div className="card-top">
//                 <div className="complaint-icon">
//                   {item.icon}
//                 </div>

//                 <span className="card-number">
//                   0{item.id}
//                 </span>
//               </div>

//               <div className="card-content">

//                 <h3>
//                   {item.hindiTitle}
//                 </h3>

//                 <h4>
//                   {item.title}
//                 </h4>

//                 <p>
//                   {item.description}
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleCardClick(item.path);
//                 }}
//               >
//                 {item.button}
//                 <span>→</span>
//               </button>

//             </div>
//           ))}

//         </div>

//       </section>

//       {/* How It Works */}
//       <section className="complaint-process">

//         <div className="section-heading center">

//           <span>02</span>

//           <h2>
//             शिकायत की प्रक्रिया
//           </h2>

//           <p>
//             शिकायत दर्ज करने से समाधान तक की पूरी प्रक्रिया
//           </p>

//         </div>

//         <div className="process-container">

//           {complaintSteps.map((step, index) => (
//             <div
//               className="process-item"
//               key={step.number}
//             >

//               <div className="process-number">
//                 {step.number}
//               </div>

//               <div className="process-content">

//                 <h3>
//                   {step.title}
//                 </h3>

//                 <p>
//                   {step.description}
//                 </p>

//               </div>

//               {index !== complaintSteps.length - 1 && (
//                 <div className="process-arrow">
//                   →
//                 </div>
//               )}

//             </div>
//           ))}

//         </div>

//       </section>

//       {/* Help Section */}
//       <section className="complaint-help">

//         <div className="help-content">

//           <div className="help-icon">
//             <Ambulance />
//           </div>

//           <div>
//             <span>
//               जरूरी सहायता
//             </span>

//             <h2>
//               समस्या गंभीर है?
//             </h2>

//             <p>
//               यदि आपकी समस्या अत्यंत जरूरी है तो आप
//               सीधे ग्राम पंचायत कार्यालय से संपर्क कर सकते हैं।
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => navigate("/contact")}
//           >
//             संपर्क करें →
//           </button>

//         </div>

//       </section>

//     </main>
//   );
// };

// export default Complaint;

import React from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileWarning,
  MapPin,
  MessageSquareWarning,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Complaint.scss";

const complaintCategories = [
  {
    icon: Wrench,
    title: "Road & Infrastructure",
    description: "Report damaged roads, drains, street infrastructure and related issues.",
  },
  {
    icon: AlertCircle,
    title: "Cleanliness",
    description: "Report garbage, drainage, sanitation and cleanliness problems.",
  },
  {
    icon: MapPin,
    title: "Public Places",
    description: "Report problems related to public areas and village facilities.",
  },
  {
    icon: MessageSquareWarning,
    title: "Other Issues",
    description: "Have another village-related concern? Let us know.",
  },
];

const complaintSteps = [
  {
    icon: FileWarning,
    number: "01",
    title: "Report the Issue",
    description: "Submit your complaint with the required details and location.",
  },
  {
    icon: Clock3,
    number: "02",
    title: "Under Review",
    description: "The complaint is reviewed by the responsible administration.",
  },
  {
    icon: CheckCircle2,
    number: "03",
    title: "Issue Resolved",
    description: "Once the issue is addressed, the complaint status is updated.",
  },
];

const Complaint = () => {
  const navigate = useNavigate();

  return (
    <div className="complaints">
      {/* Hero */}
      <section className="complaints__hero">
        <div className="container">
          <div className="complaints__hero-content">
            <span className="complaints__eyebrow">
              <ShieldCheck size={17} />
              VILLAGE PORTAL
            </span>

            <h1 className="complaints__hero-title">
              Raise Your Voice,
              <span> Improve Our Village</span>
            </h1>

            <p className="complaints__hero-text">
              Help make Mallupur better by reporting problems and issues
              around your village. Your complaint can help bring positive
              change to the community.
            </p>

            <div className="complaints__hero-actions">
              <button
                className="complaints__button complaints__button--primary"
                onClick={() => navigate("/services/complaint/create")}
              >
                Report a Problem
                <ArrowRight size={18} />
              </button>

              <button
                className="complaints__button complaints__button--outline"
                onClick={() => navigate("/services/complaint/my")}
              >
                View My Complaints
              </button>
            </div>
          </div>

          <div className="complaints__hero-card">
            <div className="complaints__hero-card-icon">
              <MessageSquareWarning size={32} />
            </div>

            <h3>Your Voice Matters</h3>

            <p>
              Every genuine complaint helps us identify problems and work
              towards a cleaner, safer and better village.
            </p>

            <div className="complaints__hero-card-line" />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="complaints__intro">
        <div className="container">
          <div className="complaints__section-heading">
            <span className="complaints__section-label">
              REPORT AN ISSUE
            </span>

            <h2>What would you like to report?</h2>

            <p>
              Select an area related to your complaint and help us understand
              the problem better.
            </p>
          </div>

          <div className="complaints__categories">
            {complaintCategories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  className="complaints__category"
                  key={category.title}
                >
                  <div className="complaints__category-icon">
                    <Icon size={24} />
                  </div>

                  <h3>{category.title}</h3>

                  <p>{category.description}</p>

                  <button
                    onClick={() =>
                      navigate("/services/complaint/create")
                    }
                  >
                    Report Issue
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="complaints__process">
        <div className="container">
          <div className="complaints__section-heading">
            <span className="complaints__section-label">
              HOW IT WORKS
            </span>

            <h2>From Complaint to Resolution</h2>

            <p>
              Our simple process makes it easy to report and track village
              issues.
            </p>
          </div>

          <div className="complaints__steps">
            {complaintSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div className="complaints__step" key={step.number}>
                  <div className="complaints__step-number">
                    {step.number}
                  </div>

                  <div className="complaints__step-icon">
                    <Icon size={24} />
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="complaints__cta">
        <div className="container">
          <div className="complaints__cta-content">
            <div>
              <span className="complaints__section-label">
                MAKE A DIFFERENCE
              </span>

              <h2>Have you noticed a problem in the village?</h2>

              <p>
                Don't ignore it. Report the issue and help make Mallupur
                a better place for everyone.
              </p>
            </div>

            <button
              className="complaints__button complaints__button--primary"
              onClick={() => navigate("/services/complaint/create")}
            >
              Report a Complaint
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Complaint;