import Image from "next/image";

type BannerProps = {
  openInfoPopup: () => void;
}

export default function PromoBanner({ openInfoPopup } : BannerProps) {
  return (
    <section 
      onClick={openInfoPopup} 
      className="
        absolute xl:top-5 top-20 left-1/2 -translate-x-1/2 z-50 
        flex flex-col 
        w-full xl:w-3/5 aspect-9/1 
        cursor-pointer"
      >
      <Image 
        src={"/baner.png"}
        alt="Promo Baner"
        fill
        className="object-cover"
      />
    </section>
  );
}
