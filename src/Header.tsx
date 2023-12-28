import { useEffect, useState } from "react"
import { Setter, SortType } from "./type"

import './assets/header.sass'

interface HeaderProp {
    sortType: SortType[]
    addSort: Setter<SortType>
}

interface AddSortProp extends HeaderProp {
    closePanel: () => void
}

enum PanelType {
    None,
    AddSort,
    Stat,
    Config,
}

export default function Header({ sortType, addSort }: HeaderProp) {
    const btnTemplate = [
        { type: PanelType.AddSort, icon: 'plus-lg' },
        { type: PanelType.Stat, icon: 'bar-chart-fill' },
        { type: PanelType.Config, icon: 'gear-fill' },
    ]

    const [activePanel, setActivePanel] = useState<PanelType>(PanelType.None)

    function onPanelBtnClick(ptype: PanelType) {
        setActivePanel(activePanel === ptype ? PanelType.None : ptype)
    }

    function closePanel() {
        setActivePanel(PanelType.None)
    }

    return (
        <header>
            <div className="header">
                <span className="title">How2Sort</span><br />
                <span className="desc">the ultimate sorting guide</span>
            </div>
            <div id="icon-btn-container">
                {
                    btnTemplate.map(({ type, icon }, i) =>
                        <button key={i} className={`icon-btn ${activePanel === type ? "active" : ""}`} onClick={() => onPanelBtnClick(type)}>
                            <i className={`bi bi-${icon}`}></i>
                        </button>
                    )
                }
                {activePanel === PanelType.AddSort && <AddSort sortType={sortType} addSort={addSort} closePanel={closePanel} />}
            </div>

        </header>
    )
}

function AddSort({ sortType, addSort, closePanel }: AddSortProp) {
    useEffect(() => {
        const checkClickOutside = (e: MouseEvent) => {
            let target = e.target as (HTMLElement | null)
            while (target !== null) {
                if (target.id === 'icon-btn-container') return

                target = target.parentElement
            }

            closePanel()
        }

        window.addEventListener('click', checkClickOutside)

        return () => { window.removeEventListener('click', checkClickOutside) }
    })

    function onSortBtnClick(stype: SortType) {
        addSort(stype)
        closePanel()
    }

    return (
        <div className="panel">
            <div className="sort-btn-container">
                <div className="sort-btn" onClick={() => onSortBtnClick(SortType.Bubble)}>
                    <i className="bi bi-0-circle-fill"></i>
                    <span>Bubble Sort</span>
                </div>
                <div className="sort-btn"></div>
                <div className="sort-btn"></div>
                <div className="sort-btn"></div>
                <div className="sort-btn"></div>
                <div className="sort-btn"></div>

            </div>
        </div>
    )
}