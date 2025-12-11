export default function CloudinaryUploader({ onUpload }) {
  const uploadWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET, // your unsigned preset
        multiple: false,
        maxFiles: 1,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Uploaded Image:", result.info.secure_url);
          onUpload(result.info.secure_url); // send image URL to parent
        }
      }
    );

    widget.open();
  };

  return (
    <button
      type="button"
      onClick={uploadWidget}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
    >
      Upload Image
    </button>
  );
}
