import { useEffect } from "react"

const FilterCategories = ({ category, ischecked, tickToggle }: any) => {

    // useEffect(() => {
    //     console.log(category, "checked", ischecked)
    // }, [ischecked])

    let categoryLabel = category
    return (
        <div className="flex items-center">
            <input className="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" type="checkbox" id={category} name={categoryLabel} checked={ischecked || false} onChange={() => tickToggle(category)} />
            <label className="ml-2 text-md text-gray-200" htmlFor={categoryLabel}>{categoryLabel}</label>
      </div>
    )
}

export default FilterCategories