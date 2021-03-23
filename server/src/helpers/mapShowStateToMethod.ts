function mapShowStateToMethod(state: string): string {
    const states: string[] = ['airing_today', 'popular', 'top_rated', 'on_the_air'];

    if (!states.includes(state)) {
        state = 'popular';
    }

    const stateMapper: { [key: string]: string } = {
        airing_today: 'tvAiringToday',
        popular: 'miscPopularTvs',
        top_rated: 'miscTopRatedTvs',
        on_the_air: 'tvOnTheAir',
    }

    return stateMapper[state];
}

export default mapShowStateToMethod;
