const Button = ({
  type,
  label,
  padding,
  bgColor,
  textColor,
  hoverBgColor,
  hoverTextColor,
  onClick,
  classes,
  data,
  disabled,
}) => {
  const styles =
    classes +
    " " +
    padding +
    " " +
    bgColor +
    " " +
    textColor +
    " " +
    hoverBgColor +
    " " +
    hoverTextColor;
  return (
    <button
      type={type}
      data-data={data}
      className={`${styles}
          flex gap-4 items-center justify-center
          border border-current rounded-primary
          font-bold transition ease-in-out delay-50`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
