const UploadImage = ({
  id,
  name,
  label,
  onChange,
  disabled,
  avatar,
  className,
  src,
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center justify-center space-x-2 mt-1 rtl:gap-2">
        {avatar ? (
          <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">
            <img src={src} alt="avatar img" />
          </span>
        ) : (
          <input
            id={id}
            className="dark:text-placeholder-color"
            type="file"
            name={name}
            accept="image/*"
            onChange={onChange}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
