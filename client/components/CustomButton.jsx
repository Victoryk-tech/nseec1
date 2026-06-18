import Link from "next/link";

const CustomButton = ({ href, label }) => {
  return (
    <Link
      href={href}
      className="inline-block w-64 md:w-44 py-6 text-[13px] font-medium bg-social text-color mt-8 md:mt-8 hover:bg-gray-200 transition duration-300"
    >
      {label}
    </Link>
  );
};

export default CustomButton;
