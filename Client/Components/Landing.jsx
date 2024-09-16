"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function Landing() {
	const items = [
		{
			route: "/Cab",
			image: "/cab.avif",
			title: "Get a ride",
		},
		{
			route: "/Services/Shuttle",
			image: "/shuttle.jpeg",
			title: "Late for office?",
		},
		{
			route: "/Rent",
			image: "/rent.jpeg",
			title: "Go with your group",
		},
		{
			route: "/Courier",
			image: "/cour.png",
			title: "Gift your closest one",
		},
	];

	return (
		<section className="w-full py-12 md:py-20 lg:py-32 text-white">
			<div className="container px-4 md:px-6 mx-auto">
				<h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
				<div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-4 max-w-lg md:max-w-14xl lg:max-w-6xl mx-auto">
					{items.map((item, index) => (
						<Link href={item.route} key={index} className="text-center">
							<Card className="overflow-hidden">
								<CardContent className="p-0">
									<Image
										src={item.image}
										alt={item.title}
										width={150}
										height={100}
										className="w-full h-[150px] sm:h-[200px] object-cover" // Adjust height for smaller screens
									/>
								</CardContent>
							</Card>
							<div className="p-4">
								<h3 className="text-xl  mb-2 hidden sm:block">{item.title}</h3>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
