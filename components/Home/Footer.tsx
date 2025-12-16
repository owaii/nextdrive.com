import Image from "next/image";

export default function Footer() {
  return (
    <section className="w-full h-150 bg-(--Black) flex items-center justify-center flex-col mt-[-25px]"> 
      <div className="h-[90px] aspect-square relative">
        <Image 
          src="/logo1.png"
          alt="Logo"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}