import { useState } from "react";
import Header from "./Header";
import { SortType } from "./type";

export default function App() {
    const [sortType, setSortType] = useState<SortType[]>([])

    function addSort(type: SortType) {
        const newState = [...sortType]
        newState.push(type)
        setSortType(newState)
    }

    return (
        <>
            <Header sortType={sortType} addSort={addSort} />
            {/* <SortAnimation /> */}
        </>
    )
}