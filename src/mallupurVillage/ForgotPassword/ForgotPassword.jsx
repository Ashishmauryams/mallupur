
import { Link, useNavigate } from "react-router";
import "./ForgotPassword.scss";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, KeyRound, Mail, ShieldCheck } from "lucide-react";
import Input from "../reuseableCopmonent/Input";
import Button from "../reuseableCopmonent/Button/Button";

const ForgotPassword = ({ setForgotToggle }) => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const [resendTimer, setResendTimer] = useState(30);

    // =========================================
    // OTP TIMER
    // =========================================

    useEffect(() => {
        if (step !== 2 || resendTimer <= 0) return;

        const timer = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [step, resendTimer]);

    // =========================================
    // INPUT CHANGE
    // =========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setError((prev) => ({
            ...prev,
            [name]: "",
        }));

        if (name === "email") {
            setEmail(value);
        }

        if (name === "otp") {
            setOtp(value.replace(/\D/g, "").slice(0, 6));
        }

        if (name === "password") {
            setPassword(value);
        }

        if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    // =========================================
    // STEP 1 - GET OTP
    // =========================================

    const handleGetOtp = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError({
                email: "Email address is required",
            });
            return;
        }

        try {
            setLoading(true);

            // =====================================
            // API CALL WILL COME HERE
            // =====================================
            //
            // await forgotPassword(email);

            // Temporary
            await new Promise((resolve) => setTimeout(resolve, 800));

            setResendTimer(30);
            setStep(2);

        } catch (err) {
            setError({
                email:
                    err?.response?.data?.message ||
                    "Unable to send OTP. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    // =========================================
    // STEP 2 - VERIFY OTP
    // =========================================

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            setError({
                otp: "Please enter a valid 6-digit OTP",
            });
            return;
        }

        try {
            setLoading(true);

            // =====================================
            // API CALL WILL COME HERE
            // =====================================
            //
            // const response = await verifyOtp({
            //     email,
            //     otp,
            // });

            // Temporary
            await new Promise((resolve) => setTimeout(resolve, 800));

            setStep(3);

        } catch (err) {
            setError({
                otp:
                    err?.response?.data?.message ||
                    "Invalid or expired OTP",
            });
        } finally {
            setLoading(false);
        }
    };

    // =========================================
    // RESEND OTP
    // =========================================

    const handleResendOtp = async () => {
        if (resendTimer > 0) return;

        try {
            setLoading(true);

            // =====================================
            // API CALL WILL COME HERE
            // =====================================
            //
            // await forgotPassword(email);

            await new Promise((resolve) => setTimeout(resolve, 800));

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

    // =========================================
    // STEP 3 - RESET PASSWORD
    // =========================================

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password =
                "Password must be at least 6 characters";
        }

        if (!confirmPassword) {
            errors.confirmPassword =
                "Please confirm your password";
        } else if (password !== confirmPassword) {
            errors.confirmPassword =
                "Passwords do not match";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        try {
            setLoading(true);

            // =====================================
            // API CALL WILL COME HERE
            // =====================================
            //
            // await resetPassword({
            //     email,
            //     password,
            // });

            await new Promise((resolve) => setTimeout(resolve, 800));

            setStep(4);

        } catch (err) {
            setError({
                password:
                    err?.response?.data?.message ||
                    "Unable to reset password",
            });
        } finally {
            setLoading(false);
        }
    };

    // =========================================
    // STEP TITLE
    // =========================================

    const getStepTitle = () => {
        if (step === 1) return "Forgot Password?";
        if (step === 2) return "Verify OTP";
        if (step === 3) return "Create New Password";
        return "Password Reset Successfully";
    };

    return (
        <div className="forgot-password-page">

            <div className="forgot-password-container">

                {/* =====================================
                    STEP INDICATOR
                ===================================== */}

                {step !== 4 && (
                    <div className="forgot-password-steps">

                        <div
                            className={`step ${step >= 1 ? "active" : ""}`}
                        >
                            <span>1</span>
                            <p>Email</p>
                        </div>

                        <div className="step-line"></div>

                        <div
                            className={`step ${step >= 2 ? "active" : ""}`}
                        >
                            <span>2</span>
                            <p>Verify</p>
                        </div>

                        <div className="step-line"></div>

                        <div
                            className={`step ${step >= 3 ? "active" : ""}`}
                        >
                            <span>3</span>
                            <p>Password</p>
                        </div>

                    </div>
                )}

                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="forgot-password-content">

                    <div className="forgot-password-icon">

                        {step === 1 && <Mail size={28} />}

                        {step === 2 && <ShieldCheck size={28} />}

                        {step === 3 && <KeyRound size={28} />}

                        {step === 4 && (
                            <CheckCircle2 size={30} />
                        )}

                    </div>

                    <h1>{getStepTitle()}</h1>

                    {step === 1 && (
                        <p>
                            Enter your registered email address
                            and we'll send you a verification OTP.
                        </p>
                    )}

                    {step === 2 && (
                        <p>
                            We've sent a 6-digit OTP to{" "}
                            <strong>{email}</strong>
                        </p>
                    )}

                    {step === 3 && (
                        <p>
                            Create a new password for your account.
                        </p>
                    )}

                    {step === 4 && (
                        <p>
                            Your password has been updated
                            successfully. You can now login
                            with your new password.
                        </p>
                    )}

                </div>

                {/* =====================================
                    STEP 1
                ===================================== */}

                {step === 1 && (
                    <form onSubmit={handleGetOtp}>

                        <Input
                            label="Email Address"
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                            leftIcon={<Mail />}
                            error={error.email}
                            required
                        />

                        <Button
                            text="Get OTP"
                            type="submit"
                            loading={loading}
                        />

                    </form>
                )}

                {/* =====================================
                    STEP 2
                ===================================== */}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>

                        <div className="otp-input-group">
                            <label>Enter OTP</label>

                            <div className="otp-inputs">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={otp[index] || ""}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");

                                            const otpArray = otp.split("");

                                            otpArray[index] = value;

                                            setOtp(otpArray.join("").slice(0, 6));

                                            // Next box par focus
                                            if (value && index < 5) {
                                                document
                                                    .getElementById(`otp-${index + 1}`)
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
                                                    .getElementById(`otp-${index - 1}`)
                                                    ?.focus();
                                            }
                                        }}
                                        id={`otp-${index}`}
                                    />
                                ))}
                            </div>

                            {error.otp && (
                                <p className="otp-error">
                                    {error.otp}
                                </p>
                            )}
                        </div>

                        <Button
                            text="Verify OTP"
                            type="submit"
                            loading={loading}
                        />

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

                {/* =====================================
                    STEP 3
                ===================================== */}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>

                        <Input
                            label="New Password"
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={handleChange}
                            error={error.password}
                            required
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={handleChange}
                            error={error.confirmPassword}
                            required
                        />

                        <div className="password-hint">
                            <p>Password must contain:</p>

                            <span>• At least 6 characters</span>
                            <span>• One number</span>
                            <span>• One special character</span>
                        </div>

                        <Button
                            text="Reset Password"
                            type="submit"
                            loading={loading}
                        />

                    </form>
                )}

                {/* =====================================
                    STEP 4
                ===================================== */}

                {step === 4 && (
                    <div className="success-content">

                        <Button
                            text="Go to Login"
                            onClick={() => navigate("/login")}
                        />

                    </div>
                )}

                {/* =====================================
                    BACK TO LOGIN
                ===================================== */}

                {step !== 4 && (
                    <div className="back-login">

                        <Link onClick={() => setForgotToggle(false)}>
                            <ArrowLeft size={17} />
                            Back to Login
                        </Link>

                    </div>
                )}

            </div>
        </div>
    );
};

export default ForgotPassword;