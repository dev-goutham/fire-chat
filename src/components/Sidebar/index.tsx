import React, { useState } from 'react'

import { Header } from './Header'
import { Search } from './Search'
import { Tabs } from './Tabs'
import { RoomsTab } from './RoomsTab'
import { AddChannelButton } from './AddChannelButton'

const Sidebar: React.FC = () => {
	const [mainView, setMainView] = useState<'Rooms' | 'Users' | 'Search'>(
		'Rooms',
	)

	const changeTab = (tabName: 'Rooms' | 'Users' | 'Search') => {
		setMainView(tabName)
	}

	return (
		<div className="relative h-screen bg-gray-700 w-80">
			<Header />
			<Tabs changeTab={changeTab} />
			{mainView === 'Rooms' ? (
				<RoomsTab />
			) : mainView === 'Search' ? (
				<Search />
			) : null}
			<AddChannelButton />
		</div>
	)
}

export default Sidebar
