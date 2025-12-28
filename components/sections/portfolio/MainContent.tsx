"use client"


import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ContainerLayout } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/constants/portfolio.constants";
import FilterButtons from "./FilterButtons";
import PortfolioCard from "./PortfolioCard";

const MainContent = () => {


    const [filter, setFilter] = useState("All");
    const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

    return (
        <section className="pb-32">
            <ContainerLayout>
                
                {/* Filter Buttons */}
                <FilterButtons
                    filter={filter}
                    setFilter={setFilter}
                />

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {filtered.map((project, i) => (
                        <PortfolioCard
                            project={project}
                            index={i}
                        />
                    ))}
                </div>

            </ContainerLayout>
        </section>
    )
}

export default MainContent