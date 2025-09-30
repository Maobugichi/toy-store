import hood from "@/assets/hood-tee.jpg"
import testsrc from "@/assets/toy-hero2.jpg"
import Category from "./category"

const CategorySection = ({ data }: any) => {
    
  const categoryItem = [
    {
      gender: "Hat",
      src: testsrc,
      data: data,
    },
    {
      gender: "Tees",
      src: hood,
      data: data,
    },
  ]

  return (
    <section className="w-full h-[110vh] py-10">
      <div className="h-full w-[90%] mx-auto space-y-10">
        <h2 className="text-3xl font-family-heading font-semibold md:text-4xl">
          Collections
        </h2>
        <div className="flex flex-col md:flex-row w-full h-full gap-5">
          {categoryItem.map((item, idx) => (
            <Category
              key={idx}
              gender={item.gender}
              src={item.src}
              collection={item.data}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
