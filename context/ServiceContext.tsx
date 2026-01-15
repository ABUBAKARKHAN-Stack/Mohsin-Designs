"use client";
import { ServiceData, ServiceLightWeight } from "@/types/services.types";
import { createContext, useContext } from "react";

type ServicesContextType = {
    services: ServiceData[];
    lightWeightServices: ServiceLightWeight[];
};

const ServicesContext = createContext<ServicesContextType | null>(null);

export const ServicesProvider = ({
    children,
    services,
    lightWeightServices

}: {
    children: React.ReactNode;
    services: ServiceData[];
    lightWeightServices: ServiceLightWeight[];


}) => {
    return (
        <ServicesContext.Provider value={{ services, lightWeightServices }}>
            {children}
        </ServicesContext.Provider>
    );
};

export const useServices = () => {
    const ctx = useContext(ServicesContext);
    if (!ctx) throw new Error("useServices must be inside ServicesProvider");
    return ctx;
};
