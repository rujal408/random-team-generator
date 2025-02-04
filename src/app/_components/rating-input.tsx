import React from "react";

const RatingInput: React.FC<{
  value: number;
  onChange: (value: number) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          className={`w-8 h-8 flex items-center justify-center border text-black hover:bg-yellow-400 ${
            rating <= value
              ? "bg-yellow-400 border-yellow-500"
              : "bg-gray-200 border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
          onClick={() => onChange(rating)}
        >
          {rating}
        </button>
      ))}
    </div>
  );
};

export default RatingInput;
