import { useRef, useState } from "react";
import Header from "./Header";
import { SortType } from "./type";
import Sort from "./Sort";

export default function App() {
    const [sortType, setSortType] = useState<SortType[][]>([])
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const ref = useRef<HTMLDivElement>(null)

    function addSort(type: SortType) {
        let length = 1
        for (const innerArr of sortType) {
            for (const elem of innerArr) length += (elem != SortType.None) ? 1 : 0
        }

        let colCnt = 0
        while (colCnt * colCnt < length) colCnt++

        const newSortType = [] as SortType[][]
        let inserted = false

        for (let i = 0; i < sortType.length; i++) {
            newSortType.push([...sortType[i]])
            while (newSortType[i].length < colCnt) {
                newSortType[i].push(SortType.None)
            }

            const lastIdx = newSortType[i].findIndex(v => (v === SortType.None))
            if (!inserted && lastIdx !== -1) {
                newSortType[i][lastIdx] = type
                inserted = true
            }
        }

        if (!inserted) {
            const newRow = Array(colCnt).fill(SortType.None)
            newRow[0] = type
            newSortType.push(newRow)
        }

        if (ref?.current) {
            setWidth(ref.current.clientWidth / colCnt)
            setHeight(ref.current.clientHeight / newSortType.length)
        }

        setSortType(newSortType)
    }

    return (
        <>
            <Header sortType={sortType} addSort={addSort} />
            <div className="sort-container" ref={ref}>
                {
                    sortType.map((row, ri) =>
                        <div key={ri} className="sort-row">
                            {row.map((v, i) =>
                                <Sort key={i} type={v} width={width} height={height} />
                            )}
                        </div>

                    )
                }
            </div>
            {/* <SortAnimation /> */}
        </>
    )
}