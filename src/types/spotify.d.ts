interface RawCurrentSong {
  timestamp: number;
  is_playing: boolean;
  item: {
    album: {
      name: string;
      artists: {
        name: string;
      }[];
      images: {
        url: string;
      }[];
    };
    external_urls: {
      spotify: string;
    };
    name: string;
  };
}

interface RawRecentlyPlayedSong {
  items: {
    track: {
      album: {
        name: string;
        artists: {
          name: string;
        }[];
        images: {
          url: string;
        }[];
      };
      external_urls: {
        spotify: string;
      };
      name: string;
    };
    played_at: string;
  }[];
}

interface SpotifyPlayback {
  timestamp: number;
  is_playing: boolean;
  album_image_url: string;
  artists: string[];
  track_name: string;
  album_name: string;
  track_link: string;
}
