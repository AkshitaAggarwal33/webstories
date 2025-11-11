import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function StoryViewer({ story, onClose }) {
  const slides = story?.slides || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const SLIDE_DURATION = 5000; // 5 seconds per slide

  // Starts timeline animation and auto-next logic
  const startTimer = () => {
    clearInterval(timerRef.current);
    setProgress(0);
    const start = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = (elapsed / SLIDE_DURATION) * 100;

      if (percent >= 100) {
        clearInterval(timerRef.current);
        handleNext();
      } else {
        setProgress(percent);
      }
    }, 50);
  };

  // Next slide
  const handleNext = () => {
    clearInterval(timerRef.current);
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose(); // close viewer after last slide
    }
  };

  // Previous slide
  const handlePrev = () => {
    clearInterval(timerRef.current);
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      setProgress(0);
    }
  };

  // Restart timer on every slide change
  useEffect(() => {
    if (slides.length > 0) {
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [currentSlide]);

  if (!slides.length) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center">
      {/* ❌ Close Button */}
      <button
        onClick={() => {
          clearInterval(timerRef.current);
          onClose();
        }}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X size={28} />
      </button>

      {/* Progress Bars */}
      <div className="absolute top-2 left-0 right-0 flex gap-1 px-4">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-1 rounded bg-gray-700 overflow-hidden"
          >
            <motion.div
              animate={{
                width:
                  idx < currentSlide
                    ? "100%"
                    : idx === currentSlide
                    ? `${progress}%`
                    : "0%",
              }}
              transition={{ duration: 0.05 }}
              className="h-full bg-white"
            />
          </div>
        ))}
      </div>

      {/* Story Viewer */}
      <div
        className="relative w-full max-w-md h-[80vh] flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {slides[currentSlide]?.type === "image" ? (
              <img
                src={slides[currentSlide].url}
                alt=""
                className="w-full h-full object-contain rounded-lg select-none"
                onClick={handleNext} // 👈 instant next on click
              />
            ) : (
              <video
                src={slides[currentSlide].url}
                className="w-full h-full rounded-lg select-none"
                controls
                autoPlay
                onEnded={handleNext}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Left + Right Invisible Zones for manual navigation */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-0 top-0 h-full w-1/3"
        ></div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-0 top-0 h-full w-2/3"
        ></div>
      </div>
    </div>
  );
}
