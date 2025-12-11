import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CloudinaryUploader from "../../components/CloudinaryUploader";
import api from "../../services/api";
import { getBusById } from "../../services/adminService";

export default function UpdateBus() {
    const { bus_id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        bus_name: "",
        bus_number: "",
        bus_type: "",
        bus_images: [""],
        start_point: "",
        end_point: "",
        travel_date: "",
        departure_time: "",
        arrival_time: "",
        price: ""
    });

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch existing bus details on component mount
    useEffect(() => {
        loadBus();
    }, [bus_id]); // Fixed: added bus_id as dependency

    const loadBus = async () => {
        try {
            const res = await getBusById(bus_id);

            if (!res.data.bus) {
                toast.error("Bus not found");
                setLoading(false);
                return;
            }

            const bus = res.data.bus;

            // Ensure bus_images is an array
            let images = [""];
            try {
                images = Array.isArray(bus.bus_images)
                    ? bus.bus_images
                    : (bus.bus_images ? JSON.parse(bus.bus_images) : [""]);
                if (images.length === 0) images = [""];
            } catch (e) {
                console.error("Error parsing bus images:", e);
                images = [""];
            }

            // Format date properly (handle timezone issues)
            let formattedDate = "";
            if (bus.travel_date) {
                try {
                    const date = new Date(bus.travel_date);
                    // Use local timezone offset to get correct date
                    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                    formattedDate = localDate.toISOString().split('T')[0];
                } catch (e) {
                    console.error("Error formatting date:", e);
                }
            }

            setForm({
                bus_name: bus.bus_name || "",
                bus_number: bus.bus_number || "",
                bus_type: bus.bus_type || "Sleeper",
                bus_images: images,
                start_point: bus.start_point || "",
                end_point: bus.end_point || "",
                travel_date: formattedDate,
                departure_time: bus.departure_time || "",
                arrival_time: bus.arrival_time || "",
                price: String(bus.price || "")
            });

            setLoading(false);
        } catch (err) {
            console.error("Failed to load bus details:", err);
            toast.error(err.response?.data?.message || "Failed to load bus details");
            setLoading(false);
        }
    };

    // Handle generic input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle image URL changes
    const handleImageChange = (index, value) => {
        const updated = [...form.bus_images];
        updated[index] = value;
        setForm({ ...form, bus_images: updated });
    };

    const addImageField = () => {
        setForm({ ...form, bus_images: [...form.bus_images, ""] });
    };

    const removeImageField = (index) => {
        const updated = form.bus_images.filter((_, i) => i !== index);
        setForm({ ...form, bus_images: updated.length > 0 ? updated : [""] });
    };

    // Submit updates
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const cleanedImages = form.bus_images.filter(url => url.trim() !== "");

        if (cleanedImages.length === 0) {
            toast.error("Please provide at least one image URL.");
            setIsSubmitting(false);
            return;
        }

        try {
            const payload = {
                ...form,
                bus_images: cleanedImages,
                price: Number(form.price),
            };

            if (isNaN(payload.price) || payload.price <= 0) {
                toast.error("Invalid ticket price. Must be greater than 0.");
                setIsSubmitting(false);
                return;
            }

            await api.put(`/admin/update/${bus_id}`, payload);

            toast.success("Bus updated successfully!");
            navigate("/admin/buses");
        } catch (err) {
            console.error("Update error:", err);
            toast.error(err.response?.data?.message || "Update failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Styles
    const inputBaseClasses = "w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 text-gray-800 bg-white";
    const labelBaseClasses = "text-sm font-semibold text-gray-700 block mb-2";

    // Loading State
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium mb-4 transition group"
                >
                    <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                    <span>Back</span>
                </button>
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                    <div className="flex flex-col items-center gap-4">
                        <svg className="animate-spin h-12 w-12 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-xl font-medium text-gray-700">Loading bus data...</p>
                        <p className="text-sm text-gray-500">Bus ID: {bus_id}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Main Component
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-6 px-4 sm:px-6 lg:px-8">

            {/* Main Container */}
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium mb-4 transition group"
                >
                    <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                    <span>Back</span>
                </button>
                {/* Card with Gradient */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

                    {/* Header with Gradient */}
                    <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-6 sm:p-8 lg:p-10">

                        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5"></div>
                        <div className="relative">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                Update Bus Details
                            </h1>
                            <p className="mt-3 text-orange-100 text-base sm:text-lg">
                                Editing information for Bus ID: <span className="font-semibold text-white">{bus_id}</span>
                            </p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10">

                        {/* Bus Information Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Bus Information</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

                                <div>
                                    <label htmlFor="bus_name" className={labelBaseClasses}>Bus Name</label>
                                    <input
                                        type="text"
                                        name="bus_name"
                                        id="bus_name"
                                        placeholder="e.g., Express Travels"
                                        className={inputBaseClasses}
                                        value={form.bus_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="bus_number" className={labelBaseClasses}>Vehicle Number</label>
                                    <input
                                        type="text"
                                        name="bus_number"
                                        id="bus_number"
                                        placeholder="e.g., MH 01 AB 1234"
                                        className={inputBaseClasses}
                                        value={form.bus_number}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2 lg:col-span-1">
                                    <label htmlFor="bus_type" className={labelBaseClasses}>Bus Type</label>
                                    <select
                                        name="bus_type"
                                        id="bus_type"
                                        className={inputBaseClasses}
                                        value={form.bus_type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="Sleeper">Sleeper</option>
                                        <option value="Seater">Seater</option>
                                        <option value="AC Sleeper">AC Sleeper</option>
                                        <option value="Non-AC Sleeper">Non-AC Sleeper</option>
                                        <option value="Semi-Sleeper">Semi-Sleeper</option>
                                        <option value="AC Seater">AC Seater</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Route & Schedule Section */}
                        <div className="mb-8 pt-8 border-t-2 border-orange-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Route & Schedule</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
                                <div>
                                    <label htmlFor="start_point" className={labelBaseClasses}>Start Point</label>
                                    <input
                                        type="text"
                                        name="start_point"
                                        id="start_point"
                                        placeholder="e.g., Mumbai"
                                        className={inputBaseClasses}
                                        value={form.start_point}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="end_point" className={labelBaseClasses}>End Point</label>
                                    <input
                                        type="text"
                                        name="end_point"
                                        id="end_point"
                                        placeholder="e.g., Pune"
                                        className={inputBaseClasses}
                                        value={form.end_point}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2 lg:col-span-1">
                                    <label htmlFor="travel_date" className={labelBaseClasses}>Travel Date</label>
                                    <input
                                        type="date"
                                        name="travel_date"
                                        id="travel_date"
                                        className={inputBaseClasses}
                                        value={form.travel_date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                <div>
                                    <label htmlFor="departure_time" className={labelBaseClasses}>Departure Time</label>
                                    <input
                                        type="time"
                                        name="departure_time"
                                        id="departure_time"
                                        className={inputBaseClasses}
                                        value={form.departure_time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="arrival_time" className={labelBaseClasses}>Expected Arrival Time</label>
                                    <input
                                        type="time"
                                        name="arrival_time"
                                        id="arrival_time"
                                        className={inputBaseClasses}
                                        value={form.arrival_time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="mb-8 pt-8 border-t-2 border-orange-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Pricing</h2>
                            </div>

                            <div className="max-w-md">
                                <label htmlFor="price" className={labelBaseClasses}>Ticket Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Enter ticket price"
                                    className={inputBaseClasses}
                                    value={form.price}
                                    onChange={handleChange}
                                    min="1"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        {/* Images Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Bus Images</h2>
                                    <p className="text-sm text-gray-500 mt-1">Upload or edit bus photos</p>
                                </div>
                            </div>

                            {/* ⭐ Cloudinary Upload Button (ONLY ONCE) */}
                            <CloudinaryUploader
                                onUpload={(url) => {
                                    setForm((prev) => ({
                                        ...prev,
                                        bus_images: [...prev.bus_images, url],
                                    }));
                                }}
                            />

                            <div className="space-y-4 mt-6">
                                {form.bus_images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-xl border-2 border-orange-100 shadow-sm"
                                    >
                                        {/* Image Preview */}
                                        {img && (
                                            <img
                                                src={img}
                                                alt="preview"
                                                className="w-full md:w-48 h-28 object-cover rounded mb-3 border"
                                                onError={(e) => (e.target.style.display = 'none')}
                                            />
                                        )}

                                        {/* URL Field */}
                                        <div className="flex gap-3">
                                            <input
                                                type="url"
                                                placeholder={`Image URL ${index + 1}`}
                                                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                                                value={img}
                                                onChange={(e) => handleImageChange(index, e.target.value)}
                                            />

                                            {/* Delete Button */}
                                            {form.bus_images.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="bg-red-500 hover:bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-xl transition shadow-md"
                                                    onClick={() => removeImageField(index)}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* + Add Image Field Button */}
                                <button
                                    type="button"
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition flex items-center gap-2"
                                    onClick={addImageField}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Image Field
                                </button>
                            </div>
                        </div>



                        {/* Submit Button */}
                        <div className="mt-10 pt-8 border-t-2 border-orange-100">
                            <button
                                type="submit"
                                disabled={isSubmitting || loading}
                                className="w-full bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 hover:from-orange-700 hover:via-orange-800 hover:to-orange-900 text-white p-4 sm:p-5 rounded-xl text-lg sm:text-xl font-bold shadow-2xl transition duration-300 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Saving Updates...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>Update Bus Details</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}