import Image from "next/image";
import toast from "react-hot-toast";

export default function Contact() {
  const phone_number = "+48 123 456 789";
  const email = "jan.kowalski@gmail.com"; 

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
    <section id="Contact" className="py-20 w-full flex flex-col justify-center items-center">
      <section className="w-full xl:w-3/5 flex py-10 px-2 xl:p-10 shadow-md cursor-pointer xl:rounded-3xl bg-(--White) text-(--Black)">
        <section className="w-full h-full flex">  
          {/* Block 1 */}
          <div className="flex-1">
            <div className="h-full flex justify-start items-center">
              <span className="text-xl xl:text-7xl font-extrabold">Skontaktuj się z nami</span>
            </div>
          </div>
          {/* Block 2 */}
          <section className="flex-2 xl:flex-1 h-full flex flex-col justify-end items-center py-2 xl:p-0">
            <section className="w-full flex">
              <div className="w-10 xl:w-[60px] aspect-square relative">
                <Image
                  src="/phone.png"
                  alt="Phone Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center ml-2 xl:ml-7">
                <span onClick={() => { handleCopy(phone_number) }} 
                  className="
                    relative text-black cursor-pointer
                    after:content-[''] after:absolute after:left-0 after:bottom-0
                    after:w-0 after:h-0.5 after:bg-black
                    after:transition-all after:duration-300
                    hover:after:w-full 
                    sm:text-xl xl:text-2xl font-semibold
                  ">
                  { phone_number }
                </span>
                <span className="sm:text-xs xl:text-sm italic">Pon - Pt: 8:00 - 20:00</span>
              </div>
            </section>
            <section className="w-full flex mt-6">
              <div className="w-10 xl:w-[60px] aspect-square relative">
                <Image
                  src="/email.png"
                  alt="Email Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center ml-2 xl:ml-7">
                <span onClick={() => { handleCopy(email) }} 
                  className="
                    relative text-black cursor-pointer
                    after:content-[''] after:absolute after:left-0 after:bottom-0
                    after:w-0 after:h-0.5 after:bg-black
                    after:transition-all after:duration-300
                    hover:after:w-full
                    sm:text-xl xl:text-2xl font-semibold
                  ">
                    { email }
                </span>
              </div>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}