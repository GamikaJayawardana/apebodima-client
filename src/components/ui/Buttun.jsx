import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const baseStyles =
    "px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-brand-green text-brand-dark hover:bg-lime-400 shadow-lg shadow-lime-500/20",
    glass: "glass text-white hover:bg-white/20",
    text: "text-white hover:text-brand-green",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
