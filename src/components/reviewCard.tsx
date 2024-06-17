import { FaStar } from "react-icons/fa";

interface ReviewSectionCardProps {
  clientName: string;
  rating: number;
  comment: string;
}

const ReviewSectionCard: React.FC<ReviewSectionCardProps> = ({ clientName, rating, comment }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i < rating ? "#ffd700" : "#e4e5e9"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <p className="font-semibold text-black">{clientName}</p>
      <div className="flex items-center mt-2">
        {renderStars(rating)}
      </div>
      <p className="mt-2 text-black">{comment}</p>
    </div>
  );
};

export default ReviewSectionCard;









// import ReactStars from 'react-rating-stars-component';

// interface ReviewSectionCardProps {
//     clientName: string;
//     rating: number;
//     comment: string;
//   }
  
//   const ReviewSectionCard: React.FC<ReviewSectionCardProps> = ({ clientName, rating, comment }) => {
//     return (
      
//     <>
       
//         <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//           <p className="font-semibold text-black">{clientName}</p>
//           <ReactStars count={5} value={rating} edit={false} size={18} activeColor="#ffd700" />
//           <p className="mt-2 text-black">{comment}</p>
//         </div>
//         </>
//     );
//   };
  


// export default ReviewSectionCard;

  