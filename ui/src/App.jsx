import MobileBG from "./assets/bg-main-mobile.png";
import DesktopBG from "./assets/bg-main-desktop.png";
import CardFront from "./assets/bg-card-front.png";
import CardBack from "./assets/bg-card-back.png";
import ThankYouSVG from "./assets/icon-complete.svg";
import { useState } from "react";

function App() {
  const [cardName, setCardName] = useState();
  const [cardNum, setCardNum] = useState();
  const [expiryMonth, setExpiryMonth] = useState();
  const [expiryYear, setExpiryYear] = useState();
  const [cvc, setCvc] = useState();

  const [hasSubmited, setHasSubmited] = useState(false);
  const handleSubmit = () => {
    setHasSubmited(!hasSubmited);
  };

  const formatCardNumber = (value) => {
    let number = value.split(" ").join("");
    if (number.length > 0) {
      number = number.match(new RegExp(".{1,4}", "g")).join(" ");
    }

    setCardNum(number);
  };

  return (
    <div className="flex flex-col h-full w-full lg:flex-row overflow-hidden">
      <div className="relative lg:w-1/4">
        <img src={window.innerWidth == 1024 ? DesktopBG:MobileBG } alt="" className={`w-full lg:h-full`} />
      </div>
      <div className="absolute w-80 top-[50px] h-[172px] right-5 lg:top-[550px] lg:w-96 lg:h-[210px] lg:left-[12%]">
        <img src={CardBack} alt="" className="absolute w-full" />
        <div className="relative w-full h-full">
          <div className="w-full h-full flex justify-end items-center p-12">
            <p className=" text-sm">{cvc || "000"}</p>
          </div>
        </div>
      </div>
      <div className="absolute w-80 top-[150px] left-5 lg:top-[315px] lg:w-96 h-[210px] lg:left-[8%]">
        <img src={CardFront} alt="" className="absolute w-full" />
        <div className="relative p-6 h-full">
          <div className="flex flex-col">
            <div className="flex flex-row items-center mb-3">
              <div className="rounded-full w-10 h-10 bg-white mr-4"></div>
              <div className="rounded-full w-4 h-4 bg-transparent border border-white"></div>
            </div>
            <div className="mt-4 lg:mt-14">
              <p className="text-xl font-bold mb-3 tracking-wide">
                {cardNum || "0000 0000 0000 0000"}
              </p>
              <div className="flex flex-row justify-between">
                <p className="font-bold text-sm tracking-wider">
                  {cardName || "JANE APPLESEED"}
                </p>
                <p className="font-bold text-sm tracking-wider">
                  {expiryMonth || "00"}/{expiryYear || "00"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {hasSubmited ? (
        <div className="flex-1 bg-white lg:flex lg:justify-center">
          <div className="flex justify-center items-center flex-col p-6 mt-20 text-center ">
            <div className="mb-10">
            <img src={ThankYouSVG} alt="" className="w-24" />
            </div>
            <h1 className="text-very-dark-violet text-4xl font-bold mb-6">
              THANK YOU!
            </h1>
            <p className="text-black/50 text-xl font-bold mb-14">
              We've added your card details
            </p>
            <button
              onClick={handleSubmit}
              className="p-4 text-white bg-very-dark-violet rounded-xl text-xl font-bold w-full"
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-white text-black">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-7 mt-20 lg:p-80 lg:max-w-[1241px]"
          >
            <div className="flex flex-col mb-6">
              <label className="mb-2">CARDHOLDER NAME</label>
              <input
                type="text"
                placeholder="e.g. Jane Appleseed"
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                value={cardName}
                className="peer invalid:border-pink-500 invalid:text-pink-600 p-4 rounded-xl bg-transparent border focus:outline-none focus:border-very-dark-violet focus:ring-1 focus:ring-very-dark-violet"
                required
              />
                  <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">Please provide a valid cardholder name</p>
            </div>
            <div className="flex flex-col mb-6">
              <label className="mb-2">CARD NUMBER</label>
              <input
                type="text"
                placeholder="e.g. 1234 5678 9123 0000"
                onChange={(e) => formatCardNumber(e.target.value)}
                maxLength={19}
                value={cardNum}
                className="peer invalid:border-pink-500 invalid:text-pink-600 p-4 rounded-xl bg-transparent border focus:outline-none focus:border-very-dark-violet focus:ring-1 focus:ring-very-dark-violet"
                required
                pattern="[0-9\s]{19}"
              />
                  <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">Please provide a valid card number</p>
            </div>
            <div className="flex flex-row mb-6">
              <div className="w-1/2">
                <label>EXP. DATE (MM/YY)</label>
                <div className="flex flex-row mt-2 flex-wrap">
                  <input
                    type="text"
                    placeholder="MM"
                    pattern="[0-9]{2}"
                    maxLength={2}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    value={expiryMonth}
                    required
                    className="peer invalid:border-pink-500 invalid:text-pink-600 p-4 rounded-xl bg-transparent border focus:outline-none focus:border-very-dark-violet focus:ring-1 focus:ring-very-dark-violet w-[70px] mr-3"
                  />
                  <input
                    type="text"
                    placeholder="YY"
                    pattern="[0-9]{2}"
                    maxLength={2}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    value={expiryYear}
                    required
                    className="invalid:border-pink-500 invalid:text-pink-600 p-4 rounded-xl bg-transparent border focus:outline-none focus:border-very-dark-violet focus:ring-1 focus:ring-very-dark-violet w-[70px]"
                  />
                  <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">Please provide a valid expiry date.</p>
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <label className="mb-2">CVC</label>
                <input
                  type="text"
                  maxLength={3}
                  placeholder="e.g. 123"
                  onChange={(e) => setCvc(e.target.value)}
                  value={cvc}
                  pattern="[0-9]{3}"
                  required
                  className="peer invalid:border-pink-500 invalid:text-pink-600 p-4 rounded-xl bg-transparent border focus:outline-none focus:border-very-dark-violet focus:ring-1 focus:ring-very-dark-violet"
                />
                <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">Please provide a valid CVC.</p>
              </div>
            </div>
            <button className="p-4 text-white bg-very-dark-violet rounded-xl text-lg font-bold" type="submit">
              Confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
