import Image from "next/image";
import clsx from "clsx";
import toast from "react-hot-toast";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

function CopytTextWrapper({phone_number, text, handleEvent} : {phone_number: string, text: string, handleEvent: () => void}) {
  return (
    <div className="flex gap-2 items-center">
      <span 
        onClick={() => handleEvent()}
        className={clsx(
          "text-sm text-white font-bold",
          "relative cursor-pointer",
          "after:content-[''] after:absolute after:left-0 after:bottom-0",
          "after:w-0 after:h-0.5 after:bg-white",
          "after:transition-all after:duration-300",
          "hover:after:w-full",
          "lg:text-lg"
      )}>
        { phone_number }
      </span>
      <span className="text-xs text-white 2xl:text-sm italic">{ text }</span>
    </div>
  );
}

export default function Footer() {
  const phone_number = "+48 571 542 411";
  const text_prim = "Pon - Pt: 8:00 - 20:00";
  const text_sec = "Legionowo, Wieliszewo i okolice";
  const phone_number_sec = "+48 790 013 286";
  const mail = "jazdydoszkalajace24h@gmail.com";

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Skopiowano do schowka!");
    } catch (err) {
      toast.error("Nie udało się skopiować");
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="w-full py-10 flex lg:flex-row flex-col items-center justify-center lg:gap-40 gap-5">
      <section className="flex flex-col items-start gap-4 lg:px-0 px-5">
        <div className="w-full flex lg:justify-start justify-center">
          <span className="text-4xl lg:text-5xl font-extrabold text-white">Kontakt</span>
        </div>
        <section className="flex gap-3">
          <div className="flex items-center justify-center">
            <CallIcon sx={{ fontSize: 40 }} className="text-white" />
          </div>
          <section className="flex flex-col gap-1">
            <CopytTextWrapper phone_number={phone_number} text={text_prim} handleEvent={() => handleCopy(phone_number)}/>
            <CopytTextWrapper phone_number={phone_number_sec} text={text_sec} handleEvent={() => handleCopy(phone_number_sec)}/>
          </section>
        </section>
        <section className="flex gap-3">
          <div className="flex items-center justify-center">
            <EmailIcon sx={{ fontSize: 40 }} className="text-white" />
          </div>
          <CopytTextWrapper phone_number={mail} text="" handleEvent={() => handleCopy(mail)} />
        </section>
      </section>
      <div className="relative w-4/10 2xl:w-2/10 aspect-square">
        <Image
          src ="/images/Logo.png"
          alt ="Logo"
          priority
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}