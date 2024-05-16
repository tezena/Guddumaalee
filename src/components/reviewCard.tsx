import ReactStars from 'react-rating-stars-component';
interface ReviewSectionCardProps {
    clientName: string;
    rating: number;
    comment: string;
  }
  
  const ReviewSectionCard: React.FC<ReviewSectionCardProps> = ({ clientName, rating, comment }) => {
    return (
      
    <>
       
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <p className="font-semibold text-black">{clientName}</p>
          <ReactStars count={5} value={rating} edit={false} size={18} activeColor="#ffd700" />
          <p className="mt-2 text-black">{comment}</p>
        </div>
        </>
    );
  };
  
//   export default ReviewSectionCard;
// import ReactStars from 'react-rating-stars-component';

// interface ReviewSectionCardProps {
   
//     clientName: string;
//     rating: number;
//     comment: string;

// }

// const ReviewSectionCard: React.FC<ReviewSectionCardProps> = ({ cli }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 mt-8">
//       <h2 className="text-xl font-semibold mb-4 text-black">Client Comments and Reviews</h2>
//       {reviews.map((review, index) => (
//         <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
//           <p className="font-semibold text-black">{review.clientName}</p>
//           <ReactStars count={5} value={review.rating} edit={false} size={18} activeColor="#ffd700" />
//           <p className="mt-2 text-black">{review.comment}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

export default ReviewSectionCard;

  