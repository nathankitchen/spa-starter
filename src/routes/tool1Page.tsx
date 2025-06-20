import { useState, type PropsWithChildren } from "react";
import Component from "../components/component";
import ExtensionPoint from "../components/ExtensionPoint";
import { useExtensionRegistry } from "../components/ExtensionRegistry";

interface Tool1Props { 
    num: number;

}

export default function Tool1(props: PropsWithChildren<Tool1Props>) {

    const registry = useExtensionRegistry();
    const [dm, setDm] = useState(registry.isDevMode ?? false);

    return (
        <div className={`tool tool-${props.num}`}>
            <ExtensionPoint name="tool1_top" description="Inject static content above all other content" />
            <h1>Tool 1</h1>
            <ExtensionPoint name="tool1_upper" description="Inject static content below the title, before main tool component" />
            <Component message="Hello from Tool 1" />
            {props.children}
            <ExtensionPoint name="tool1_warning" description="Replace the standard warning">
                <strong>
                    WARNING: THIS TOOL IS SO GOOD YOU MIGHT FALL OVER.
                </strong>
            </ExtensionPoint>
            <ExtensionPoint name="tool1_lower" description="Inject static content after the main tool." link="https://www.google.com/"/>
            <input
                name="toggleDevMode"
                type="checkbox"
                checked={ dm }
                onChange={(e) => { registry.isDevMode = e.target.checked; setDm(registry.isDevMode); } }
            />
            <label htmlFor="toggleDevMode">Show extension points</label>
        </div>
    );
}