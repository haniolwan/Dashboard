import { forwardRef } from "react";

const UploadImage = forwardRef(
  ({ id, name, label, onChange, disabled, avatar, className, src }, ref) => {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center space-x-2 mt-1 rtl:gap-2">
          {avatar ? (
            <span
              className={`inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100 ${className}`}
            >
              <img src={src} alt="avatar img" />
            </span>
          ) : (
            <input
              ref={ref}
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
  }
);

export default UploadImage;
