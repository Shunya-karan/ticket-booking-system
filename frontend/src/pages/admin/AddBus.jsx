import { useState } from "react";
import api from "../../services/api"; // Assuming this path is correct
import toast from "react-hot-toast"; // Assuming react-hot-toast is installed
import { useNavigate } from "react-router-dom";
import { addBus } from "../../services/adminService";

export default function AddBus() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handler for all  text/date/time/number inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image URL inputs
  const handleImageChange = (index, value) => {
    const updated = [...form.bus_images];
    updated[index] = value;
    setForm({ ...form, bus_images: updated });
  };

  // Add new image input field
  const addImageField = () => {
    setForm({ ...form, bus_images: [...form.bus_images, ""] });
  };

  // Remove image field
  const removeImageField = (index) => {
    const updated = form.bus_images.filter((_, i) => i !== index);
    setForm({ ...form, bus_images: updated });
  };

  // Submit Form
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

      // Simple validation check for number (optional, but good practice)
      if (isNaN(payload.price) || payload.price <= 0) {
        toast.error("Invalid ticket price.");
        setIsSubmitting(false);
        return;
      }

      const res = await addBus(payload);
      toast.success(res.data?.message || "Bus added successfully!");

      // Navigate after successful submission
      navigate("/admin/active-bus"); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add bus");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define the base styles for input fields
  const inputBaseClasses = "w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 text-gray-700";
  const labelBaseClasses = "text-sm font-medium text-gray-700 block mb-1";

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50">
      
      {/* Container Card with Gradient */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden mt-8">
        
        {/* Header Section */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-white to-orange-100 border-b border-orange-200">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-600 tracking-tight">
         Register New Bus
          </h2>
          <p className="mt-2 text-gray-600">
            Enter all details for the new route and vehicle information.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

          {/* === BUS INFORMATION SECTION === */}
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="md:col-span-1">
              <label htmlFor="bus_name" className={labelBaseClasses}>Bus Name (e.g., King Express)</label>
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
                <option value="" disabled>Select Bus Type</option>
                <option value="Sleeper">Sleeper</option>
                <option value="Seater">Seater</option>
                {/* <option value="AC Sleeper">AC Sleeper</option>
                <option value="Non-AC Sleeper">Non-AC Sleeper</option> */}
              </select>
            </div>
          </div>

          {/* === ROUTE & TIMING SECTION === */}
          <h3 className="text-xl font-semibold text-gray-800 pt-4 border-t mt-6">Route & Schedule</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            
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

            <div>
              <label htmlFor="travel_date" className={labelBaseClasses}>Travel Date (YYYY-MM-DD)</label>
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
                placeholder="e.g., 999"
                className={inputBaseClasses}
                value={form.price}
                onChange={handleChange}
                required
              />
          </div>

          {/* === IMAGE URL INPUTS SECTION === */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 pt-4 border-t mt-6">Bus Images</h3>
            <p className="text-sm text-gray-500 mb-3">Provide public URLs for bus photos (e.g., exterior, interior).</p>

            {form.bus_images.map((img, index) => (
              <div key={index} className="flex gap-3 mt-3 items-center">
                {img && (
                                <img
                                    src={img}
                                    alt="preview"
                                    className="w-40 h-24 object-cover rounded mb-2 border"
                                    onError={(e) => (e.target.style.display = "none")}
                                />
                            )}
                <input
                  type="url" // Changed to type="url" for better browser validation
                  placeholder={`Image URL ${index + 1}`}
                  className={inputBaseClasses + " flex-1"}
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  // Only require the first one if we clean up empty ones on submit
                  required={index === 0} 
                />

                {/* Only show Remove button if there's more than one field */}
                {form.bus_images.length > 1 && (
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded-lg transition"
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
            disabled={isSubmitting}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg text-xl font-semibold shadow-lg transition duration-200 mt-8 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding Bus..." : "Confirm & Add Bus"}
          </button>
        </form>
      </div>
    </div>
  );
}