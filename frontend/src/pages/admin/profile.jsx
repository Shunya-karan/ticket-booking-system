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

                {!editing ? (
                    <button
                        onClick={() => setEditing(true)}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            className="w-full border p-3 rounded-lg"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />

                        <input
                            type="url"
                            name="profile_image"
                            className="w-full border p-3 rounded-lg"
                            placeholder="Profile Image URL"
                            value={editForm.profile_image}
                            onChange={(e) => setEditForm({ ...editForm, profile_image: e.target.value })}
                        />

                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="w-full border p-3 rounded-lg pr-12"
                                placeholder="New Password (optional)"
                                value={editForm.password}
                                onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                            />

                            {/* Eye Icon */}
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                            >
                                {showPassword ? (
                                    // Eye-Off Icon
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-10" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-3.582-11-8
          a11.964 11.964 0 013.314-5.304M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1L4 4m16 16l-2.1-2.1" />
                                    </svg>
                                ) : (
                                    // Eye Icon
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-10" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7 0c-1 4.418-5.477 8-11
          8S1 16.418 0 12C1 7.582 5.477 4 12 4s10 3.582 11 8z" />
                                    </svg>
                                )}
                            </span>
                        </div>


                        <button
                            onClick={updateProfile}
                            disabled={saving}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                        <button
                            onClick={() => setEditing(false)}
                            className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
