import { useState } from "react";
import ExtensionPoint from "../components/ExtensionPoint";

interface Tool2Props { 
    num: number;
}

export default function Tool2(props: Tool2Props) {

    const [count, setCount] = useState(0);

    return (
        <div className={`hc-hero-viewport hc-view-${props.num}`}>
            <p>Tool 2</p>
            <button className='px-4 py-1 text-gray-600 border-gray-300 bg-gray-200 w-16 cursor-pointer border-1 rounded-sm' onClick={() => setCount(count + 1)}>{count}</button>
            {count > 10 && <p>More than ten!</p>}
            <ExtensionPoint name="zjk" content="Hey world..."/>
        </div>
    );
}