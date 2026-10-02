
import { useState } from "react";
import "./RegisterComplaint.scss";
import SelectInput from "../../reuseableCopmonent/SelectInput/SelectInput";
import { categoryOptions, priorityOptions } from "./option.js";
import Input from "../../reuseableCopmonent/Input";
import TextAreaInput from "../../reuseableCopmonent/TextAreaInput/TextAreaInput.jsx";
import useValidation from "../../loginsign/useValidation.js";
import { registerComplaint } from "../../../api/apiService.js";
import { useAlert } from "../../../contextApi/AlertContext.jsx";
import Loading from "../../loader/Loading.jsx";
import { useNavigate } from "react-router";
import BackButton from "../../reuseableCopmonent/BackButton/BackButton.jsx";
import Button from "../../reuseableCopmonent/Button/Button.jsx";
import Loader from "../../reuseableCopmonent/loader/Loader.jsx";
const validationRules = {
    title: {
        required: true,
        requiredMessage: "Title is required",
    },

    description: {
        required: true,
        requiredMessage: "description is required",

        minLength: 5,
        minLengthMessage:
            "description must be at least 5 characters",
    },

    category: {
        required: true,
        requiredMessage: "category is required"
    },

    location: {
        required: true,
        requiredMessage: "Location is required"
    },

    priority: {
        required: true,
        requiredMessage: "priority is required",
    }
};

const RegisterComplaint = () => {
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        priority: "",
    });

    const [loading, setLoading] = useState(false);

    const validation = useValidation(formData, validationRules);

    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErr = validation();
        setError(validationErr);

        if (Object.keys(validationErr).length > 0) {
            return;
        }

        try {
            setLoading(true);
            const resp = await registerComplaint(formData);
            if (resp.status === 201) {
                showAlert({
                    message: "Complaint Register successfully!",
                    duration: 3000,
                    severity: "success",
                    variant: "filled",
                });
                navigate("/services/complaint/list");
                setFormData({
                    title: "",
                    description: "",
                    category: "",
                    location: "",
                    priority: "",
                });

            }
        } catch (error) {
            showAlert({
                message: error?.response?.data || "something went wrong",
                duration: 3000,
                severity: "error",
                variant: "filled",
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="complaint-page">
            <div className="container">

                <div className="complaint-header">
                    <div>
                        <span className="complaint-badge">Citizen Service</span>
                        <h1>Register a Complaint</h1>
                        <p> Village related problem ko register karein. </p>
                    </div>
                    <div>
                        <BackButton />
                    </div>
                </div>

                {/* Form Card */}
                <div className="complaint-card_2">

                    <form onSubmit={handleSubmit}>

                        <Input
                            label="Complaint Title"
                            name="title"
                            placeholder="Enter your title"
                            value={formData.title}
                            onChange={handleChange}
                            error={error.title}
                        //required

                        />

                        {/* Description */}
                        <TextAreaInput
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Problem ke baare mein detail mein batayein..."
                            rows={5}
                            //required
                            error={error.description}
                        />

                        {/* Category + Priority */}
                        <div className="form-row">

                            <SelectInput
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                options={categoryOptions}
                                placeholder="Select Category"
                                //required
                                error={error?.category}
                            />
                            <SelectInput
                                label="Priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                options={priorityOptions}
                                placeholder="Select Priority"
                                //required
                                error={error?.priority}
                            />

                        </div>

                        {/* Location */}

                        <Input
                            label="Location"
                            name="location"
                            placeholder="Enter your location"
                            value={formData.location}
                            onChange={handleChange}
                            error={error.location}
                        // required

                        />

                        <Button
                            text="Register Complaint"
                            type="submit"
                            loading={loading}
                            loadingElement={<Loader size={22} color="white" />}
                        />

                    </form>
                </div>

                <p className="form-note">
                    Please provide accurate information so that your complaint can be
                    resolved quickly.
                </p>

            </div>
        </section>
    );
};

export default RegisterComplaint;
