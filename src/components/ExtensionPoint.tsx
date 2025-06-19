import React, { useRef, type PropsWithChildren } from "react";
import { useExtensionRegistry } from "./ExtensionRegistry";

interface ExtensionPointProps { 
  name: string;
  [key: string]: any;
}

export default function ExtensionPoint(props: PropsWithChildren<ExtensionPointProps>) {

  const registry = useExtensionRegistry();

  const Extension = registry.getExtension(props.name);

  if (Extension instanceof Function) {

    var funcExt = Extension as (props: any) => any;

    var Content = funcExt(props);

    if (typeof Content === "string") {
      return (<div dangerouslySetInnerHTML={{ __html: Content }}></div>);
    }
    else if (Content instanceof HTMLElement) {
      return (<div ref={ref => { if (ref) ref.replaceChildren(Content); }}></div>);
    }
    else if (React.isValidElement(Content)) {
      return React.cloneElement(Content, props, props.children); // ? 
    }
    else { 
      return (<Content {...props} />) 
    }
  }
  else {
    if (typeof props.children === "function") {
      console.log("props with children");
      return (<Extension>{props.children}</Extension>);
    }
    else if (typeof Extension === "undefined") {
      console.log("extension undefined");
      if (React.isValidElement(props.children)) {
        return React.cloneElement(props.children, props)
      } else {
        return props.children;
      }
    }
    else if (!Extension) {
      console.log("extension is not");
      return null;
    }
    console.log("otherwise...");
    return ( <Extension {...props} /> );
  }
}