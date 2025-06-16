'use client'
import { XIcon } from "lucide-react";
import React, { ReactNode, useState } from 'react';


export function modalOpen(title: string) {
	( document.getElementById(title) as HTMLDialogElement ).showModal()
}

export function modalClose(title: string) {
	( document.getElementById(title) as HTMLDialogElement ).close()
}

export function ModalInput(
	{
		children,
		buttonText,
		title,
		active
	}: {
		active?: boolean
		children: React.ReactNode
		buttonText: React.ReactNode
		title: string
	}) {
	// console.log(title,active)

	const [ open, setOpen ] = useState(false)
	return (
		<>
			<button
				type="button"
				className={ `btn join-item  ${ active ? ' btn-info ' : '' } ` }
				onClick={ () => {
					modalOpen(title);
					setOpen(true)
				} }
			>
				{ buttonText }
			</button>
			<dialog id={ title }
			        className="modal"
			>
				<div className="modal-box w-11/12 max-w-5xl">
					<div className="flex justify-between">
						<h3 className="capitalize font-bold text-lg">{ title.replaceAll('_', ' ') }</h3>
						<button
							type="button"
							className={ `btn btn-circle` }
							onClick={ () => {
								modalClose(title);
								setOpen(false)
							} }
						><XIcon />
						</button>
					</div>
					{ open && children }
					<div className="modal-action">
						<button
							type={ `button` }
							className="btn "
							onClick={ () => {
								modalClose(title);
								setOpen(false)
							} }
						>
							Close
						</button>
					</div>
					{/*<form method="dialog" className="modal-backdrop">*/ }
					{/*    <button>close</button>*/ }
					{/*</form>*/ }
				</div>

			</dialog>
		</>
	);
}

function ModalButtonOpen(
	{ title, keyModal }:
	{ title: ReactNode, keyModal: string, onClick?: () => void, }
) {
	return (
		<button type={ 'button' }
		        className="btn btn-info"
		        onClick={ () => modalOpen(keyModal) }
		>
			{ title }
		</button>
	);
}

function ModalHead(
	{ title, keyModal }:
	{ title: ReactNode, keyModal: string, }
) {
	return <div className="flex justify-between mb-4">
		<h1>{ title }</h1>
		<button
			className="btn btn-sm  btn-ghost btn-circle "
			onClick={ () => modalClose(keyModal) }
		>
			<XIcon />
		</button>
	</div>;
}

function ModalButtonClose(
	{ keyModal, onClick, title = 'Close' }:
	{ onClick?: () => void, keyModal: string, title?: ReactNode }
) {
	return <button
		onClick={ () => {
			if (onClick) {
				onClick()
			}
			modalClose(keyModal)
		} }
		className={ "btn btn-neutral" }
	>
		{ title }
	</button>;
}

function ModalPage(
	{ title, keyModal, children }:
	{ title: ReactNode, keyModal: string, children: ReactNode }
) {
	return <dialog id={ keyModal } className="modal ">
		<div className="modal-box w-full max-w-3xl bg-base-200 ">
			<ModalHead title={ title } keyModal={ keyModal } />
			<div className="overflow-y-scroll h-96 sm:h-fit">
				{ children }
			</div>
			<div className="modal-action">

				<ModalButtonClose keyModal={ keyModal } />
			</div>
		</div>

		<form method="dialog" className="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
}
