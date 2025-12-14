export default function CloudinaryUploader({ onUpload }) {
  const uploadWidget = () => {
    if (!window.cloudinary) {
      alert("Cloudinary not loaded");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        multiple: false,
        maxFiles: 1,
      },
      (error, result) => {
        if (!error && result?.event === "success") {
          onUpload(result.info.secure_url);
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
