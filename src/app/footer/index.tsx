import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { getClient } from '../../lib/clients'
import CheckmarkIcon from '@/app/assets/icons/tick.svg'
import { FOOTER_NAV_ITEMS, InfoQuery, getInfo } from './constants'

export default async function Footer() {
	const { data } = await getClient().query({ query: InfoQuery })
	const ABOUT_US_ITEMS = getInfo(data.infos.data[0].attributes)

	return (
		<div className="flex-col">
			<div className="flex mx-10">
				<div className="w-1/4 p-4 ">
					<h2 className="font-medium pb-3">{ABOUT_US_ITEMS[0].label}</h2>
					{ABOUT_US_ITEMS[0].schedule?.map((schedule) => (
						<>
							<Link href={schedule.href}>{schedule.label}</Link>
							<Separator />
						</>
					))}
				</div>
				<Separator orientation="vertical" />
				<div className="w-1/2 p-4 ">
					<h2 className="font-medium pb-3">{ABOUT_US_ITEMS[1].label}</h2>
					<p
						dangerouslySetInnerHTML={{ __html: `${ABOUT_US_ITEMS[1].text}` }}
					></p>
				</div>
				<Separator orientation="vertical" />
				<div className="w-1/4 p-4 ">
					<h2 className="font-medium pb-3">{ABOUT_US_ITEMS[2].label}</h2>
					<p
						dangerouslySetInnerHTML={{ __html: `${ABOUT_US_ITEMS[2].text}` }}
					></p>
				</div>
			</div>
			<Separator className="my-4" />
			<div className="flex px-4">
				<Image src={CheckmarkIcon} alt="checkmark" width={48} height={48} />
				<Separator orientation="vertical" />
				<p>{data.infos.data[0].attributes.description}</p>
			</div>
			<Separator className="my-4" />
			<div className="flex h-5 items-center space-x-4 text-sm px-4">
				{FOOTER_NAV_ITEMS.map((el) => (
					<>
						<Link href={el.href}>{el.label}</Link>
						<Separator orientation="vertical" />
					</>
				))}
			</div>
		</div>
	)
}
