
import React, { useEffect, useState } from "react";
import {
    FolderPlus,
    FileText,
    CalendarDays,
    MapPin,
    Activity,
    RotateCcw,
} from "lucide-react";

import "./CreateVillageProject.scss";
import Input from "../../reuseableCopmonent/Input";
import TextAreaInput from "../../reuseableCopmonent/TextAreaInput/TextAreaInput";
import SelectInput from "../../reuseableCopmonent/SelectInput/SelectInput";
import { categoryOptions, status } from './option.js';
import { getCreateProject, getUpdateProject } from "../../../api/apiService.js";
import { useAlert } from "../../../contextApi/AlertContext.jsx";
import { useLocation, useNavigate, useParams } from "react-router";
import Loader from "../../reuseableCopmonent/loader/Loader.jsx";


const CreateVillageProject = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        budget: "",
        startDate: "",
        expectedEndDate: "",
        status: "",
        progress: 0,
        location: "",
    });

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const { id } = useParams();
    const isEditMode = Boolean(id);
    const location = useLocation();
    const project = location?.state?.project;


    useEffect(() => {
        if (!id) return;
        if (project) {
            setFormData({
                title: project?.title || "",
                description: project?.description || "",
                category: project?.category || "",
                budget: project?.budget || "",
                startDate: project?.startDate || "",
                expectedEndDate: project?.expectedEndDate || "",
                status: project?.status || "",
                progress: project?.progress || 0,
                location: project?.location || "",
            });
        }
    }, [project]);


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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Project title is required";
        } else if (formData.title.trim().length < 2) {
            newErrors.title = "Title must be at least 2 characters";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        } else if (formData.description.trim().length < 5) {
            newErrors.description =
                "Description must be at least 5 characters";
        }

        if (!formData.category) {
            newErrors.category = "Please select a category";
        }

        if (formData.budget === "") {
            newErrors.budget = "Budget is required";
        } else if (Number(formData.budget) < 0) {
            newErrors.budget = "Budget cannot be negative";
        }

        if (!formData.startDate) {
            newErrors.startDate = "Start date is required";
        }

        if (!formData.expectedEndDate) {
            newErrors.expectedEndDate =
                "Expected end date is required";
        }

        if (
            formData.startDate &&
            formData.expectedEndDate &&
            formData.expectedEndDate < formData.startDate
        ) {
            newErrors.expectedEndDate =
                "End date cannot be before start date";
        }

        if (!formData.status) {
            newErrors.status = "Please select project status";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }

        setError(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const projectData = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            category: formData.category,
            budget: Number(formData.budget),
            startDate: formData.startDate,
            expectedEndDate: formData.expectedEndDate,
            status: formData.status,
            progress: Number(formData.progress),
            location: formData.location.trim(),
        };

        try {
            setLoading(true);
            let resp;
            if (isEditMode) {
                resp = await getUpdateProject(id, projectData);
            } else {
                resp = await getCreateProject(projectData);
            }
            if (resp?.status === 201 || resp?.status === 200) {
                showAlert({
                    message: isEditMode
                        ? "Project Updated successfully!"
                        : "Project Created successfully!",
                    duration: 3000,
                    severity: "success",
                    variant: "filled",
                });
                navigate("/projects/all");
            }
        } catch (err) {
            showAlert({
                severity: "error",
                message: err?.response?.data ||
                    err?.response?.data?.message ||
                    "something went wrong",
                duration: 3000,
                variant: "filled"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            title: "",
            description: "",
            category: "",
            budget: "",
            startDate: "",
            expectedEndDate: "",
            status: "",
            progress: 0,
            location: "",
        });

        setErrors({});
    };

    return (
        <div className="create-village-project">

            <div className="create-village-project__header">
                <div className="create-village-project__header-icon">
                    <FolderPlus size={26} />
                </div>

                <div>
                    <p className="create-village-project__eyebrow">
                        VILLAGE PORTAL
                    </p>

                    <h1>{`${isEditMode ? "Update" : "Create"} Village Project`}</h1>

                    <p>
                        Add a new development project for your village.
                    </p>
                </div>
            </div>


            <div className="create-village-project__card">

                <form onSubmit={handleSubmit}>


                    <div className="create-village-project__section">
                        <div className="create-village-project__section-title">
                            <FileText size={20} />
                            <div>
                                <h2>Project Information</h2>
                                <span>
                                    Enter basic information about the project
                                </span>
                            </div>
                        </div>

                        <div className="create-village-project__grid">

                            <div className=" create-village-project__field--full">
                                <Input
                                    label="Project Title"
                                    name="title"
                                    placeholder="Enter project title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    error={error.title}
                                />
                            </div>

                            <div className=" create-village-project__field--full">
                                <TextAreaInput
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the village project..."
                                    rows={5}
                                    error={error.description}
                                />
                            </div>

                            <SelectInput
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                options={categoryOptions}
                                placeholder="Select Category"
                                error={error?.category}
                            />

                            <Input
                                label="Budget"
                                name="budget"
                                placeholder="Enter budget"
                                type="number"
                                value={formData.budget}
                                onChange={handleChange}
                                error={error.budget}
                            />

                        </div>
                    </div>

                    <div className="create-village-project__section">

                        <div className="create-village-project__section-title">
                            <CalendarDays size={20} />

                            <div>
                                <h2>Project Timeline</h2>
                                <span>
                                    Set the project start and expected completion date
                                </span>
                            </div>
                        </div>

                        <div className="create-village-project__grid">
                            <Input
                                label="Start Date"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                error={error.startDate}
                            />

                            <Input
                                label="Expected End Date"
                                name="expectedEndDate"
                                //placeholder="Enter budget"
                                type="date"
                                value={formData.expectedEndDate}
                                onChange={handleChange}
                                error={error.expectedEndDate}
                            />

                        </div>
                    </div>


                    <div className="create-village-project__section">

                        <div className="create-village-project__section-title">
                            <Activity size={20} />

                            <div>
                                <h2>Project Status</h2>
                                <span>
                                    Set the current state and progress
                                </span>
                            </div>
                        </div>

                        <div className="create-village-project__grid">
                            <SelectInput
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                options={status}
                                placeholder="Select status"

                                error={error?.status}
                            />

                            <div className="create-village-project__field">
                                <label htmlFor="progress">
                                    Progress
                                    <strong>{formData.progress}%</strong>
                                </label>

                                <input
                                    className="create-village-project__range"
                                    id="progress"
                                    type="range"
                                    name="progress"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={handleChange}
                                />

                                <div className="create-village-project__progress-info">
                                    <span>0%</span>
                                    <span>100%</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="create-village-project__section">

                        <div className="create-village-project__section-title">
                            <MapPin size={20} />

                            <div>
                                <h2>Project Location</h2>
                                <span>
                                    Enter the location where the work will take place
                                </span>
                            </div>
                        </div>
                        <Input
                            label="Location"
                            name="location"
                            placeholder="e.g. Mallupur Village"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            error={error.location}
                        />

                    </div>


                    <div className="create-village-project__actions">

                        <button
                            type="button"
                            className="create-village-project__reset"
                            onClick={handleReset}
                        >
                            <RotateCcw size={18} />
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="create-village-project__submit"
                            disabled={loading}
                        >
                            {loading ? <Loader /> : isEditMode ? "Update Project" : "Create Project"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default CreateVillageProject;
