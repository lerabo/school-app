'use client'
import React, { ReactChild } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function ResponsiveCarousel({
	children,
}: {
	children?: ReactChild
}) {
	return (
		<div>
			<Carousel showThumbs={false} autoPlay className="bg-green-light m-10">
				{children}
			</Carousel>
		</div>
	)
}
