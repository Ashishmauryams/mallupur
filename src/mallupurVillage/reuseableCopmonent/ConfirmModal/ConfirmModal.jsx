import React from "react";
import { X, AlertTriangle } from "lucide-react";
import "./ConfirmModal.scss";

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,

    title = "Are you sure?",
    message = "This action cannot be undone.",

    confirmText = "Confirm",
    cancelText = "Cancel",

    loading = false,
    loadingText = "Processing...",

    icon: Icon = AlertTriangle,
}) => {
    if (!isOpen) return null;

    return (
        <div className="app-confirm-modal">
            <div
                className="app-confirm-modal__overlay"
                onMouseDown={(e) => {
                    if (e.target === e.currentTarget && !loading) {
                        onClose();
                    }
                }}
            >
                <div
                    className="app-confirm-modal__box"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="confirm-modal-title"
                >
                    {/* Close */}
                    <button
                        type="button"
                        className="app-confirm-modal__close"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>

                    {/* Icon */}
                    <div className="app-confirm-modal__icon">
                        <Icon size={27} strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <div className="app-confirm-modal__content">
                        <h2 id="confirm-modal-title">
                            {title}
                        </h2>

                        <p>
                            {message}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="app-confirm-modal__actions">

                        <button
                            type="button"
                            className="app-confirm-modal__cancel"
                            onClick={onClose}
                            disabled={loading}
                        >
                            {cancelText}
                        </button>

                        <button
                            type="button"
                            className="app-confirm-modal__confirm"
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading
                                ? loadingText
                                : confirmText}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;