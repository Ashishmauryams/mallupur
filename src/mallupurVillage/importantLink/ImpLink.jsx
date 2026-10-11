import React, { useState, useEffect } from 'react';
import {
    Search, Bookmark, ExternalLink, Plus, Filter, Globe,
    PhoneCall, GraduationCap, HeartPulse, Building2, Sprout,
    FileText, ShieldAlert, Sparkles, X, Share2, MapPin
} from 'lucide-react';

import "./ImpLink.scss";

const INITIAL_LINKS = [
    {
        id: 1,
        title: "PM-Kisan Samman Nidhi Portal",
        category: "Agriculture",
        description: "Check installment status, beneficiary list, and register new farmer applications directly.",
        url: "https://pmkisan.gov.in",
        icon: "Sprout",
        isPinned: true,
        helpline: "155261",
        badge: "Central Scheme"
    },
    {
        id: 2,
        title: "Gram Panchayat Official Portal",
        category: "Panchayat Services",
        description: "Access village development plans, sanitation works, funds allocation, and certificate requests.",
        url: "https://panchayat.gov.in",
        icon: "Building2",
        isPinned: true,
        helpline: "0522-2281530",
        badge: "Local Services"
    },
    {
        id: 3,
        title: "Ayushman Bharat Health Card (ABHA)",
        category: "Health & Emergency",
        description: "Generate digital health ID and locate empaneled hospitals offering ₹5 Lakh free medical insurance.",
        url: "https://healthid.ndhm.gov.in",
        icon: "HeartPulse",
        isPinned: false,
        helpline: "1800-111-565",
        badge: "Healthcare"
    },
    {
        id: 4,
        title: "Village Primary School E-Learning",
        category: "Education & Youth",
        description: "Access local school timetables, scholarship portals for village students, and mid-day meal reports.",
        url: "https://education.gov.in",
        icon: "GraduationCap",
        isPinned: false,
        helpline: "1800-180-6127",
        badge: "Education"
    },
    {
        id: 5,
        title: "Ration Card & PDS Distribution Status",
        category: "Government Schemes",
        description: "Check monthly ration allocation, fair price shop dealer timings, and add new family members.",
        url: "https://nfsa.gov.in",
        icon: "FileText",
        isPinned: true,
        helpline: "1967",
        badge: "Essential"
    },
    {
        id: 6,
        title: "Gaon Emergency & Police Helpline",
        category: "Health & Emergency",
        description: "Quick dial links for local police chowki, ambulance service, fire brigade, and disaster response.",
        url: "tel:112",
        icon: "ShieldAlert",
        isPinned: true,
        helpline: "112 / 108",
        badge: "Emergency"
    }
];

const CATEGORIES = [
    "All",
    "Government Schemes",
    "Agriculture",
    "Education & Youth",
    "Health & Emergency",
    "Panchayat Services",
    "Utility & Transport"
];

function ImpLink() {
    const [links, setLinks] = useState(() => {
        const saved = localStorage.getItem('gaav_important_links_v2');
        return saved ? JSON.parse(saved) : INITIAL_LINKS;
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const [newTitle, setNewTitle] = useState("");
    const [newCategory, setNewCategory] = useState("Government Schemes");
    const [newDescription, setNewDescription] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newHelpline, setNewHelpline] = useState("");
    const [newBadge, setNewBadge] = useState("Community");

    useEffect(() => {
        localStorage.setItem('gaav_important_links_v2', JSON.stringify(links));
    }, [links]);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(""), 3500);
    };

    const togglePin = (id) => {
        setLinks(links.map(link => {
            if (link.id === id) {
                const updatedStatus = !link.isPinned;
                showToast(updatedStatus ? "Pinned to top successfully!" : "Unpinned from top.");
                return { ...link, isPinned: updatedStatus };
            }
            return link;
        }));
    };

    const handleAddLink = (e) => {
        e.preventDefault();
        if (!newTitle || !newUrl) {
            showToast("Please fill in title and URL.");
            return;
        }
        const newEntry = {
            id: Date.now(),
            title: newTitle,
            category: newCategory,
            description: newDescription || "Important local village link added by community member.",
            url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`,
            icon: newCategory === 'Agriculture' ? 'Sprout' : newCategory === 'Health & Emergency' ? 'HeartPulse' : newCategory === 'Education & Youth' ? 'GraduationCap' : 'Globe',
            isPinned: false,
            helpline: newHelpline || 'N/A',
            badge: newBadge
        };

        setLinks([newEntry, ...links]);
        setIsAddModalOpen(false);
        setNewTitle("");
        setNewDescription("");
        setNewUrl("");
        setNewHelpline("");
        showToast("New link added successfully!");
    };

    const filteredLinks = links.filter(link => {
        const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            link.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || link.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const pinnedLinks = filteredLinks.filter(l => l.isPinned);
    const unpinnedLinks = filteredLinks.filter(l => !l.isPinned);

    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'Sprout': return <Sprout />;
            case 'Building2': return <Building2 />;
            case 'HeartPulse': return <HeartPulse />;
            case 'GraduationCap': return <GraduationCap />;
            case 'FileText': return <FileText />;
            case 'ShieldAlert': return <ShieldAlert className="emergency-svg" />;
            default: return <Globe />;
        }
    };

    return (
        <div className="gaav-dashboard-wrapper">
            {/* <ComponentStyles /> */}

            {toastMessage && (
                <div className="gaav-toast">
                    <Sparkles />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{toastMessage}</span>
                </div>
            )}

            <header className="gaav-header">
                <div className="header-container">
                    <div className="brand-box">
                        <div className="logo-icon">🌾</div>
                        <div className="brand-info">
                            <div>
                                <h1>Gaav Important Links</h1>
                                <span className="badge-pill">Digital Portal</span>
                            </div>
                            <p>
                                <MapPin /> Official Village Resource & Services Directory
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        style={{
                            backgroundColor: 'var(--button-bg)',
                            color: 'var(--button-text)',
                            border: '1px solid var(--button-border)',
                            boxShadow: 'var(--button-shadow)',
                            padding: '0.625rem 1rem',
                            borderRadius: '0.75rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        <Plus style={{ width: '1rem', height: '1rem' }} />
                        <span>Add Village Link</span>
                    </button>
                </div>
            </header>

            <section className="gaav-hero">
                <div className="hero-content">
                    <h2>Sabhi Zaroori Links Ek Hi Jagah</h2>
                    <p>
                        Access government schemes, panchayat services, agriculture assistance, health helplines, and local educational portals instantly.
                    </p>

                    <div className="search-bar-wrapper">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by scheme name, category, or service..."
                        />
                        {searchQuery && (
                            <button className="clear-search" onClick={() => setSearchQuery("")}>
                                <X />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            <nav className="gaav-nav-filters">
                <div className="filter-scroll">
                    <Filter className="filter-icon" />
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`filter-pill ${selectedCategory === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="gaav-main">
                {filteredLinks.length === 0 ? (
                    <div className="empty-state">
                        <Globe />
                        <h3>No links found</h3>
                        <p>No resources match your search or filter criteria. Try searching with different keywords.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            style={{
                                backgroundColor: 'var(--button-bg)',
                                color: 'var(--button-text)',
                                border: '1px solid var(--button-border)',
                                padding: '0.625rem 1.25rem',
                                borderRadius: '0.75rem',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                cursor: 'pointer'
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {pinnedLinks.length > 0 && (
                            <div>
                                <div className="section-header">
                                    <Bookmark />
                                    <h3>Pinned / Important Links</h3>
                                </div>
                                <div className="links-grid">
                                    {pinnedLinks.map(link => (
                                        <LinkCard
                                            key={link.id}
                                            link={link}
                                            onTogglePin={togglePin}
                                            renderIcon={renderIcon}
                                            showToast={showToast}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {unpinnedLinks.length > 0 && (
                            <div>
                                {pinnedLinks.length > 0 && (
                                    <div className="section-header" style={{ marginTop: '1.5rem' }}>
                                        <Globe className="primary-icon" />
                                        <h3>Other Available Links</h3>
                                    </div>
                                )}
                                <div className="links-grid">
                                    {unpinnedLinks.map(link => (
                                        <LinkCard
                                            key={link.id}
                                            link={link}
                                            onTogglePin={togglePin}
                                            renderIcon={renderIcon}
                                            showToast={showToast}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {isAddModalOpen && (
                <div className="gaav-modal-backdrop">
                    <div className="gaav-modal">
                        <button className="close-modal-btn" onClick={() => setIsAddModalOpen(false)}>
                            <X />
                        </button>

                        <div className="modal-header">
                            <div className="modal-icon-box">
                                <Plus />
                            </div>
                            <div>
                                <h3>Add New Village Link</h3>
                                <p>Contribute a helpful website or service link for villagers.</p>
                            </div>
                        </div>

                        <form onSubmit={handleAddLink} className="modal-form">
                            <div className="form-group">
                                <label>Link / Portal Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="e.g. Village Panchayat Water Supply Portal"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                    >
                                        {CATEGORIES.filter(c => c !== "All").map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Badge Tag</label>
                                    <input
                                        type="text"
                                        value={newBadge}
                                        onChange={(e) => setNewBadge(e.target.value)}
                                        placeholder="e.g. Official / Scheme"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Website URL *</label>
                                <input
                                    type="text"
                                    required
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                    placeholder="https://example.gov.in"
                                />
                            </div>

                            <div className="form-group">
                                <label>Helpline / Contact Number</label>
                                <input
                                    type="text"
                                    value={newHelpline}
                                    onChange={(e) => setNewHelpline(e.target.value)}
                                    placeholder="e.g. 1800-XXX-XXXX"
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    rows="3"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    placeholder="Briefly explain what this link provides..."
                                ></textarea>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setIsAddModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Save & Publish Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <footer className="gaav-footer">
                <div className="footer-container">
                    <p>© 2026 Gaav Digital Services. Empowering villages with quick digital access.</p>
                    <div className="footer-info-group">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <ShieldAlert /> Emergency: 112
                        </span>
                        <span>•</span>
                        <span>Made with 🌾 for Rural India</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function LinkCard({ link, onTogglePin, renderIcon, showToast }) {
    const handleCopyLink = () => {
        navigator.clipboard.writeText(link.url);
        showToast(`Copied link for ${link.title}!`);
    };

    return (
        <div className="gaav-card">
            <div>
                <div className="card-top">
                    <div className="card-info-group">
                        <div className="card-icon-box">
                            {renderIcon(link.icon)}
                        </div>
                        <div className="card-meta">
                            <span className="card-badge">
                                {link.badge || link.category}
                            </span>
                            <h4 className="card-title">
                                {link.title}
                            </h4>
                        </div>
                    </div>

                    <button
                        onClick={() => onTogglePin(link.id)}
                        title={link.isPinned ? "Unpin link" : "Pin link"}
                        className={`pin-btn ${link.isPinned ? 'pinned' : ''}`}
                    >
                        <Bookmark />
                    </button>
                </div>

                <p className="card-desc">
                    {link.description}
                </p>
            </div>

            <div className="card-footer">
                <div className="helpline-info">
                    <PhoneCall />
                    <span>{link.helpline || 'N/A'}</span>
                </div>

                <div className="card-actions">
                    <button
                        onClick={handleCopyLink}
                        title="Copy link"
                        className="action-icon-btn"
                    >
                        <Share2 />
                    </button>

                    <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="open-link-btn"
                    >
                        <span>Open</span>
                        <ExternalLink />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ImpLink;