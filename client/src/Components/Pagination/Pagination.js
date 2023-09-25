import React, { Fragment, useEffect, useState } from 'react'
import './Pagination.scss'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import { Button } from '../components'
// import { useState } from 'react'

function Pagination({ data }) {
	const listCard = data || []
	const [page, setPage] = useState([])
	const [pageIndex, setPageIndex] = useState(1)
	const pageLength = Math.ceil(listCard.listCard.length / 6)

	useEffect(() => {
		const createPage = pageLength => {
			const page = []

			for (let index = 1; index <= pageLength; index++) {
				page.push(index)
			}

			setPage(page)
			localStorage.setItem('page', JSON.stringify(pageIndex))
		}

		createPage(pageLength)
	}, [pageLength, pageIndex])

	const handlePage = e => {
		const page = e.target.dataset.page
		setPageIndex(parseInt(page))
	}

	const handlePre = pageIndex => {
		if (pageIndex !== 1) {
			setPageIndex(--pageIndex)
			localStorage.setItem('page', JSON.stringify(pageIndex))
		}
	}

	const handleNext = pageIndex => {
		if (pageIndex !== page.length) {
			setPageIndex(++pageIndex)
			localStorage.setItem('page', JSON.stringify(pageIndex))
		}
	}

	return (
		<div className='pagination'>
			<Button
				className={'pagination__btn'}
				icon={<TfiAngleLeft />}
				onClick={() => handlePre(pageIndex)}
			/>
			<ul className='pagination__page'>
				{page.map((value, index) => {
					return (
						<li
							key={index}
							data-page={value}
							className={
								pageIndex === value
									? 'normal-regular pagination__page--active'
									: 'normal-regular'
							}
							onClick={handlePage}>
							{value}
						</li>
					)
				})}
			</ul>
			<Button
				className={'pagination__btn'}
				icon={<TfiAngleRight />}
				onClick={() => handleNext(pageIndex)}
			/>
		</div>
	)
}

export default Pagination
