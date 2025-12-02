export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyle =
    "px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 text-gray-700 hover:border-black",
    ghost: "text-gray-600 hover:text-black hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
