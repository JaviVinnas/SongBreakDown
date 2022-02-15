import { useEffect, useState } from 'react';

//type FullTrackInfo = AudioFeaturesObject & TrackObjectFull;
import useSpotify from './useSpotify';
function useUserAudioFeatures(
  timeRange: 'long_term' | 'medium_term' | 'short_term'
) {
  const api = useSpotify();
  console.log('API ACTUAL', api);
  const [reactiveTimeRange, setTimeRange] = useState(timeRange);
  const [audioFeatures, setAudioFeatures] = useState<FullTrackInfo>(null);

  useEffect(() => {
    const fetchData = async () => {
      const topTracksResponse = await api.getMyTopTracks({
        time_range: reactiveTimeRange,
      });
      if (topTracksResponse.statusCode !== 200)
        throw new Error(`Can't get top tracks: ${topTracksResponse}`);
      const topTrackIds = topTracksResponse.body.items.map(({ id }) => id);
      const audioFeaturesResponse = await api.getAudioFeaturesForTracks(
        topTrackIds
      );
      if (audioFeaturesResponse.statusCode !== 200)
        throw new Error(`Can't get audio features: ${audioFeaturesResponse}`);
      //juntamos toda la información en un único objeto por item
      const fullResult = topTracksResponse.body.items.map((track, index) => {
        const trackAudioFeatures =
          audioFeaturesResponse.body.audio_features[index];
        return {
          ...track,
          ...trackAudioFeatures,
        };
      });
      setAudioFeatures(fullResult);
    };

    console.log('DataFetched', fetchData());
  }, [reactiveTimeRange, api]);

  return { audioFeatures, setTimeRange };
}

export default useUserAudioFeatures;
