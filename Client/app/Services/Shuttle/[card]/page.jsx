"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function page({ params }) {
	const param = useSearchParams();



	return (
		<div className="flex justify-center ">
			<div class="w-3/4 p-4 blue bg-white border border-gray-200 rounded-lg shadow sm:p-6 my-20 mx-20">
				<div className="flex justify-center my-5">
					<h2 class="text-center text-gray-200 whitespace-pre-line mb-4 text-4xl">
						Here is Your Trip details
					</h2>
				</div>

				<div className="flex flex-row justify-around">
					<div className="items-center space-y-10">
						<div class="space-y-2">
							<div div class="flex items-center space-x-20">
								<div className="items-center flex flex-row">
									<div class="w-2 h-2 bg-white rounded-se-sm mr-2 my-3"></div>
									<span className=" text-gray-200">25.31 kilometers</span>
								</div>
								<div className="flex flex-row items-center">
									<div class="w-2 h-2 bg-white rounded-se-sm mr-2"></div>
									<span className="m-3 text-gray-200 ">1 h 28 min</span>
								</div>
							</div>
						</div>

						<div class="space-y-4">
							<div div class="flex items-center space-x-20">
								<div className="items-center flex flex-row">
									<div class="w-2 h-2 bg-white rounded-se-sm mr-2 my-3"></div>
									<span className=" text-gray-200">
										Pickup at {param.get("pickup")} @ {param.get("PickupTime")}
									</span>
								</div>
								<div className="flex flex-row items-center">
									<div class="w-2 h-2 bg-white rounded-se-sm mr-2"></div>
									<span className="m-3 text-gray-200 ">
										Drop at {param.get("drop")} @ {param.get("DropTime")}
									</span>
								</div>
							</div>
						</div>
						<div className="flex justify-center my-3 text-white">
							<h2>Fare:- {param.get("Fare")} Rs/- </h2>
						</div>
					</div>
					<div className="">
						<img
							className=" right-0 w-52 h-auto"
							src="http://localhost:3000/cab.jpg"
							loading="lazy"
							alt="Description of Image"
						/>
					</div>
				</div>

				<div className="flex justify-center mt-10">
					<button
						type="button"
						class="text-white revbut focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
						BOOK YOUR RIDE
					</button>
				</div>
			</div>
		</div>
	);
}
