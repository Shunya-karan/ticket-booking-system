import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import { getBusById } from "../../services/adminService"; // Assuming this service exists

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

    // --- State & Handlers ---

    // Fetch existing bus details on component mount
    useEffect(() => {
        loadBus();
    }, [bus_id]);

    const loadBus = async () => {
        try {
            const res = await getBusById(bus_id);

            if (!res.data.bus) {
                toast.error("Bus not found");
                setLoading(false);
                return;
            }

            const bus = res.data.bus;

            // Ensure bus_images is an array, handling various backend formats
            const images = Array.isArray(bus.bus_images)
                ? bus.bus_images
                : (bus.bus_images && JSON.parse(bus.bus_images)) || [""];
            
            // Format price from string/number to ensure correct state initialization
            const formattedPrice = String(bus.price); 

            setForm({
                bus_name: bus.bus_name || "",
                bus_number: bus.bus_number || "",
                // Ensure bus_type is handled correctly, defaulting to an option if not set
                bus_type: bus.bus_type || "Sleeper", 
                bus_images: images.length > 0 ? images : [""],
                start_point: bus.start_point || "",
                end_point: bus.end_point || "",
                // Date input needs YYYY-MM-DD format
                travel_date: bus.travel_date ? new Date(bus.travel_date).toISOString().split('T')[0] : "",
                departure_time: bus.departure_time || "",
                arrival_time: bus.arrival_time || "",
                price: formattedPrice
            });

            setLoading(false);
        } catch (err) {
            console.error("Failed to load bus details:", err);
            toast.error("Failed to load bus details");
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
        // Ensure there is at least one field left
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
                toast.error("Invalid ticket price.");
                setIsSubmitting(false);
                return;
            }


            await api.put(`/admin/update/${bus_id}`, payload);

            toast.success("Bus updated successfully!");
            navigate("/admin/buses");
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Define the base styles for input fields
    const inputBaseClasses = "w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 text-gray-700";
    const labelBaseClasses = "text-sm font-medium text-gray-700 block mb-1";
    
    // --- Conditional Rendering for Loading State ---
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-xl text-gray-600">Loading bus data for ID: **{bus_id}**...</p>
            </div>
        );
    }
    
    // --- Main Component Render ---

    return (
        <div className="min-h-screen p-4 sm:p-8 bg-gray-100">
            
            {/* Container Card with Shadow and Rounded Edges */}
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden mt-8">
                
                {/* Header Section with Orange Gradient */}
                <div className="p-6 sm:p-8 bg-gradient-to-r from-white to-orange-100 border-b border-orange-200">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-600 tracking-tight">
                        Update Bus Details
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Editing information for Bus ID: {bus_id}
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

                    {/* === BUS INFORMATION SECTION === */}
                    <div className="grid md:grid-cols-3 gap-6">
                        
                        <div className="md:col-span-1">
                            <label htmlFor="bus_name" className={labelBaseClasses}>Bus Name</label>
                            <input
                                type="text"
                                name="bus_name"
                                id="bus_name"
                                placeholder="Bus Name"
                                className={inputBaseClasses}
                                value={form.bus_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="md:col-span-1">
                            <label htmlFor="bus_number" className={labelBaseClasses}>Vehicle Number</label>
                            <input
                                type="text"
                                name="bus_number"
                                id="bus_number"
                                placeholder="Bus Number (e.g., MH 01 AB 1234)"
                                className={inputBaseClasses}
                                value={form.bus_number}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="md:col-span-1">
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
                            </select>
                        </div>
                    </div>

                    {/* === ROUTE & TIMING SECTION === */}
                    <h3 className="text-xl font-semibold text-gray-800 pt-4 border-t mt-6">Route & Schedule</h3>
                    
                    {/* Start/End Point and Date */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="start_point" className={labelBaseClasses}>Start Point</label>
                            <input
                                type="text"
                                name="start_point"
                                id="start_point"
                                placeholder="Start Point"
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
                                placeholder="End Point"
                                className={inputBaseClasses}
                                value={form.end_point}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
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
                    
                    {/* Departure/Arrival Time */}
                    <div className="grid md:grid-cols-2 gap-6">
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

                    {/* === PRICE SECTION === */}
                    <div className="md:w-1/2">
                        <label htmlFor="price" className={labelBaseClasses}>Ticket Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Ticket Price"
                            className={inputBaseClasses}
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* === IMAGE URL INPUTS SECTION === */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 pt-4 border-t mt-6">Bus Images</h3>
                        <p className="text-sm text-gray-500 mb-3">Update or add new public URLs for bus photos.</p>

                        {form.bus_images.map((img, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-3 mt-3 items-start sm:items-center p-3 border border-gray-100 rounded-lg bg-white shadow-sm">
                                
                                {/* Image Preview */}
                                {img && (
                                    <div className="flex-shrink-0">
                                        <img
                                            src={img}
                                            alt={`Bus preview ${index + 1}`}
                                            className="w-full sm:w-40 h-24 object-cover rounded border border-gray-300"
                                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                                        />
                                    </div>
                                )}
                                
                                {/* Image Input */}
                                <input
                                    type="url"
                                    placeholder={`Image URL ${index + 1}`}
                                    className={inputBaseClasses + " flex-1 min-w-0"}
                                    value={img}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                />

                                {/* Remove Button */}
                                {form.bus_images.length > 1 && (
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded-lg transition self-end sm:self-center flex-shrink-0"
                                        onClick={() => removeImageField(index)}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow-md transition duration-200 flex items-center gap-1"
                            onClick={addImageField}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            Add Image Field
                        </button>
                    </div>


                    {/* === SUBMIT BUTTON === */}
                    <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg text-xl font-semibold shadow-lg transition duration-200 mt-8 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving Updates...
                            </>
                        ) : (
                            "Update Bus Details"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}