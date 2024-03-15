import LawyersCard from "@/components/lawyersCard";
import { data } from "@/app/data/lawyersMockData";

interface Props {
  selectedType: string;
}
const LawyersList: React.FC<Props> = ({ selectedType }) => {
  const filteredLawyers = selectedType
    ? data.filter((lawyer) => lawyer.type == selectedType)
    : data;

  return (
    <div className="container px-5 py-5 mx-auto mt-4">
      <div className="flex flex-wrap -m-4 text-center mx-auto justify-center">
        {filteredLawyers.length > 0 ? (
          filteredLawyers.map((item, index) => {
            return (
              <LawyersCard
                key={index}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                des={item.des}
                rate={item.rate}
              />
            );
          })
        ) : (
          <div className="mx-auto  items-center">
            <h1 className="text-2xl text-black">
              No lawyers on {selectedType} yet.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyersList;
