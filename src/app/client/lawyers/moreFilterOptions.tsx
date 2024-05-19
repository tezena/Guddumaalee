import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    
  } from "@/components/ui/sheet"
  import { Label } from "@/components/ui/label"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
  
  
  interface props{
      
    setSelectedCourt:(court:string)=>void,
    setSelectedSpecialization:(specialization: string)=>void,
    setSelectedLanguage:(language: string)=>void,
    selectedSpecialization:string,

  }

  
  const specilization = [
    {id:1,text:"All",type:""},
    { id: 2, text: "Family", type: "family" },
    { id: 3, text: "Personal Injury", type: "personal" },
    { id: 3, text: "Adoption", type: "adoption" },
    { id: 3, text: "Banking", type: "banking" },
    { id: 3, text: "Assult", type: "assult" },
    { id: 3, text: "Housing", type: "housing" },
    { id: 10, text: "Criminal", type: "criminal" },
   
  ];

  const languages=[
    { "id": 0, "label": "All", "value": "" },
    { "id": 1, "label": "Amharic", "value": "amharic" },
    { "id": 2, "label": "Oromo", "value": "oromo" },
    { "id": 3, "label": "Tigrinya", "value": "tigrinya" },
    { "id": 4, "label": "Somali", "value": "somali" },
    { "id": 5, "label": "Sidamo", "value": "sidamo" },
    { "id": 6, "label": "Gurage", "value": "gurage" },
    { "id": 7, "label": "Afar", "value": "afar" },
    { "id": 8, "label": "Gamo", "value": "gamo" },
    { "id": 9, "label": "Hadiyya", "value": "hadiyya" },
    { "id": 10, "label": "Konso", "value": "konso" }
  ]

  const courts=[
    { "id": 0, "label": "All", "value": "" },
    { "id": 1, "label": "Supreme Court", "value": "supreme_court" },
    { "id": 2, "label": "Appellate Court", "value": "appellate_court" },
    { "id": 3, "label": "High Court", "value": "high_court" },
    { "id": 4, "label": "District Court", "value": "district_court" },
    { "id": 9, "label": "Small Claims Court", "value": "small_claims_court" },
    { "id": 10, "label": "Administrative Court", "value": "administrative_court" }
  ]
  
  

const FilteringOptions:React.FC<props>=({setSelectedCourt,setSelectedLanguage,setSelectedSpecialization,selectedSpecialization})=>{
    
    return(
        <>
        <Sheet>
  <SheetTrigger>More</SheetTrigger>
  <SheetContent side={"left"} className="flex flex-col">
    <SheetHeader>
      <SheetTitle>Filter lawyers with many options</SheetTitle>
      <SheetDescription>
        Here you can filter lawyers by their specilization domain, languages and also court levels.
      </SheetDescription>
    </SheetHeader>
    <div className="grid grid-cols-1 gap-2 py-4">
        <div>
        <h1 className="text-lg font-bold text-gray-800 ">Specialization</h1>
    <RadioGroup  defaultValue={selectedSpecialization} className='grid grid-cols-2 gap-4 py-4' >
        {
            
          specilization.map((item,index)=>{
            return(
                <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem value={item.type} id={index} onClick={()=>setSelectedSpecialization(item.type)} />
                <Label htmlFor="r1">{item.text}</Label>
              </div>)
            })
        }
      </RadioGroup>
      </div>
      <div>
        <h1 className="text-lg font-bold text-gray-800 ">Languages</h1>
    <RadioGroup className='grid grid-cols-3 gap-2 py-4' >
        {
            
          languages.map((item,index)=>{
            return(
                <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem value={item.value} id={index} onClick={()=>setSelectedLanguage(item.value)} />
                <Label htmlFor="r1">{item.label}</Label>
              </div>)
            })
        }
      </RadioGroup>
      </div>
    </div>
    <div>
        <h1 className="text-lg font-bold text-gray-800 ">Courts</h1>
    <RadioGroup className='grid grid-cols-2 gap-2 py-4' >
        {
            
          courts.map((item,index)=>{
            return(
                <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem value={item.value} id={index} onClick={()=>setSelectedCourt(item.value)} chacked={item.value} />
                <Label htmlFor="r1">{item.label}</Label>
              </div>)
            })
        }
      </RadioGroup>
      </div>
    

  </SheetContent>
</Sheet>

        </>
    )
}


export default FilteringOptions