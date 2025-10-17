import { useState } from "react";
import "./App.css";
import Images from "./assets/components/Images";
import logo from "/src/assets/WeatherMe.png";
import { FaLocationDot } from "react-icons/fa6";
import { BsThermometerHigh } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [datas, setDatas] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleBtn = (e) => {
    e.preventDefault();
    if (!city) {
      setError("Write a City or Country.");
      setDatas(null);
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "404") {
          setError("Enter the valid City or Country,");
          setDatas(null);
        } else {
          setError("");
          setDatas(data);
        }
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen py-10">
        <div className="flex">
          <Images src={logo} />
          <h1 className="text-[40px] md:text-[69px] font-Nunito">WeatherMe</h1>
        </div>
        <div className="text-center"> 
          <form onSubmit={handleBtn}>
            <input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Search location..."
              className="bg-[#D9D9D9] h-[66px] w-[4 00px] md:w-[711px] px-[40px] py-[12px] rounded-2xl placeholder:font-Nunito placeholder:font-light placeholder:text-[30px] placeholder:text-[#524E4E] text-[30px] font-Nunito text-[#524E4E]"
            />
            <br />
            <button className="mt-[20px] p-3 bg-white text-black font-Nunito rounded-2xl font-bold text-[20px]">
              Search
            </button>
            <Toaster />
          </form>
        </div>

        {/* error part */}
        {error && (
          <h2 className="text-red-500 font-Nunito text-[20px] mb-4">{error}</h2>
        )}
        {/* error part */}

        {/* show part */}
        {datas && datas.name && (
          <div className="lg:w-[917px] py-[50px] px-[30px] bg-gradient-to-br from-[#AD36CB] via-[#a561b5] to-[#333333] rounded-3xl p-6 shadow-2xl m-[30px]">
            <div className="flex items-center gap-5">
              <h1 className="font-Nunito text-[30px]">{datas.name}</h1>
              <FaLocationDot className="text-[30px]" />
            </div>
            <div className="flex items-center justify-center min-h-[200px]">
              <BsThermometerHigh className="text-[70px]" />
              <h2 className="text-[70px]">
                {Math.round(datas.main.temp)}
                <span className="align-super text-[20px]">O</span> C
              </h2>
            </div>
            <div className="">
              <p className="font-medium font-Nunito text-[20px] text-center md:text-left">
                {new Date().toDateString()}
              </p>
            </div>
            <div className="flex flex-wrap flex-col md:flex-row justify-between font-Nunito font-medium text-[20px] mt-[30px] text-center gap-y-[30px] gap-x-[40px]">
              <div className="">
                <p>Humidity</p>
                <p>{`${datas.main.humidity}%`}</p>
              </div>
              <div className="">
                <p>Visiblity</p>
                <p>{`${datas.visibility / 1000} km`}</p>
              </div>
              <div className="">
                <p>Air Pressure</p>
                <p>{`${datas.main.pressure} hPa`}</p>
              </div>
              <div className="">
                <p>Wind</p>
                <p>{`${datas.wind.speed} mph`}</p>
              </div>
            </div>
          </div>
        )}
        {/* show part */}
      </div>
    </>
  );
}

export default App;
