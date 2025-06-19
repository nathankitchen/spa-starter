import type { PropsWithChildren } from "react";
import Component from "../components/component";
import ExtensionPoint from "../components/ExtensionPoint";

interface Tool1Props { 
    num: number;
    
}

export default function Tool1(props: PropsWithChildren<Tool1Props>) {

    return (
        <div className={`tool tool-${props.num}`}>
            <p>Tool 1</p>
            <Component message="Hello from Tool 1" />
            {props.children}
            <ExtensionPoint name="nrk" />
            <ExtensionPoint name="jrk" />
        </div>
    );
}