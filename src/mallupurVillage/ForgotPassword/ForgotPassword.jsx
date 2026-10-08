import { Link, useNavigate } from "react-router";
import "./ForgotPassword.scss";
import { useEffect, useState } from "react";
import { ArrowLeft, Lock, Mail } from "lucide-react";

import Input from "../reuseableCopmonent/Input";
import Button from "../reuseableCopmonent/Button/Button";
import { getForgotPasswordOtp, getForgotPasswordVerify } from "../../api/apiService";
import { useAlert } from "../../contextApi/AlertContext";
import Loader from "../reuseableCopmonent/loader/Loader";

const ForgotPassword = ({ setForgotToggle }) => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    // =========================
    // FORM STATES
    // =========================

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const [resendTimer, setResendTimer] = useState(30);

    const { showAlert } = useAlert()


    // =========================
    // OTP TIMER
    // =========================

    useEffect(() => {
        if (step !== 2 || resendTimer <= 0) return;

        const timer = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [step, resendTimer]);


    // =========================
    // INPUT CHANGE
    // =========================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setError((prev) => ({
            ...prev,
            [name]: "",
        }));

        if (name === "email") {
            setEmail(value);
        }

        if (name === "newPassword") {
            setNewPassword(value);
        }

        if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };


    // =========================
    // STEP 1
    // GENERATE OTP
    // =========================

    const handleGetOtp = async (e) => {
        e.preventDefault();


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errors = {};

        if (!email.trim()) {
            errors.email = "Email address is required";
        } else if (!emailRegex.test(email.trim())) {
            errors.email = "Please enter a valid email address";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        try {
            setLoading(true);
            const resp = await getForgotPasswordOtp(email);
            if (resp?.status === 200) {

                showAlert({
                    severity: "success",
                    message: resp?.data || "OTP send Successfully ! Your email Id",
                    duration: 3000,
                    variant: "filled"
                });
                setResendTimer(30);
                setStep(2);
            }
        } catch (err) {
            showAlert({
                severity: "error",
                message: err?.response?.data?.msg || "Unable to send OTP. Please try again.",
                duration: 3000,
                variant: "filled"
            });
        } finally {
            setLoading(false);
        }
    };


    // =========================
    // STEP 2
    // RESET PASSWORD
    // =========================

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const errors = {};

        if (otp.length !== 6) {
            errors.otp = "Please enter a valid 6-digit OTP";
        }

        if (!newPassword) {
            errors.password = "Password is required";
        } else if (newPassword.length < 6) {
            errors.newPassword =
                "Password must be at least 6 characters";
        }

        if (!confirmPassword) {
            errors.confirmPassword =
                "Please confirm your password";
        } else if (newPassword !== confirmPassword) {
            errors.confirmPassword =
                "Passwords do not match";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        try {
            setLoading(true);

            const resp = await getForgotPasswordVerify(email, otp, newPassword);
            if (resp?.status === 200) {

                showAlert({
                    severity: "success",
                    message: resp?.data || "Password change Successfully!",
                    duration: 3000,
                    variant: "filled"
                });
                setForgotToggle(false);
                navigate("/login");
            }



        } catch (err) {
            showAlert({
                severity: "error",
                message: err?.response?.data?.msg || "Something wents wrong!",
                duration: 3000,
                variant: "filled"
            });

        } finally {
            setLoading(false);
        }
    };


    // =========================
    // RESEND OTP
    // =========================

    const handleResendOtp = async () => {
        if (resendTimer > 0) return;

        try {
            setLoading(true);
            const resp = await getForgotPasswordOtp(email);
            setOtp("");
            setResendTimer(30);

        } catch (err) {
            setError({
                otp:
                    err?.response?.data?.message ||
                    "Unable to resend OTP",
            });
        } finally {
            setLoading(false);
        }
    };


    // =========================
    // STEP TITLE
    // =========================

    const getStepTitle = () => {
        if (step === 1) {
            return "Forgot Password?";
        }

        return "Reset Password";
    };


    return (
        <div className="forgot-password-page">

            <div className="forgot-password-container">

                {/* =========================
                    STEP INDICATOR
                ========================= */}

                <div className="forgot-password-steps">

                    <div
                        className={`step ${step >= 1 ? "active" : ""
                            }`}
                    >
                        <span>1</span>
                        <p>Email</p>
                    </div>

                    <div className="step-line"></div>

                    <div
                        className={`step ${step >= 2 ? "active" : ""
                            }`}
                    >
                        <span>2</span>
                        <p>Reset</p>
                    </div>

                </div>


                {/* =========================
                    CONTENT
                ========================= */}

                <div className="forgot-password-content">

                    {/* <div className="forgot-password-icon">
                        <Mail size={30} />
                    </div> */}

                    <h1>{getStepTitle()}</h1>

                    {step === 1 && (
                        <p>
                            Enter your registered email address
                            and we'll send you a verification OTP.
                        </p>
                    )}

                    {step === 2 && (
                        <p>
                            Enter the OTP sent to your registered
                            email and create your new password.
                        </p>
                    )}

                </div>


                {/* =========================
                    STEP 1
                ========================= */}

                {step === 1 && (
                    <form onSubmit={handleGetOtp}>

                        <Input
                            label="Email Address"
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                            leftIcon={<Mail size={21} />}
                            error={error.email}
                        //required
                        />

                        <div style={{ marginTop: "50px" }}>
                            <Button
                                text="Generate OTP"
                                type="submit"
                                loading={loading}
                                loadingElement={<Loader color="#ffffff" />}
                            />
                        </div>

                    </form>
                )}


                {/* =========================
                    STEP 2
                ========================= */}

                {step === 2 && (
                    <form onSubmit={handleResetPassword}>

                        {/* OTP */}

                        <div className="otp-input-group">

                            <label>Enter OTP</label>

                            <div className="otp-inputs">

                                {[0, 1, 2, 3, 4, 5].map(
                                    (index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={otp[index] || ""}
                                            onChange={(e) => {

                                                const value =
                                                    e.target.value
                                                        .replace(/\D/g, "");

                                                const otpArray =
                                                    otp.split("");

                                                otpArray[index] =
                                                    value;

                                                setOtp(
                                                    otpArray
                                                        .join("")
                                                        .slice(0, 6)
                                                );

                                                setError((prev) => ({
                                                    ...prev,
                                                    otp: "",
                                                }));

                                                if (
                                                    value &&
                                                    index < 5
                                                ) {
                                                    document
                                                        .getElementById(
                                                            `otp-${index + 1}`
                                                        )
                                                        ?.focus();
                                                }
                                            }}
                                            onKeyDown={(e) => {

                                                if (
                                                    e.key === "Backspace" &&
                                                    !otp[index] &&
                                                    index > 0
                                                ) {
                                                    document
                                                        .getElementById(
                                                            `otp-${index - 1}`
                                                        )
                                                        ?.focus();
                                                }
                                            }}
                                        />
                                    )
                                )}

                            </div>

                            {error.otp && (
                                <p className="otp-error">
                                    {error.otp}
                                </p>
                            )}

                        </div>


                        {/* NEW PASSWORD */}

                        <Input
                            label="New Password"
                            type="password"
                            name="newPassword"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={handleChange}
                            error={error.newPassword}
                            leftIcon={<Lock size={21} />}
                            required
                        />


                        {/* CONFIRM PASSWORD */}

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={handleChange}
                            error={error.confirmPassword}
                            leftIcon={<Lock size={21} />}
                            required
                        />


                        {/* PASSWORD HINT */}

                        {/* <div className="password-hint">

                            <p>Password must contain:</p>

                            <span>• At least 6 characters</span>
                            <span>• One number</span>
                            <span>• One special character</span>

                        </div> */}


                        {/* RESET BUTTON */}

                        <Button
                            text="Reset Password"
                            type="submit"
                            loading={loading}
                            loadingElement={<Loader color="#ffffff" />}
                        />


                        {/* RESEND OTP */}

                        <div className="resend-otp">

                            {resendTimer > 0 ? (
                                <p>
                                    Resend OTP in{" "}
                                    <strong>
                                        {resendTimer}s
                                    </strong>
                                </p>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={loading}
                                >
                                    Resend OTP
                                </button>
                            )}

                        </div>

                    </form>
                )}


                {/* =========================
                    BACK TO LOGIN
                ========================= */}

                <div className="back-login">

                    <Link
                        onClick={() => setForgotToggle(false)}
                    >
                        <ArrowLeft size={17} />
                        Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default ForgotPassword;