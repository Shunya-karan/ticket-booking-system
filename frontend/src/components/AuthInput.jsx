const AuthInput = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none font-medium"
        required
      />
    </div>
  );
};

export default AuthInput;
