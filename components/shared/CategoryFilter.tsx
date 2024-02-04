"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
  

export default function CatagoryFilter(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const getCategories = async () => {
          const categoriesList = await getAllCategories();
    
          categoriesList && setCategories(categoriesList as ICategory[])
        }
    
        getCategories()
      },[])

    const onSelectCategory = (category: string) => {
        let newUrl = ''
        if(category && category !== 'All'){
                newUrl = formUrlQuery ({
                params: searchParams.toString(),
                key: 'category',
                value: category
            })
        }
        else{
                newUrl = removeKeysFromQuery ({
                params: searchParams.toString(),
                keysToRemove: ['category']
            })
        }
        router.push(newUrl, {scroll: false})

    }

    return(
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className="select-item p-regular-16">All</SelectItem>
                {categories.map((category) => (
                    <SelectItem value={category.name} key={category._id} className="select-item p-regular-16">{category.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>

    )
}