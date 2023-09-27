import Image from 'next/image'
import Link from 'next/link'
import Footer from './footer'
import { CustomNavigationMenu } from './navbar'
import ResponsiveCarousel from './carousel'
import { getClient } from '../lib/clients'
import { CarouselQuery } from './carousel/constants'

export default async function Home() {
	const { data } = await getClient().query({
		query: CarouselQuery,
	})

	return (
		<main className="flex min-h-screen flex-col bg-white">
			<CustomNavigationMenu />
			<ResponsiveCarousel>
				{data.carousels.data.map((el: any, index: number) => (
					<Link href={`/${el.attributes.href}`} key={el.attributes.title}>
						<div className="flex items-center justify-center">
							<Image
								width={520}
								height={380}
								className="w-520 h-380"
								style={{ objectFit: 'cover', width: '520px', height: '380px' }}
								src={`${process.env.NEXT_PUBLIC_URL_SERVER}${el.attributes.images.data[0].attributes.url}`}
								alt={`photo${index}`}
							/>
							<div className="flex-col">
								<p className="text-white py-4 text-2xl">
									{el.attributes.title}
								</p>
								<p className="text-white px-2">{el.attributes.desc}</p>
							</div>
						</div>
					</Link>
				))}
			</ResponsiveCarousel>
			<Footer />
		</main>
	)
}
