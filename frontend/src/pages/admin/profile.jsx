import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAdminProfile, updateAdminProfile } from "../../services/adminService";

export default function AdminProfile() {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);


    const [editForm, setEditForm] = useState({
        name: "",
        profile_image: "",
        password: ""
    });

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadAdmin();
    }, []);

    const loadAdmin = async () => {
        try {
            const res = await getAdminProfile();
            setAdmin(res.data.admin);

            setEditForm({
                name: res.data.admin.name,
                profile_image: res.data.admin.profile_image || "",
                password: ""
            });

            setLoading(false);

        } catch (err) {
            toast.error("Failed to load admin profile");
            setLoading(false);
        }
    };

    const updateProfile = async () => {
        setSaving(true);

        try {
            const payload = { ...editForm };
            if (!payload.password) delete payload.password;

            await updateAdminProfile(payload);

            toast.success("Profile updated!");
            setEditing(false);
            loadAdmin();

        } catch (err) {
            toast.error("Update failed");
        } finally {
            setSaving(false);
        }
    };

    if (loading || !admin) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin h-12 w-12 border-4 border-gray-300 border-t-orange-500 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">

                <div className="flex items-center gap-6">
                    <img
                        src={admin.profile_image || "https://media.istockphoto.com/id/1192884194/vector/admin-sign-on-laptop-icon-stock-vector.jpg?s=612x612&w=0&k=20&c=W7ClQXF-0UP_9trbNMvC04qUE4f__SOgg6BUdoX6hdQ="}
                        alt="profile"
                        className="w-24 h-24 rounded-full border shadow"
                    />

                    <div>
                        <h1 className="text-3xl font-bold">{admin.name}</h1>
                        <p className="text-gray-600">{admin.email}</p>
                        <p className="text-gray-400 text-sm">Role: {admin.role}</p>
                    </div>
                </div>

                <hr className="my-6" />

                    <button
                        onClick={() => toast.success("Features coming soon")}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
                    >
                        Edit Profile
                    </button>
                </div>
                
        
        </div>

)}
