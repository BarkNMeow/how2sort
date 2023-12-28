export default function Panel() {
    return (
        <div className="panel">
            <div className="header">
                <span className="title">How2Sort</span><br />
                <span className="desc">the ultimate sorting guide</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>Bubble Sort</option>
                    </select>
                    <button>Add</button>
                </div>
            </div>
        </div>
    )
}