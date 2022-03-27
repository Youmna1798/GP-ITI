import React, { useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <>
            <Button
              type="Button"
              key={index}
              style={{
                background: index <= (hover || rating) ? "gold" : "#ccc",
              }}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </Button>
          </>
        );
      })}
    </div>
  );
};

export default StarRating;
