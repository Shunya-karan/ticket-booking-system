import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addBus } from "../../services/adminService";
import CloudinaryUploader from "../../components/CloudinaryUploader";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    setForm({ ...form, bus_images: updated });
  };

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

      const res = await addBus(payload);
      toast.success(res.data?.message || "Bus added successfully!");
      navigate("/admin/active-bus");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add bus");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium mb-4 transition group"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back</span>
        </button>

        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-1">Register New Bus</h1>
              <p className="text-white/90">Add a new bus to your fleet with complete details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Bus Information Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Bus Information</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bus Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bus_name"
                  placeholder="e.g., King Express"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                  value={form.bus_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bus_number"
                  placeholder="e.g., MH 01 AB 1234"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                  value={form.bus_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bus Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="bus_type"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition appearance-none bg-white"
                  value={form.bus_type}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Bus Type</option>
                  <option value="Sleeper">Sleeper</option>
                  <option value="Seater">Seater</option>
                </select>
              </div>
            </div>
          </div>

          {/* Route & Schedule Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Route & Schedule</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Point <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="start_point"
                  placeholder="e.g., Mumbai"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                  value={form.start_point}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Point <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="end_point"
                  placeholder="e.g., Pune"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                  value={form.end_point}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Travel Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="travel_date"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                  value={form.travel_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Departure Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="departure_time"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                  value={form.departure_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Arrival Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="arrival_time"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                  value={form.arrival_time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Pricing</h2>
            </div>

            <div className="md:w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ticket Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="e.g., 999"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Bus Images Section */}
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
                      className="w-full md:w-48 h-28 object-contain rounded mb-3 border"
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding Bus...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Confirm & Add Bus</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}