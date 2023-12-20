import Header from "@/components/Header";
import React from "react";
import { LayoutProps } from "./types/layoutProps";
import Navigation from "@/components/Navigation";

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navigation />
            {children}
        </>
    );
};

export default Layout;
