"use client"

import { Button } from "@/components/ui/button"

interface OrganizationalCategoriesProps {
  title: string
}

const categories = [
  {
    id: "national",
    name: "National Government (Ministries, Departments and Agencies)",
    description:
      "They are responsible for aligning projects with national development goals, mobilizing resources, ensuring legal and procedural compliance, and coordinating with relevant stakeholders.",
  },
  {
    id: "county",
    name: "County Government",
    description:
      "Responsible for implementing devolved functions and delivering services at the local level. They play a key role in identifying community needs, planning and executing development projects, managing local resources, and ensuring public participation.",
  },
  {
    id: "private",
    name: "Private (Individual and Company)",
    description:
      "Responsible for stimulating economic growth, creating employment, and delivering goods and services, while ensuring compliance with regulatory frameworks and contributing to sustainable development goals.",
  },
  {
    id: "civil",
    name: "Civil Society",
    description:
      "Serve as a bridge between government and citizens, helping to articulate grassroots needs, monitor service delivery, and implement programs that address social, environmental, and economic issues.",
  },
]

export default function OrganizationalCategories({ title }: OrganizationalCategoriesProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-[#008037] mb-4">{title}</h2>

      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white border border-[#e8e8e8] rounded-lg p-4 flex flex-col">
            <h3 className="text-sm font-medium text-[#373737] mb-2">{category.name}</h3>
            <p className="text-xs text-[#828282] flex-1 mb-4">{category.description}</p>
            <Button className="bg-[#008037] hover:bg-[#006b2d] text-white text-xs w-24 h-8 rounded-md">Select</Button>
          </div>
        ))}
      </div>
    </section>
  )
}
