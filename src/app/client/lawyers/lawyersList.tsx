import LawyersCard from "@/components/lawyersCard";
import { data } from "@/app/data/lawyersMockData";

interface Props { 
  selectedSpecialization: string;
  selectedCourt:string;
  selectedLanguage: string;
}
const LawyersList: React.FC<Props> = ({ selectedSpecialization,selectedCourt,selectedLanguage }) => {
  const filteredLawyers = data.filter((lawyer) => {
    return (
      (!selectedLanguage || lawyer.language === selectedLanguage) &&
      (!selectedSpecialization || lawyer.specialization === selectedSpecialization) &&
      (!selectedCourt || lawyer.court === selectedCourt)
    );
  });

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
              No lawyers on {selectedSpecialization} yet.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyersList;
