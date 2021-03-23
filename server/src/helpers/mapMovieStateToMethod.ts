function mapMovieStateToMethod(state: string): string {
    const states: string[] = ['now_playing', 'popular', 'top_rated', 'upcoming'];

    if (!states.includes(state)) {
        state = 'popular';
    }

    const stateMapper: { [key: string]: string } = {
        now_playing: 'miscNowPlayingMovies',
        popular: 'miscPopularMovies',
        top_rated: 'miscTopRatedMovies',
        upcoming: 'miscUpcomingMovies',
    }

    return stateMapper[state];
}

export default mapMovieStateToMethod;
