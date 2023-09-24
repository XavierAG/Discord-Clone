import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { techUsed } from '../../assets/helpers/block-text';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div id='landing-nav-container'>
			<NavLink
				exact to="/"
				id='landing-nav-home'
			>
				Biscord
			</NavLink>
			<div id='landing-nav-mid-container'>
				{techUsed.map(str => (
					<span
						key={str}
						className='landing-nav-text'
					>{str}</span>
				))}
			</div>
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
		</div>
	);
}

export default Navigation;
