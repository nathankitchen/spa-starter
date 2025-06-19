import React, { createContext, useContext } from "react";

type RenderableType = React.ElementType | React.ComponentType | ((props: any) => HTMLElement);

interface IExtensionRegistry { 
    getExtension(name: string): RenderableType;
}

class WindowExtensionRegistry implements IExtensionRegistry {

    getExtension(name: string): RenderableType { 
        return (window as any)["hooks"]["extensions"][name];
    };
};

const extensionRegistry = new WindowExtensionRegistry();
const ExtensionContext = createContext(extensionRegistry);

export function useExtensionRegistry() : IExtensionRegistry {
    return useContext(ExtensionContext);
}

export const ExtensionProvider : React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ExtensionContext.Provider value={extensionRegistry}>
            {children}
        </ExtensionContext.Provider>
    );
};
