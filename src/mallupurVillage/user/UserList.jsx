import React, { useEffect, useMemo, useState } from "react";
import { Eye, Search, Users, ShieldCheck, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getDeleteUserByAdmin, getUserFilter, } from "../../api/apiService";
import DynamicTable from "../reuseableCopmonent/table/DynamicTable";
import { columns, filters } from "./columns.js";
import { useAlert } from "../../contextApi/AlertContext.jsx";
import ConfirmModal from "../reuseableCopmonent/ConfirmModal/ConfirmModal.jsx";

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [filterValues, setFilterValues] = useState({
        username: "",
    });

    const [allUsers, setAllUsers] = useState([]);
    const [lastSearchedUsername, setLastSearchedUsername] = useState("");

    const { showAlert } = useAlert();

    useEffect(() => {
        fetchUserList()
    }, []);


    const handleDeleteClick = (id) => {
        setSelectedUserId(id);
        setShowDeleteModal(true);
    };

    const handleFilterChange = (key, value) => {
        setFilterValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleFilterApply = async (filters) => {

        const username = filters?.username?.trim();

        if (!username) {
            setUsers(allUsers);
            setLastSearchedUsername("");

            return;
        }

        if (username === lastSearchedUsername) {
            return;
        }

        try {

            setLoading(true);

            const resp = await getUserFilter(username);
            if (resp?.status === 200) {
                setUsers(resp.data);
                setLastSearchedUsername(username);
            }

        } catch (error) {
            if (error?.status === 404) {
                setUsers([]);
                setLastSearchedUsername(username);
                return;
            }
            console.log(error);

        } finally {

            setLoading(false);

        }
    };


    const fetchUserList = async () => {

        try {
            setLoading(true);
            const resp = await getAllUsers();
            if (resp?.status === 200) {
                setUsers(resp?.data);
                setAllUsers(resp?.data);
            }

        } catch (err) {
            console.log("err", err)

        } finally {
            setLoading(false);
        }
    }


    const handleDelete = async (id) => {

        try {

            setDeleteLoading(id);
            const resp = await getDeleteUserByAdmin(id);

            if (resp?.status === 200) {

                showAlert({
                    message: "User deleted successfully!",
                    duration: 3000,
                    severity: "success",
                    variant: "filled",
                });
                setShowDeleteModal(false);
                setSelectedUserId(null);

                setUsers((prev) =>
                    prev.filter((user) => user.id !== id)
                );

            }

        } catch (error) {

            showAlert({
                message: error?.msg || "Something wents wrong",
                duration: 3000,
                severity: "error",
                variant: "filled",
            });

        } finally {

            setDeleteLoading(null);

        }
    };


    const handleClear = () => {
        setFilterValues({
            username: "",
        });
        setLastSearchedUsername("");
        setUsers(allUsers);
    };

    const handleView = (id) => {
        navigate(`/user/details/${id}`);
    };


    return (
        <div>
            <DynamicTable
                tableTitle="Users List"
                tableSubtitle="Manage and view all registered village users"
                data={users}
                columns={columns}
                filters={filters}
                filterValues={filterValues}
                onFilterChange={handleFilterChange}
                onFilterApply={handleFilterApply}
                onView={handleView}
                onDelete={handleDeleteClick}
                onClear={handleClear}
                loading={loading}
                deleteLoading={deleteLoading}
                pageSize={10}
                showPagination={true}
                emptyMessage="No users found"
            />

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedUserId(null);
                }}
                onConfirm={() => handleDelete(selectedUserId)}
                title="Delete User?"
                message="Are you sure you want to remove this user? All this account information will be removed and this action cannot be undone."
                confirmText="Yes, Delete User"
                cancelText="Cancel"
                loading={deleteLoading === selectedUserId}
                loadingText="Deleting..."
                icon={Trash2}
            />

        </div>
    );
};

export default UserList;