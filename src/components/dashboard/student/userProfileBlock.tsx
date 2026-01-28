import Image from "next/image";

export default function UserProfileBlock({
  FullName,
  Mail,
  ImgSrc,
}: {
  FullName?: string;
  Mail?: string;
  ImgSrc?: string;
}) {
  return (
    <section
      className="
        h-full flex-1 box-border
        bg-(--student-bg-header)/30
        backdrop-blur-lg
        border border-white/10
        shadow-xl
        rounded-xl
        flex lg:flex-col
        gap-3 lg:gap-0
        py-5 lg:py-0
      "
    >
      <div className="w-full lg:h-2/3 flex justify-start items-end">
        <div className="pl-5">
          <Image
            src={`/images/${ImgSrc || "DefaultProfilePicture.png"}`}
            alt="Profile Pic"
            width={140}
            height={140}
            className="object-contain rounded-full"
          />
        </div>
      </div>

      <section className="w-full lg:h-1/3 flex flex-col gap-2 lg:pl-7 lg-justify-start justify-center">
        <span className="text-(--student-txt-prim) font-bold tracking-wide text-2xl">
          {FullName || ""}
        </span>
        <span className="text-(--student-txt-prim) font-semibold tracking-wide text-xs">
          {Mail || ""}
        </span>
      </section>
    </section>
  );
}
