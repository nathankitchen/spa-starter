import React, { type PropsWithChildren } from "react";
import { useExtensionRegistry } from "./ExtensionRegistry";
import validateExtensionName from "./validateExtensionName";

import './ExtensionPoint.css';

/**
 * Props for the `ExtensionPoint` component.
 *
 * @property name - The unique name identifying the extension point. Must be camelCase.
 *           Typically unique across front-end pages, though it is possible to have two
 *           ExtensionPoints with the same name which will render the same content.
 * @property description - (Optional) A brief description of the extension point, typically
 *           explaining its placement or any non-obvious behaviours, e.g. "only shown in 
 *           circumstance A".
 * @property devMode - (Optional) Indicates if the extension point is running in development
 *           mode. If so, renders a plain div which can be styled to show the name and 
 *           potential placement of any content rendered by the extension point.
 * @property [key: string] - Any additional props that can be passed to the extension point.
 */
interface ExtensionPointProps { 
  name: string;
  description?: string;
  devMode?: boolean;
  [key: string]: any;
}

enum ExtensionPointType {
  None,
  FuncString,
  FuncHTMLDom,
  ReactElement,
  ReactComponent
}

export default function ExtensionPoint(props: PropsWithChildren<ExtensionPointProps>) {

  if (!validateExtensionName(props.name)) { throw new Error(`Extension name ${props.name} is not valid.`); }

  const registry = useExtensionRegistry();
  const Extension = registry.getExtension(props.name);
  
  const devMode = props.devMode || registry.isDevMode;

  var Content: any = null;
  var extensionPointType = ExtensionPointType.None;
  
  if (Extension instanceof Function) {
      var funcExt = Extension as (props: any) => any;

      Content = funcExt(props);

    if (typeof Content === "string") {
      extensionPointType = ExtensionPointType.FuncString;
    }
    else if (Content instanceof HTMLElement) {
      extensionPointType = ExtensionPointType.FuncHTMLDom;
    }
    else if (React.isValidElement(Content)) {
      extensionPointType = ExtensionPointType.ReactElement;
    }
    else {
      extensionPointType = ExtensionPointType.ReactComponent;
    }
  }
  
  return (
    <>
      {/* In Dev Mode, we render a div with an h6 to show the name of the extension point and */}
      {/* a description in a p-tag underneath. */}
      {devMode &&
        <div id={`extensionPoint-${props.name}`} className="extensionPoint extensionPointDevMode">
          {props.name && <h6><code>{ props.name }</code></h6>}
          {props.description && <p>{props.description}</p>}
          {props.children && props.children }
        </div>
      }

      {!devMode && extensionPointType == ExtensionPointType.FuncString && 
        <div id={ `extensionPoint-${props.name}` } dangerouslySetInnerHTML={{ __html: Content }}></div>
      }

      {!devMode && extensionPointType == ExtensionPointType.FuncHTMLDom && 
        <div id={ `extensionPoint-${props.name}` } ref={ref => { if (ref) ref.replaceChildren(Content); }}></div>
      }

      {!devMode && extensionPointType == ExtensionPointType.ReactElement && 
        React.cloneElement(Content, props, props.children)
      }

      {!devMode && extensionPointType == ExtensionPointType.ReactComponent && 
        (<Content {...props} />) 
      }

      {!devMode && extensionPointType == ExtensionPointType.None && props.children }
    </>
  );
}