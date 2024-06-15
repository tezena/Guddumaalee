import LawyersCard from "@/components/lawyersCard";
import { data } from "@/app/data/lawyersMockData";
import { useQuery } from "@tanstack/react-query";
import { getVerifiedLawyers } from "@/app/admin/api/lawyers";


interface Props { 
  selectedSpecialization: string;
  selectedCourt:string;
  selectedLanguage: string;
}
const LawyersList: React.FC<Props> = ({ selectedSpecialization,selectedCourt,selectedLanguage }) => {
  const {data,isLoading,error} = useQuery({
    queryKey:['lawyers'],
    queryFn:()=>getVerifiedLawyers()
  })
  const filteredLawyers = data?.filter((lawyer:any) => {
    return (
    
      

      (!selectedLanguage ||   lawyer.languages.includes(selectedLanguage)) &&
      (!selectedSpecialization || lawyer.specialties.includes(selectedSpecialization)) &&
      (!selectedCourt || lawyer.courts.includes(selectedCourt))
    );
  });

  

  //   const { isPending, error, data } = useQuery({
  //     queryKey: ['repoData'],
  //     queryFn: () =>
  //       fetch('http://localhost:3000/api/lawyers/verified').then((res) =>
  //         res.json(),
  //       ),
  //   })

  //   console.log(data)
  
  //   if (isPending) return 'Loading...'
  
  //   if (error) return 'An error has occurred: ' + error.message
  

  return (
    <div className="container px-5 py-5 mx-auto mt-4">
      <div className="flex flex-wrap -m-4 text-center mx-auto justify-center">
        {filteredLawyers?.length > 0 ? (
          filteredLawyers?.map((item:any, index:any) => {
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
