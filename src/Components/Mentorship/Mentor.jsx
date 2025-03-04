import { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimePicker = ({ selectedDate, onDateChange, onTimeChange, onClose }) => {
  const [isHourView, setIsHourView] = useState(true);
  const [selectedHour, setSelectedHour] = useState(7);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [period, setPeriod] = useState("AM");
  const [showClock, setShowClock] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  const handleTimeClick = (value) => {
    if (isHourView) {
      setSelectedHour(value);
      setIsHourView(false);
    } else {
      setSelectedMinute(value);
      onTimeChange(
        `${formatNumber(selectedHour)}:${formatNumber(value)} ${period}`
      );
    }
  };

  const handleDateSelect = (date) => {
    onDateChange(date);
    setShowClock(true);
  };

  return (
    <div className="bg-white p-4 rounded-lg w-[320px] shadow-lg">
      <div className="grid gap-4">
        {!showClock ? (
          // Date Picker
          <DatePicker
            selected={selectedDate}
            onChange={handleDateSelect}
            inline
            className="mx-auto"
          />
        ) : (
          <>
            {/* Digital Display */}
            <div className="flex items-center justify-center gap-2 text-4xl font-light">
              <button
                onClick={() => setIsHourView(true)}
                className={`p-2 rounded ${
                  isHourView ? "bg-[#0a66c2] text-white" : ""
                }`}
              >
                {formatNumber(selectedHour)}
              </button>
              <span>:</span>
              <button
                onClick={() => setIsHourView(false)}
                className={`p-2 rounded ${
                  !isHourView ? "bg-[#0a66c2] text-white" : ""
                }`}
              >
                {formatNumber(selectedMinute)}
              </button>
              <div className="flex flex-col gap-1 ml-2 text-sm">
                <button
                  onClick={() => setPeriod("AM")}
                  className={`px-2 py-1 rounded ${
                    period === "AM" ? "bg-[#0a66c2] text-white" : "bg-gray-100"
                  }`}
                >
                  AM
                </button>
                <button
                  onClick={() => setPeriod("PM")}
                  className={`px-2 py-1 rounded ${
                    period === "PM" ? "bg-[#0a66c2] text-white" : "bg-gray-100"
                  }`}
                >
                  PM
                </button>
              </div>
            </div>

            {/* Clock Face */}
            <div className="relative w-64 h-64 mx-auto bg-gray-100 rounded-full border-3 border-[#0a66c2]">
              {/* Clock Numbers */}
              {(isHourView ? hours : minutes).map((number, index) => {
                const angle = (index * 30 - 90) * (Math.PI / 180);
                const radius = 100;
                const x = radius * Math.cos(angle) + 128;
                const y = radius * Math.sin(angle) + 128;

                const isSelected = isHourView
                  ? number === selectedHour
                  : number === selectedMinute;

                return (
                  <button
                    key={number}
                    onClick={() => handleTimeClick(number)}
                    className={`absolute w-10 h-10 -mt-5 -ml-5 rounded-full flex items-center justify-center ${
                      isSelected
                        ? "bg-[#0a66c2] text-white"
                        : "hover:bg-gray-200"
                    }`}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                    }}
                  >
                    {formatNumber(number)}
                  </button>
                );
              })}

              {/* Clock Hand */}
              <div
                className="absolute w-1 bg-[#0a66c2] origin-bottom rounded-full left-1/2 -translate-x-1/2"
                style={{
                  height: "40%",
                  top: "10%",
                  transform: `rotate(${
                    (isHourView
                      ? (selectedHour % 12) * 30
                      : selectedMinute * 6) - 90
                  }deg)`,
                }}
              />
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#0a66c2] hover:bg-gray-100 rounded"
          >
            CANCEL
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white rounded"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default function BookPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[url('/src/Components/Mentorship/background.webp')] bg-cover bg-center relative">
      {/* Header Section */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        Get Personalized <span className="text-[#0a66c2]">1:1</span> Mentorship From Industry Experts!
        </h1>

        <p className="text-black text-base md:text-xl mt-4">
          Connect with experienced mentors who will guide you through your
          career.
        </p>
      </motion.div>

      {/* Form Section */}
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-gray-700 font-medium mb-4">
          Tell us about your concerns
        </p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Input for Problems or Concerns */}
          <div>
            <label
              htmlFor="concerns"
              className="block text-sm font-medium text-gray-700"
            >
              Mentorship Needs
            </label>
            <input
              id="concerns"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2]"
              placeholder="Describe your concerns..."
            />
          </div>

          {/* Date and Time Picker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 text-center">
              Choose specific slot
            </label>
            <div className="mt-2 flex justify-center items-center">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-[#0a66c2] text-white rounded hover:bg-[#0a66c2]/90 transition"
              >
                {selectedDate.toDateString()} {selectedTime || "Select Time"}
              </button>
            </div>
          </motion.div>

          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <TimePicker
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                onTimeChange={handleTimeChange}
                onClose={() => setIsOpen(false)}
              />
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white font-medium py-2 rounded-md transition shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BOOK A SESSION
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
