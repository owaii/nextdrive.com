import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full py-10 flex items-center justify-center">
      <div className="relative w-4/10 md:w-3/10 2xl:w-2/10 aspect-square">
        <Image
          src="images/Logo.png"
          alt="Logo"
          priority
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
