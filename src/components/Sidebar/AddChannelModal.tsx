import React, { useRef } from 'react'
import Modal from 'react-modal'
import toast from 'react-hot-toast'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useAuth } from 'store'
import { createAndSubscribeToRoom } from 'utils/createAndSubscribeToRoom'

export const AddCannelModal: React.FC<{
	isOpen: boolean
	closeModal: () => void
	onUnmount: (fn: () => unknown) => unknown
}> = ({ isOpen, closeModal, onUnmount }) => {
	const { user } = useAuth()
	const inputRef = useRef<HTMLInputElement | null>(null)

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		if (!inputRef.current) {
			closeModal()
			return
		}
		createAndSubscribeToRoom({
			roomName: inputRef.current.value,
			uid: user?.uid as unknown as string,
		})
			.then(() => {
				onUnmount(() => {
					toast.success('Room created')
				})
				closeModal()
			})
			.catch((err) => {
				onUnmount(() => {
					toast.error(err.message || 'Something went wrong')
				})
				closeModal()
			})
	}
	return (
		<>
			<Modal
				className="relative h-auto px-10 py-16 mx-auto mt-24 text-white bg-indigo-800 rounded-lg w-96 min-w-fit"
				isOpen={isOpen}
			>
				<button onClick={closeModal} className="absolute top-4 right-4">
					<AiFillCloseCircle className="w-8 h-8 cursor-pointer" />
				</button>
				<h2 className="mb-6 text-2xl font-semibold">Add channel name</h2>
				<form onSubmit={handleSubmit}>
					<input
						className="w-full px-2 py-4 mb-4 text-gray-900 rounded-lg"
						type="text"
						placeholder="channel name"
						ref={inputRef}
					/>
					<button
						className="block w-full py-4 bg-green-600 rounded-lg"
						type="submit"
					>
						Submit
					</button>
				</form>
			</Modal>
		</>
	)
}
