import React, { useState } from 'react'

import { Header } from './Header'
import { Tabs } from './Tabs'
import { ChannelsTab } from './ChannelsTab'
import { AddChannelButton } from './AddChannelButton'
import { LiveUsers } from './LiveUsers'

const Sidebar: React.FC = () => {
	const [mainView, setMainView] = useState<'Rooms' | 'Users'>('Rooms')

	const changeTab = (tabName: 'Rooms' | 'Users') => {
		setMainView(tabName)
	}

	return (
		<div className="relative h-full bg-gray-700 w-80">
			<Header />
			<Tabs changeTab={changeTab} />
			{mainView === 'Rooms' ? (
				<ChannelsTab />
			) : mainView === 'Users' ? (
				<LiveUsers />
			) : null}
			<AddChannelButton />
		</div>
	)
}

export default Sidebar
