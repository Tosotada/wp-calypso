/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';
import { initialize, startSubmit, stopSubmit } from 'redux-form';

/**
 * Internal dependencies
 */
import { http } from 'state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'state/data-layer/wpcom-http/utils';
import { errorNotice, removeNotice, successNotice } from 'state/notices/actions';
import { fromApi, toApi } from './util';
import { updateFeed } from '../../feeds/actions';
import { getZone } from '../../zones/selectors';
import { ZONINATOR_REQUEST_FEED, ZONINATOR_SAVE_FEED } from 'zoninator/state/action-types';

const requestFeedNotice = 'zoninator-request-feed';
const saveFeedNotice = 'zoninator-save-feed';

export const requestZoneFeed = ( { dispatch }, action ) => {
	const { siteId, zoneId } = action;

	dispatch( removeNotice( requestFeedNotice ) );
	dispatch( http( {
		method: 'GET',
		path: `/jetpack-blogs/${ siteId }/rest-api/`,
		query: {
			path: `/zoninator/v1/zones/${ zoneId }`,
		},
	}, action ) );
};

export const updateZoneFeed = ( { dispatch }, { siteId, zoneId }, { data } ) =>
	dispatch( updateFeed( siteId, zoneId, fromApi( data ) ) );

export const requestZoneFeedError = ( { dispatch, getState }, { siteId, zoneId } ) => {
	const { name } = getZone( getState(), siteId, zoneId );

	dispatch( errorNotice(
		translate(
			'Could not fetch the posts feed for %(name)s. Please try again.',
			{ args: { name } },
		),
		{ id: requestFeedNotice },
	) );
};

export const saveZoneFeed = ( { dispatch }, action ) => {
	const { form, postIds, siteId, zoneId } = action;

	dispatch( startSubmit( form ) );
	dispatch( removeNotice( saveFeedNotice ) );
	dispatch( http( {
		method: 'PUT',
		path: `/jetpack-blogs/${ siteId }/rest-api/`,
		query: {
			body: JSON.stringify( toApi( postIds ) ),
			json: true,
			path: `/zoninator/v1/zones/${ zoneId }/posts`,
		},
	}, action ) );
};

export const announceSuccess = ( { dispatch }, { form, postIds, siteId, zoneId } ) => {
	dispatch( stopSubmit( form ) );
	dispatch( initialize( form, postIds ) );
	dispatch( updateFeed( siteId, zoneId, postIds ) );
	dispatch( successNotice(
		translate( 'Zone feed saved!' ),
		{ id: saveFeedNotice },
	) );
};

export const announceFailure = ( { dispatch }, { form } ) => {
	dispatch( stopSubmit( form ) );
	dispatch( errorNotice(
		translate( 'There was a problem saving your changes. Please try again' ),
		{ id: saveFeedNotice },
	) );
};

const dispatchZoneFeedRequest = dispatchRequest( requestZoneFeed, updateZoneFeed, requestZoneFeedError );
const dispatchSaveZoneFeedRequest = dispatchRequest( saveZoneFeed, announceSuccess, announceFailure );

export default {
	[ ZONINATOR_REQUEST_FEED ]: [ dispatchZoneFeedRequest ],
	[ ZONINATOR_SAVE_FEED ]: [ dispatchSaveZoneFeedRequest ],
};
