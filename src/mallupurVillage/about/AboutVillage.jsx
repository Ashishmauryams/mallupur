import { Cross, Droplet, GraduationCap, HandPlatter, Landmark, Road, Zap } from "lucide-react";
import "./AboutVillage.scss";

const villageData = {
    name: "Mallupur",
    district: "Jaunpur",
    state: "Uttar Pradesh",
    pincode: "222175",

    introduction: `
    Mallupur ek sundar aur shaant gram hai jahan log apni
    parampara, sanskriti aur bhaichare ke saath mil-julkar rahte hain.
    Yeh gaon apni hariyali, kheti aur samajik ekta ke liye jaana jaata hai.
    Gaon ke vikas ke liye shiksha, swachhta, sadak, bijli aur digital
    suvidhaon par lagataar kaam kiya ja raha hai.
  `,

    history: `
    Mallupur ka itihaas kai varshon purana hai. Gaon ke buzurgon ke
    anusar yah kshetra pehle kheti aur chhote vyavsaayon ke liye jaana
    jaata tha. Samay ke saath gaon me shiksha, sadak, bijli aur
    communication ki suvidhaon ka vikas hua.
  `,

    statistics: [
        {
            number: "2,850+",
            label: "कुल जनसंख्या",
        },
        {
            number: "520+",
            label: "कुल परिवार",
        },
        {
            number: "65%",
            label: "साक्षरता दर",
        },
        {
            number: "12",
            label: "प्रमुख मोहल्ले",
        },
    ],

    facilities: [
        {
            icon: <GraduationCap />,
            title: "शिक्षा",
            description:
                "गाँव में प्राथमिक एवं माध्यमिक शिक्षा की सुविधाएँ उपलब्ध हैं।",
        },
        {
            icon: <Cross />,
            title: "स्वास्थ्य",
            description:
                "ग्रामीणों के लिए स्वास्थ्य केंद्र एवं आवश्यक चिकित्सा सुविधाएँ।",
        },
        {
            icon: <Droplet />,
            title: "पेयजल",
            description:
                "ग्रामीण परिवारों के लिए स्वच्छ पेयजल की सुविधा उपलब्ध है।",
        },
        {
            icon: <Road />,
            title: "सड़क",
            description:
                "गाँव को आसपास के क्षेत्रों से जोड़ने वाली सड़क व्यवस्था।",
        },
        {
            icon: <Zap />,
            title: "बिजली",
            description:
                "गाँव के अधिकांश क्षेत्रों में बिजली की सुविधा उपलब्ध है।",
        },
        {
            icon: <HandPlatter />,
            title: "कृषि",
            description:
                "कृषि गाँव के प्रमुख व्यवसायों में से एक है।",
        },
    ],

    importantPlaces: [
        {
            title: "ग्राम पंचायत भवन",
            description: "गाँव के प्रशासनिक कार्यों का प्रमुख केंद्र।",
        },
        {
            title: "प्राथमिक विद्यालय",
            description: "गाँव के बच्चों के लिए शिक्षा का प्रमुख केंद्र।",
        },
        {
            title: "ग्राम मंदिर",
            description: "गाँव का प्रमुख धार्मिक एवं सांस्कृतिक स्थल।",
        },
    ],

    vision: `
    हमारा उद्देश्य Mallupur को एक स्वच्छ, शिक्षित, डिजिटल और आत्मनिर्भर
    गाँव बनाना है, जहाँ प्रत्येक परिवार को आवश्यक मूलभूत सुविधाएँ
    आसानी से उपलब्ध हों और युवा शिक्षा एवं रोजगार के बेहतर अवसर प्राप्त कर सकें।
  `,
};

const AboutVillage = () => {
    return (
        <main className="about-village">

            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-content">
                    <span className="hero-tag">VILLAGE PORTAL</span>

                    <h1>
                        Welcome to <span>{villageData.name}</span>
                    </h1>

                    <p>
                        {villageData.district}, {villageData.state}
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="about-section introduction">
                <div className="section-heading">
                    <span>01</span>
                    <h2>गाँव के बारे में</h2>
                </div>

                <div className="introduction-content">
                    <div className="intro-image">
                        <img src="/images/village-about.png" alt="village-about" />
                    </div>

                    <div className="intro-text">
                        <h3>हमारा प्यारा गाँव {villageData.name}</h3>

                        <p>{villageData.introduction}</p>

                        <div className="location-info">
                            <div>
                                <strong>जिला</strong>
                                <span>{villageData.district}</span>
                            </div>

                            <div>
                                <strong>राज्य</strong>
                                <span>{villageData.state}</span>
                            </div>

                            <div>
                                <strong>पिनकोड</strong>
                                <span>{villageData.pincode}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="statistics-section">
                <div className="section-heading center">
                    <span>02</span>
                    <h2>गाँव एक नजर में</h2>
                </div>

                <div className="statistics-grid">
                    {villageData.statistics.map((item, index) => (
                        <div className="stat-card" key={index}>
                            <h3>{item.number}</h3>
                            <p>{item.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* History */}
            <section className="about-section history-section">
                <div className="section-heading">
                    <span>03</span>
                    <h2>हमारा इतिहास</h2>
                </div>

                <div className="history-content">
                    <div className="history-icon">
                        <Landmark />
                    </div>

                    <div>
                        <h3>गाँव की विरासत और परंपरा</h3>

                        <p>{villageData.history}</p>
                    </div>
                </div>
            </section>

            {/* Facilities */}
            <section className="facilities-section">
                <div className="section-heading center">
                    <span>04</span>
                    <h2>गाँव की सुविधाएँ</h2>

                    <p>
                        ग्रामीणों के बेहतर जीवन के लिए उपलब्ध प्रमुख सुविधाएँ
                    </p>
                </div>

                <div className="facilities-grid">
                    {villageData.facilities.map((facility, index) => (
                        <div className="facility-card" key={index}>
                            <div className="facility-icon">
                                {facility.icon}
                            </div>

                            <h3>{facility.title}</h3>

                            <p>{facility.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Important Places */}
            <section className="about-section places-section">
                <div className="section-heading">
                    <span>05</span>
                    <h2>महत्वपूर्ण स्थान</h2>
                </div>

                <div className="places-grid">
                    {villageData.importantPlaces.map((place, index) => (
                        <div className="place-card" key={index}>
                            <span className="place-number">
                                0{index + 1}
                            </span>

                            <div>
                                <h3>{place.title}</h3>
                                <p>{place.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Vision */}
            <section className="vision-section">
                <div className="vision-content">
                    <span>हमारा संकल्प</span>

                    <h2>
                        एक बेहतर और आत्मनिर्भर गाँव की ओर
                    </h2>

                    <p>{villageData.vision}</p>
                </div>
            </section>

        </main>
    );
};

export default AboutVillage;