// import React, { useState, useEffect, useRef } from "react";
// import "./ChatbotAI.scss";
// import { getAIChatAsk } from "../../api/apiService";

// const ChatbotAI = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [messages, setMessages] = useState([
//         { id: 1, text: "Namaste! Mai aapki kya madad kar sakta hu?", sender: "ai" },
//     ]);
//     const [inputValue, setInputValue] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [chatResponse, setChatResponse] = useState({});

//     const chatbotRef = useRef(null);

//     // Outside Click Handle karne ke liye
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         if (isOpen) {
//             document.addEventListener("mousedown", handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [isOpen]);

//     // const handleSendMessage = async (e) => {
//     //     e.preventDefault();
//     //     if (!inputValue.trim()) return;

//     //     try {
//     //         setLoading(true);
//     //         const resp = await getAIChatAsk(inputValue);
//     //         if (resp?.status === 200) {
//     //             setChatResponse(resp?.data);

//     //         }
//     //         setInputValue("");
//     //     } catch (err) {
//     //         console.log("err", err);
//     //     } finally {
//     //         setLoading(false)
//     //     }


//     // };

//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (!inputValue.trim() || loading) return;

//         const userText = inputValue;

//         // 1. Pehle User ka message screen pe turant show karein
//         const userMsg = {
//             id: Date.now(),
//             text: userText,
//             sender: "user",
//         };

//         setMessages((prev) => [...prev, userMsg]);
//         setInputValue("");
//         setLoading(true);

//         try {
//             // 2. API call karein
//             const resp = await getAIChatAsk(userText);

//             // Backend API structure check: resp?.data?.message ya resp?.data?.reply
//             const aiReplyText =
//                 resp?.data ||
//                 resp?.data?.reply ||
//                 resp?.data?.data ||
//                 "Koshish safal nahi hui, kripya dobara try karein.";

//             if (resp?.status === 200 || resp?.status === 201) {
//                 // 3. AI response ko screen par append karein
//                 const aiMsg = {
//                     id: Date.now() + 1,
//                     text: aiReplyText,
//                     sender: "ai",
//                 };
//                 setMessages((prev) => [...prev, aiMsg]);
//             }
//         } catch (err) {
//             console.error("API Error:", err);
//             setMessages((prev) => [
//                 ...prev,
//                 {
//                     id: Date.now() + 1,
//                     text: "Kuch problem aa gayi hai, kripya thodi der baad prayas karein.",
//                     sender: "ai",
//                 },
//             ]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="ai-chatbot-wrapper" ref={chatbotRef}>
//             {/* Dynamic Chat Box */}
//             {isOpen ? (
//                 <div className="ai-chatbot-box">
//                     {/* Header */}
//                     <div className="ai-chatbot-header">
//                         <div className="ai-chatbot-header-info">
//                             <div className="ai-chatbot-avatar">
//                                 <svg viewBox="0 0 24 24">
//                                     <path d="M12 2A2 2 0 0 1 14 4V5.07C17.39 5.57 20 8.48 20 12V17C20 18.1 19.1 19 18 19H16V22H8V19H6C4.9 19 4 18.1 4 17V12C4 8.48 6.61 5.57 10 5.07V4A2 2 0 0 1 12 2M7.5 10A1.5 1.5 0 0 0 6 11.5A1.5 1.5 0 0 0 7.5 13A1.5 1.5 0 0 0 9 11.5A1.5 1.5 0 0 0 7.5 10M16.5 10A1.5 1.5 0 0 0 15 11.5A1.5 1.5 0 0 0 16.5 13A1.5 1.5 0 0 0 18 11.5A1.5 1.5 0 0 0 16.5 10M12 14C10.34 14 9 15.34 9 17H15C15 15.34 13.66 14 12 14Z" />
//                                 </svg>
//                             </div>
//                             <div className="ai-chatbot-title">
//                                 <h3>AI Assistant</h3>
//                                 <span>Online</span>
//                             </div>
//                         </div>
//                         <button
//                             className="ai-chatbot-close-btn"
//                             onClick={() => setIsOpen(false)}
//                             aria-label="Close Chat"
//                         >
//                             <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                                 <path d="M18 6L6 18M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>

//                     {/* Messages Area */}
//                     <div className="ai-chatbot-body">
//                         {messages.map((msg) => (
//                             <div
//                                 key={msg.id}
//                                 className={`ai-chatbot-message ${msg.sender === "user" ? "user-message" : "ai-message"
//                                     }`}
//                             >
//                                 {msg.text}
//                             </div>
//                         ))}
//                     </div>

//                     {/* Input Area */}
//                     <div className="ai-chatbot-footer">
//                         <form onSubmit={handleSendMessage}>
//                             <input
//                                 type="text"
//                                 placeholder="Apna message likhein..."
//                                 value={inputValue}
//                                 onChange={(e) => setInputValue(e.target.value)}
//                             />
//                             <button type="submit" aria-label="Send Message">
//                                 <svg viewBox="0 0 24 24">
//                                     <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//                                 </svg>
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             ) : (
//                 /* Floating Icon Button */
//                 <button
//                     className="ai-chatbot-toggle-btn"
//                     onClick={() => setIsOpen(true)}
//                     aria-label="Open Chat"
//                 >
//                     <svg viewBox="0 0 24 24">
//                         <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
//                     </svg>
//                 </button>
//             )}
//         </div>
//     );
// };

// export default ChatbotAI;

import React, { useState, useEffect, useRef } from "react";
import "./ChatbotAI.scss";
import { getAIChatAsk } from "../../api/apiService";

const ChatbotAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Namaste! Mai aapki kya madad kar sakta hu?", sender: "ai" },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const chatbotRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Smooth scroll to bottom jab bhi new message aaye
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, loading, isOpen]);

    // Outside Click Handle karne ke liye
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || loading) return;

        const userText = inputValue;

        const userMsg = {
            id: Date.now(),
            text: userText,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setLoading(true);

        try {
            const resp = await getAIChatAsk(userText);

            const aiReplyText =
                resp?.data || "अनुरोध पूरा नहीं हो सका। कृपया अपना इंटरनेट कनेक्शन जाँचें और फिर से प्रयास करें।";

            if (resp?.status === 200 || resp?.status === 201) {
                const aiMsg = {
                    id: Date.now() + 1,
                    text: aiReplyText,
                    sender: "ai",
                };
                setMessages((prev) => [...prev, aiMsg]);
            }
        } catch (err) {
            console.error("API Error:", err);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: "अभी अनुरोध पूरा नहीं हो सका। कृपया कुछ देर बाद फिर से प्रयास करें।",
                    sender: "ai",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-chatbot-wrapper" ref={chatbotRef}>
            {isOpen ? (
                <div className="ai-chatbot-box">
                    <div className="ai-chatbot-header">
                        <div className="ai-chatbot-header-info">
                            <div className="ai-chatbot-avatar">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 2A2 2 0 0 1 14 4V5.07C17.39 5.57 20 8.48 20 12V17C20 18.1 19.1 19 18 19H16V22H8V19H6C4.9 19 4 18.1 4 17V12C4 8.48 6.61 5.57 10 5.07V4A2 2 0 0 1 12 2M7.5 10A1.5 1.5 0 0 0 6 11.5A1.5 1.5 0 0 0 7.5 13A1.5 1.5 0 0 0 9 11.5A1.5 1.5 0 0 0 7.5 10M16.5 10A1.5 1.5 0 0 0 15 11.5A1.5 1.5 0 0 0 16.5 13A1.5 1.5 0 0 0 18 11.5A1.5 1.5 0 0 0 16.5 10M12 14C10.34 14 9 15.34 9 17H15C15 15.34 13.66 14 12 14Z" />
                                </svg>
                            </div>
                            <div className="ai-chatbot-title">
                                <h3>AI Assistant</h3>
                                <span>Online</span>
                            </div>
                        </div>
                        <button
                            className="ai-chatbot-close-btn"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close Chat"
                        >
                            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>


                    <div className="ai-chatbot-body">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`ai-chatbot-message ${msg.sender === "user" ? "user-message" : "ai-message"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {loading && (
                            <div className="ai-chatbot-message ai-message loading-dots">
                                <span>please wait...</span>
                            </div>
                        )}

                        {/* Scroll Anchor */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="ai-chatbot-footer">
                        <form onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                placeholder="Apna message likhein..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={loading}
                            />
                            <button type="submit" disabled={loading} aria-label="Send Message">
                                <svg viewBox="0 0 24 24">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                /* Floating Icon Button */
                <button
                    className="ai-chatbot-toggle-btn"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chat"
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ChatbotAI;