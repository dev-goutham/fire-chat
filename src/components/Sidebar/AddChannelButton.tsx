import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { GrAdd } from 'react-icons/gr'
import { AddCannelModal } from './AddChannelModal'

export const AddChannelButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => {
		setIsOpen(() => true)
	}

	const closeModal = () => {
		setIsOpen(() => false)
	}

	const onModalUnmount = (fn: () => unknown) => {
		fn()
	}

	return (
		<>
			<Toaster />
			<button
				onClick={openModal}
				className="absolute p-6 bg-green-500 rounded-full shadow-xl bottom-4 right-4"
			>
				<GrAdd className="w-6 h-6 text-white fill-white" />
			</button>
			<AddCannelModal
				isOpen={isOpen}
				closeModal={closeModal}
				onUnmount={onModalUnmount}
			/>
		</>
	)
}
