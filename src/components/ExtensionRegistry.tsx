import React, { createContext, useContext, useState, type PropsWithChildren } from "react";

type RenderableType = React.ElementType | React.ComponentType | ((props: any) => HTMLElement);

interface IExtensionRegistry { 
    getExtension(name: string): RenderableType;
    get isDevMode(): boolean;
    set isDevMode(value: boolean);
}

class WindowExtensionRegistry implements IExtensionRegistry {

    getExtension(name: string): RenderableType { 
        return (window as any)["hooks"]["extensions"][name];
    };

    get isDevMode(): boolean {
        return ((window as any)["hooks"]["extensionDevMode"]) ?? false;
    }
    
    set isDevMode(value: boolean) {
        (window as any)["hooks"]["extensionDevMode"] = value;
    }
};

const extensionRegistry = new WindowExtensionRegistry();
const ExtensionContext = createContext(extensionRegistry);

export function useExtensionRegistry() : IExtensionRegistry {
    return useContext(ExtensionContext);
}

export function ExtensionProvider(props: PropsWithChildren) {
    return (
        <ExtensionContext.Provider value={extensionRegistry}>
            {props.children}
        </ExtensionContext.Provider>
    );
}