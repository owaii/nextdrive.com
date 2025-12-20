import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";

type OpinionBlockProps = {
  name: string;
  description: string;
  stars: string;
};

const OpinionBlock = forwardRef<HTMLElement, OpinionBlockProps>(
  ({ name, description, stars }, ref) => {
    return (
      <section
        ref={ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9/10 2xl:w-1/3 flex flex-col gap-2 bg-brand-white rounded-2xl p-4 shadow"
      >
        <div className="w-full flex justify-start items-center">
          <span className="text-xl text-txt-black font-medium">{name}</span>
        </div>
        <div className="w-full flex justify-start items-center">
          <span className="text-l text-txt-black font-light">{description}</span>
        </div>
        <div className="w-full flex justify-start items-center">
          <span className="text-xl text-txt-black font-light">{stars}</span>
        </div>
      </section>
    );
  }
);

export default function OpionsFunction() {
  const opinions = [
    {
      name: "Mikołaj Dębski",
      description:
        "Bardzo polecam! Instruktor dokładnie tłumaczy każdy manewr i potrafi wytłumaczyć wszystko spokojnie.",
      stars: "⭐⭐⭐⭐⭐",
    },
    {
      name: "Jan Kowalski",
      description: "Świetne jazdy! Instruktor cierpliwie tłumaczy wszystkie manewry i daje praktyczne wskazówki.",
      stars: "⭐⭐⭐⭐⭐",
    },
    {
      name: "Patryk Nowak",
      description: "Dzięki indywidualnemu podejściu instruktora czuję się pewniej i bezpieczniej za kierownicą.",
      stars: "⭐⭐⭐⭐⭐",
    },
  ];

  const blocksRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    gsap.set(blocksRef.current, { autoAlpha: 0, y: -20 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    blocksRef.current.forEach((block) => {
      tl.to(block, { autoAlpha: 1, y: 0, duration: 0.6 })
        .to(block, { autoAlpha: 0, y: 20, duration: 0.6 }, "+=5");
    });
  }, []);

  return (
    <section className="relative w-full h-[40vh] sm:h-[55vh] 2xl:h-[30vh] bg-brand-white flex flex-col shadow-[inset_0px_0px_40px_-27px_rgba(66,68,90,1)]">
      {opinions.map((opinion, index) => (
        <OpinionBlock
          key={index}
          ref={(el) => {
            if (el) blocksRef.current[index] = el;
          }}
          {...opinion}
        />
      ))}
    </section>
  );
}
