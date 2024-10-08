/**
 * Author: Levin Spiekermann
 * Github Repo: https://github.com/levinspiekermann/portfolio
 */

'use server';

import 'server-only';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token?: string;
}

const AUTH_TOKEN = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString('base64');

async function getAccessToken() {
  return await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${AUTH_TOKEN}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? ''
    }),
    next: { revalidate: 3200 }
  });
}

async function getRecentlyPlayedSong(accessToken: string) {
  return await fetch(
    'https://api.spotify.com/v1/me/player/recently-played?limit=1',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      next: { revalidate: 15 }
    }
  );
}

async function getNowPlayingSong(accessToken: string) {
  return await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    next: { revalidate: 15 }
  });
}

export default async function getSpotifyPlayback(): Promise<
  SpotifyPlayback | undefined
> {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!refreshToken) {
    console.error('Missing refresh token');
    return;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Missing client credentials');
    return;
  }

  const tokenResponse = await getAccessToken();

  if (!tokenResponse.ok) {
    console.error(`HTTP error! status: ${tokenResponse.status}`);
    return;
  }

  const tokenData: TokenResponse = await tokenResponse.json();

  const nowPlayingResponse = await getNowPlayingSong(tokenData.access_token);

  if (nowPlayingResponse.status > 204) {
    console.error(`HTTP error! status: ${nowPlayingResponse.status}`);
    return;
  }

  if (nowPlayingResponse.status === 204) {
    // No song is currently playing
    const recentlyPlayedResponse = await getRecentlyPlayedSong(
      tokenData.access_token
    );
    const recentlyPlayedData: RawRecentlyPlayedSong =
      await recentlyPlayedResponse.json();

    const recentlyPlayedTrack = recentlyPlayedData.items[0]!.track;

    return {
      timestamp: new Date(recentlyPlayedData.items[0]!.played_at).getTime(),
      is_playing: false,
      album_image_url: recentlyPlayedTrack.album.images[0]!.url,
      artists: recentlyPlayedTrack.album.artists.map((artist) => artist.name),
      track_name: recentlyPlayedTrack.name,
      album_name: recentlyPlayedTrack.album.name,
      track_link: recentlyPlayedTrack.external_urls.spotify
    };
  }

  const playingTrackData: RawCurrentSong = await nowPlayingResponse.json();

  if (!playingTrackData) {
    console.error('Failed to get playing track');
    return;
  }

  return {
    timestamp: playingTrackData.timestamp ?? 0,
    is_playing: playingTrackData.is_playing,
    album_image_url: playingTrackData.item.album.images[0]!.url,
    artists: playingTrackData.item.album.artists.map((artist) => artist.name),
    track_name: playingTrackData.item.name,
    album_name: playingTrackData.item.album.name,
    track_link: playingTrackData.item.external_urls.spotify
  };
}
