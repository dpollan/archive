import React from 'react';

function Ratings(props) {
  const { success, satisfaction, grasp } = props;

  // Helper function to generate appropriate number of star rating
  const renderStars = (rating) => {
    //if it is an odd rating, subtract one and draw that number of whole stars

    if (rating % 2 !== 0) {
      var fullStars = rating - 1;
      var halfStar = true;
    } else {
      var fullStars = rating - 0;
      var halfStar = false;
    }
    const starArray = Array.apply(null, Array(fullStars / 2));

    return (
      <>
        {starArray.map((star) => (
          <i class="fa fa-star"></i>
        ))}
        {halfStar ? <i class="fa fa-star-half"></i> : null}
      </>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 p-light text-center">
          success:<div>{renderStars(success)}</div>
        </div>
        <div className="col-4 p-lighten text-center">
          satisfaction:<div>{renderStars(satisfaction)}</div>
        </div>
        <div className="col-4 p-darken text-center">
          grasp:<div>{renderStars(grasp)}</div>
        </div>
      </div>
    </div>
  );
}

export default Ratings;
